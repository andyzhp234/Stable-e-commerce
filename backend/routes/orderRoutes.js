import express from 'express';
import {
  addOrderItems,
  getOrderItems,
  updateOrderItemPayment,
} from '../controller/orderController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// @desc    Fetch All products
// @route   GET /api/products
// @access  Public 
router.post('/', protect, addOrderItems);
router.get('/:id', protect, getOrderItems);
router.put('/:id/pay', protect, updateOrderItemPayment);

export default router;