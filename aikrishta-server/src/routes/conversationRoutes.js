import express from "express";
import { createConversation, getConversationById, getUserConversations } from "../controllers/conversationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createConversation);
router.get("/", getUserConversations);
router.get("/:id", getConversationById);

export default router;
