import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getVideoToken } from "../controllers/twilioVideoController.js";

const router = express.Router();

// ==========================================
// Generate Video Token
// ==========================================
// Authentication REQUIRED

router.post(
  "/token",
  protect,
  getVideoToken
);

export default router;