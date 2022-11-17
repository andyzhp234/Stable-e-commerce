import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  adminGetUser,
  adminUpdateUser,
} from "../controller/userController.js";
import { protect, admin, declineDemo } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, declineDemo, updateUserProfile);

// Admin Routes
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, adminGetUser);
router.put("/:id", protect, admin, declineDemo, adminUpdateUser);
router.delete("/:id", protect, admin, declineDemo, deleteUser);

export default router;
