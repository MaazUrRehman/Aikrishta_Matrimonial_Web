import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messageType: { type: String, enum: ["text", "voice", "file"], default: "text" },
    text: { type: String },
    voiceUrl: { type: String },
    fileUrl: { type: String },
    reactions: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, reaction: String }],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    seen: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
    deletedForEveryone: { type: Boolean, default: false },
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
