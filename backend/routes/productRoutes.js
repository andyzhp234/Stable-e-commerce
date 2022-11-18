import express from "express";
import {
  getRecommendProducts,
  getNewArrivalsProducts,
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controller/productController.js";
import { protect, admin, declineDemo } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// user routes
router.get("/recommend", getRecommendProducts);
router.get("/newarrivals", getNewArrivalsProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, createProductReview);

// image Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// admin routes
router.post(
  "/",
  upload.any("images"),
  protect,
  admin,
  declineDemo,
  createProduct
);
router.put(
  "/:id",
  upload.any("images"),
  protect,
  declineDemo,
  admin,
  updateProduct
);
router.delete("/:id", protect, admin, declineDemo, deleteProductById);

export default router;
