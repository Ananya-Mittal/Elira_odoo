import express from "express";
import { body, param, validationResult } from "express-validator";
import { asyncHandler, protect } from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// Ensure a cart exists for user
const getOrCreateCart = async (userId) => {
  const existing = await Cart.findOne({ user: userId });
  return existing || (await Cart.create({ user: userId, items: [] }));
};

/** GET MY CART */
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart(req.user._id);
    res.json(cart);
  })
);

/** ADD TO CART */
router.post(
  "/add",
  protect,
  [body("productId").isMongoId(), body("qty").isInt({ min: 1 })],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product || !product.isActive) return res.status(404).json({ message: "Product not found" });
    if (product.stock < qty) return res.status(400).json({ message: "Insufficient stock" });

    const cart = await getOrCreateCart(req.user._id);
    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx > -1) {
      cart.items[idx].qty += qty;
      cart.items[idx].price = product.price;
    } else {
      cart.items.push({ product: productId, qty, price: product.price });
    }
    await cart.save();
    res.status(201).json(cart);
  })
);

/** UPDATE QTY */
router.put(
  "/item/:productId",
  protect,
  [param("productId").isMongoId(), body("qty").isInt({ min: 1 })],
  asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => String(i.product) === req.params.productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < req.body.qty) return res.status(400).json({ message: "Insufficient stock" });

    item.qty = req.body.qty;
    item.price = product.price;
    await cart.save();
    res.json(cart);
  })
);

/** REMOVE ITEM */
router.delete(
  "/item/:productId",
  protect,
  [param("productId").isMongoId()],
  asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((i) => String(i.product) !== req.params.productId);
    await cart.save();
    res.json(cart);
  })
);

/** CLEAR CART */
router.delete(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json(cart);
  })
);

export default router;
