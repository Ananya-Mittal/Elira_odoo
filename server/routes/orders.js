import express from "express";
import { body, param, validationResult } from "express-validator";
import { asyncHandler, protect, authorize } from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/** CREATE ORDER from current cart */
router.post(
  "/",
  protect,
  [
    body("shippingAddress").custom((val) => !!val && typeof val === "object")
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // Verify stock and compute total
    let total = 0;
    for (const it of cart.items) {
      const p = await Product.findById(it.product);
      if (!p || !p.isActive) return res.status(400).json({ message: "Invalid item in cart" });
      if (p.stock < it.qty) return res.status(400).json({ message: `Insufficient stock for ${p.title}` });
      total += it.qty * p.price;
    }

    // Decrement stock atomically
    for (const it of cart.items) {
      await Product.updateOne({ _id: it.product, stock: { $gte: it.qty } }, { $inc: { stock: -it.qty } });
    }

    const items = await Promise.all(
      cart.items.map(async (it) => {
        const p = await Product.findById(it.product);
        return { product: p._id, title: p.title, qty: it.qty, price: p.price };
      })
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      shippingAddress: req.body.shippingAddress,
      status: "paid" // or "pending" if integrating with a payment gateway
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  })
);

/** MY ORDERS */
router.get(
  "/my",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  })
);

/** ALL ORDERS (admin) */
router.get(
  "/",
  protect,
  authorize("admin"),
  asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  })
);

/** UPDATE STATUS (admin) */
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  [param("id").isMongoId(), body("status").isIn(["pending", "paid", "shipped", "delivered", "cancelled"])],
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  })
);

export default router;
