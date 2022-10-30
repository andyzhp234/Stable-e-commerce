import express from 'express';
import {authUser, registerUser, getUserProfile, updateUserProfile} from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

export default router;