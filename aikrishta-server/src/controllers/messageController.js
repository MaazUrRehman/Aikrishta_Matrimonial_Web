import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// Send Message
export const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId, receiverId, text, messageType, voiceUrl } = req.body;
  const senderId = req.user._id;

  const message = await Message.create({
    conversationId,
    senderId,
    receiverId,
    text,
    messageType,
    voiceUrl,
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: text || "Voice message",
    lastMessageTime: Date.now(),
  });

  res.status(201).json({ success: true, data: message });
});

// Get Messages
export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
  res.status(200).json({ success: true, data: messages });
});

// Mark Seen
export const markSeen = asyncHandler(async (req, res) => {
  await Message.updateMany(
    { conversationId: req.params.conversationId, receiverId: req.user._id, seen: false },
    { $set: { seen: true } }
  );
  res.status(200).json({ success: true, message: "Messages marked as seen" });
});
