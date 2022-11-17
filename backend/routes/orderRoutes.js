import express from "express";
import {
  getOrderItems,
  getAllMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  deleteOrderById,
} from "../controller/orderController.js";

import { protect, admin, declineDemo } from "../middleware/authMiddleware.js";

const router = express.Router();

// user route
router.get("/myorders", protect, getAllMyOrders);
router.get("/:id", protect, getOrderItems);

// admin route
router.get("/", protect, admin, getAllOrders);
router.delete("/:id", protect, admin, declineDemo, deleteOrderById);
router.put("/:id/deliver", protect, admin, declineDemo, updateOrderToDelivered);

export default router;
