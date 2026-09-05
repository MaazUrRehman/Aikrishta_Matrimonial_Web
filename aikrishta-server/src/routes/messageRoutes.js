import express from "express";
import { getMessages, markSeen, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", sendMessage);
router.get("/:conversationId", getMessages);
router.patch("/:conversationId/seen", markSeen);

export default router;
