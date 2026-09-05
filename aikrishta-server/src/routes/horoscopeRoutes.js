import express from 'express';
import { checkHoroscopeCompatibility } from '../controllers/horoscopeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/check', protect, checkHoroscopeCompatibility);

export default router;
