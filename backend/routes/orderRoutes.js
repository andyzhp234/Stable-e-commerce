import express from 'express';
import {
  addOrderItems,
  getOrderItems,
  updateOrderItemPayment,
} from '../controller/orderController.js'
import { stripeCheckOut } from '../controller/stripeController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', protect, addOrderItems);
router.get('/:id', protect, getOrderItems);
router.put('/:id/pay', protect, updateOrderItemPayment);
router.post('/create-checkout-session', protect, stripeCheckOut);

export default router;