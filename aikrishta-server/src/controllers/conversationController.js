import Conversation from "../models/Conversation.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// Create or Get Conversation
export const createConversation = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
  }

  res.status(200).json({ success: true, data: conversation });
});

// Get User Conversations
export const getUserConversations = asyncHandler(async (req, res) => {
  // const conversations = await Conversation.find({
  //   members: { $in: [req.user._id] },
  // }).sort({ updatedAt: -1 });

  const conversations = await Conversation.find({
  members: { $in: [req.user._id] },
})
.populate("members", "fullName email")
.sort({ updatedAt: -1 });

  res.status(200).json({ success: true, data: conversations });
});

// Get Conversation By ID
export const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) {
    console.log("Conversation not found");
    return;
  }
  
  if (!conversation.members.includes(req.user._id)) {
    console.log("Access denied", 403);
  }

  res.status(200).json({ success: true, data: conversation });
});
