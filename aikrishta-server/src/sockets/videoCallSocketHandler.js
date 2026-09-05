// src/sockets/videoCallSocketHandler.js

export const initializeVideoCallSocket = (io, socket) => {

  // ==========================================
  // CALLER -> RECEIVER
  // ==========================================

  socket.on("video_call_offer", (data) => {
    try {
      const {
        receiverId,
        roomName,
        callerName,
      } = data;

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


  // ==========================================
  // RECEIVER -> CALLER
  // ==========================================

  socket.on("video_call_accepted", (data) => {
    try {
      const {
        callerId,
        roomName,
      } = data;

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


  // ==========================================
  // CALL REJECTED
  // ==========================================

  socket.on("video_call_rejected", (data) => {
    try {
      const {
        otherUserId,
        roomName,
      } = data;

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


  // ==========================================
  // CALL ENDED
  // ==========================================

  socket.on("video_call_ended", (data) => {
    try {
      const {
        otherUserId,
        roomName,
      } = data;

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

};