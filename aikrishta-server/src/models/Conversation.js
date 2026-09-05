import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: String },
    lastMessageTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
