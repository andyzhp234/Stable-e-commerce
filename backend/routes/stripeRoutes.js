import express from "express";
import {
  stripeCheckOut,
  stripeWebHook,
} from "../controller/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  express.json(),
  protect,
  stripeCheckOut
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);

export default router;
