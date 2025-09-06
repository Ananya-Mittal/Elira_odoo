import express from "express";
import { body, param, validationResult } from "express-validator";
import Product from "../models/Product.js";
import { asyncHandler, protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/** LIST + SEARCH */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { q, category, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  })
);

/** GET ONE */
router.get(
  "/:id",
  [param("id").isMongoId()],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json(prod);
  })
);

/** CREATE (seller/admin) */
router.post(
  "/",
  protect,
  authorize("seller", "admin"),
  [
    body("title").notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("stock").optional().isInt({ min: 0 })
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const product = await Product.create({ ...req.body, seller: req.user._id });
    res.status(201).json(product);
  })
);

/** UPDATE (owner seller/admin) */
router.put(
  "/:id",
  protect,
  authorize("seller", "admin"),
  [param("id").isMongoId()],
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && String(product.seller) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  })
);

/** DELETE (owner seller/admin) */
router.delete(
  "/:id",
  protect,
  authorize("seller", "admin"),
  [param("id").isMongoId()],
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && String(product.seller) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await product.deleteOne();
    res.json({ success: true });
  })
);

export default router;
