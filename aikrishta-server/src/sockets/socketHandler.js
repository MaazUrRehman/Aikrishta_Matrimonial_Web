// src/sockets/socketHandler.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";


export const initializeSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      // Try multiple ways to get token
      let token = socket.handshake.auth?.token ||
        socket.handshake.auth?.accessToken ||
        socket.handshake.query?.token ||
        socket.handshake.query?.accessToken;

      console.log('🔑 Token received:', token ? 'Yes' : 'No');
      console.log('🔑 Token length:', token?.length);

      if (!token) {
        console.log('❌ No token provided');
        return next(new Error('No token provided'));
      }

      // Clean token
      let cleanToken = token;
      if (typeof cleanToken === 'string') {
        cleanToken = cleanToken.replace(/^"|"$/g, '').trim();
      }

      console.log('🔑 Clean Token length:', cleanToken?.length);

      // Verify token
      const decoded = jwt.verify(cleanToken, process.env.JWT_ACCESS_SECRET);
      console.log('✅ Token decoded:', decoded);

      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('❌ User not found');
        return next(new Error('User not found'));
      }

      socket.user = user;
      socket.userId = user._id.toString();
      console.log('✅ Socket authenticated for user:', socket.userId);
      next();
    } catch (error) {
      console.log('❌ Socket auth error:', error.message);
      next(new Error('Auth error: ' + error.message));
    }
  });

  io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.userId);
    console.log("🔥 SOCKET CONNECTION CREATED:", socket.id);
    console.log("🔥 AUTH USER ID:", socket.userId);

    if (socket.userId) {
      socket.join(socket.userId);
    }

    console.log("🔥 SOCKET ROOMS:", [...socket.rooms]);

    // ==========================================
    // VIDEO CALL SIGNALING
    // ==========================================

    // Caller -> Receiver: Incoming video call
    socket.on("video_call_offer", (data) => {
      console.log("🔥🔥 VIDEO CALL OFFER EVENT RECEIVED 🔥🔥");
      console.log("🔥 From:", socket.userId);
      console.log("🔥 Data:", data);
      try {
        const { receiverId, roomName, callerName } = data;



        console.log("📹 Video call offer received");
        console.log("📹 Caller:", socket.userId);
        console.log("📹 Receiver:", receiverId);
        console.log("📹 Room:", roomName);

        if (!receiverId || !roomName) {
          console.log("❌ Missing receiverId or roomName");
          return;
        }

        io.to(receiverId.toString()).emit("incoming_video_call", {
          callerId: socket.userId,
          callerName: callerName || "User",
          roomName,
        });

        console.log("✅ Video call offer sent to receiver");
      } catch (error) {
        console.error("❌ Video call offer error:", error);
      }
    });


    // Receiver -> Caller: Call accepted
    socket.on("video_call_accepted", (data) => {
      try {
        const { callerId, roomName } = data;

        console.log("📹 Video call accepted");
        console.log("📹 Receiver:", socket.userId);
        console.log("📹 Caller:", callerId);

        if (!callerId || !roomName) {
          console.log("❌ Missing callerId or roomName");
          return;
        }

        io.to(callerId.toString()).emit("video_call_accepted", {
          receiverId: socket.userId,
          roomName,
        });

        console.log("✅ Video call acceptance sent to caller");
      } catch (error) {
        console.error("❌ Video call accept error:", error);
      }
    });


    // Receiver/Caller -> Other user: Call rejected
    socket.on("video_call_rejected", (data) => {
      try {
        const { otherUserId, roomName } = data;

        console.log("📹 Video call rejected");
        console.log("📹 Rejected by:", socket.userId);

        if (!otherUserId) {
          console.log("❌ Missing otherUserId");
          return;
        }

        io.to(otherUserId.toString()).emit("video_call_rejected", {
          userId: socket.userId,
          roomName,
        });

        console.log("✅ Video call rejection sent");
      } catch (error) {
        console.error("❌ Video call reject error:", error);
      }
    });


    // Either user -> Other user: Call ended
    socket.on("video_call_ended", (data) => {
      try {
        const { otherUserId, roomName } = data;

        console.log("📹 Video call ended by:", socket.userId);

        if (!otherUserId) {
          console.log("❌ Missing otherUserId");
          return;
        }

        io.to(otherUserId.toString()).emit("video_call_ended", {
          userId: socket.userId,
          roomName,
        });

        console.log("✅ Video call end event sent");
      } catch (error) {
        console.error("❌ Video call end error:", error);
      }
    });


    socket.on("send_message", async (data) => {
      try {
        const message = await Message.create({
          conversationId: data.conversationId,
          senderId: socket.userId,
          receiverId: data.receiverId,
          text: data.text,
        });

        await Conversation.findByIdAndUpdate(data.conversationId, {
          lastMessage: data.text,
          lastMessageTime: new Date(),
        });

        const populatedMessage = await Message.findById(message._id);

        // io.to(data.receiverId).emit("receive_message", populatedMessage);

        // socket.emit("message_sent", populatedMessage);

        // Receiver
        io.to(data.receiverId.toString()).emit("receive_message", populatedMessage);

        // Sender bhi receive_message sun raha hai
        io.to(socket.userId.toString()).emit("receive_message", populatedMessage);

      } catch (err) {
        console.log(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('👋 User disconnected:', socket.userId);
    });
  });

  return io;
};