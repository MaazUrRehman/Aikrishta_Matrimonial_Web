import express from "express";
import { getMatches } from "../../controllers/ai-match/aiMatchController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMatches);

export default router;
