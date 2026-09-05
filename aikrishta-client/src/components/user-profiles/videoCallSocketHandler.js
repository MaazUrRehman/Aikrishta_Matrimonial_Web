// // src/components/user-profiles/mvideoCallSocketHandler.js

// export const setupVideoCallSocket = (socket, handlers = {}) => {
//   if (!socket) {
//     console.log("❌ Video socket not available");
//     return () => { };
//   }

//   console.log("📹 Setting up video call socket listeners");

//   const {
//     onIncomingCall,
//     onCallAccepted,
//     onCallRejected,
//     onCallEnded,
//   } = handlers;


//   // ==========================================
//   // INCOMING VIDEO CALL
//   // ==========================================

//   const handleIncomingCall = (data) => {
//     console.log("📞 Incoming video call:", data);

//     if (onIncomingCall) {
//       onIncomingCall(data);
//     }
//   };


//   // ==========================================
//   // CALL ACCEPTED
//   // ==========================================

//   const handleCallAccepted = (data) => {
//     console.log("✅ Video call accepted:", data);

//     if (onCallAccepted) {
//       onCallAccepted(data);
//     }
//   };


//   // ==========================================
//   // CALL REJECTED
//   // ==========================================

//   const handleCallRejected = (data) => {
//     console.log("❌ Video call rejected:", data);

//     if (onCallRejected) {
//       onCallRejected(data);
//     }
//   };


//   // ==========================================
//   // CALL ENDED
//   // ==========================================

//   const handleCallEnded = (data) => {
//     console.log("📴 Video call ended:", data);

//     if (onCallEnded) {
//       onCallEnded(data);
//     }
//   };

//   console.log(
//     "📡 Registering incoming_video_call listener on socket:",
//     socket.id
//   );

//   socket.on(
//     "incoming_video_call",
//     handleIncomingCall
//   );

//   socket.on(
//     "video_call_accepted",
//     handleCallAccepted
//   );

//   socket.on(
//     "video_call_rejected",
//     handleCallRejected
//   );

//   socket.on(
//     "video_call_ended",
//     handleCallEnded
//   );


//   // ==========================================
//   // CLEANUP
//   // ==========================================

//   return () => {
//     console.log("🧹 Removing video call socket listeners");

//     socket.off(
//       "incoming_video_call",
//       handleIncomingCall
//     );

//     socket.off(
//       "video_call_accepted",
//       handleCallAccepted
//     );

//     socket.off(
//       "video_call_rejected",
//       handleCallRejected
//     );

//     socket.off(
//       "video_call_ended",
//       handleCallEnded
//     );
//   };
// };


// // ==========================================
// // CALLER -> RECEIVER
// // ==========================================

// export const sendVideoCallOffer = (
//   socket,
//   receiverId,
//   roomName,
//   callerName
// ) => {

//   if (!socket) {
//     console.log("❌ Socket not available");
//     return;
//   }

//   console.log("📤 Sending video call offer");

//   socket.emit("video_call_offer", {
//     receiverId,
//     roomName,
//     callerName,
//   });
// };


// // ==========================================
// // ACCEPT CALL
// // ==========================================

// export const acceptVideoCall = (
//   socket,
//   callerId,
//   roomName
// ) => {

//   if (!socket) {
//     console.log("❌ Socket not available");
//     return;
//   }

//   console.log("📤 Accepting video call");

//   socket.emit("video_call_accepted", {
//     callerId,
//     roomName,
//   });
// };


// // ==========================================
// // REJECT CALL
// // ==========================================

// export const rejectVideoCall = (
//   socket,
//   otherUserId,
//   roomName
// ) => {

//   if (!socket) {
//     console.log("❌ Socket not available");
//     return;
//   }

//   console.log("📤 Rejecting video call");

//   socket.emit("video_call_rejected", {
//     otherUserId,
//     roomName,
//   });
// };


// // ==========================================
// // END CALL
// // ==========================================

// export const endVideoCall = (
//   socket,
//   otherUserId,
//   roomName
// ) => {

//   if (!socket) {
//     console.log("❌ Socket not available");
//     return;
//   }

//   console.log("📤 Ending video call");

//   socket.emit("video_call_ended", {
//     otherUserId,
//     roomName,
//   });
// };























// src/components/profile-detail/videoCallSocketHandler.js

export const setupVideoCallSocket = (socket, handlers = {}) => {
  if (!socket) {
    console.log("❌ Video socket not available");
    return () => { };
  }

  console.log("📹 Setting up video call socket listeners");

  const {
    onIncomingCall,
    onCallAccepted,
    onCallRejected,
    onCallEnded,
    onCameraStatus, // 🔥 NEW
  } = handlers;


  // ==========================================
  // INCOMING VIDEO CALL
  // ==========================================

  const handleIncomingCall = (data) => {
    console.log("📞 Incoming video call:", data);

    if (onIncomingCall) {
      onIncomingCall(data);
    }
  };


  // ==========================================
  // CALL ACCEPTED
  // ==========================================

  const handleCallAccepted = (data) => {
    console.log("✅ Video call accepted:", data);

    if (onCallAccepted) {
      onCallAccepted(data);
    }
  };


  // ==========================================
  // CALL REJECTED
  // ==========================================

  const handleCallRejected = (data) => {
    console.log("❌ Video call rejected:", data);

    if (onCallRejected) {
      onCallRejected(data);
    }
  };


  // ==========================================
  // CALL ENDED
  // ==========================================

  const handleCallEnded = (data) => {
    console.log("📴 Video call ended:", data);

    if (onCallEnded) {
      onCallEnded(data);
    }
  };


  // ==========================================
  // 🔥 NEW: CAMERA STATUS RECEIVED
  // ==========================================

  const handleCameraStatus = (data) => {
    console.log("📷 Camera status received:", data);

    if (onCameraStatus) {
      onCameraStatus(data);
    }
  };


  console.log(
    "📡 Registering incoming_video_call listener on socket:",
    socket.id
  );

  socket.on(
    "incoming_video_call",
    handleIncomingCall
  );

  socket.on(
    "video_call_accepted",
    handleCallAccepted
  );

  socket.on(
    "video_call_rejected",
    handleCallRejected
  );

  socket.on(
    "video_call_ended",
    handleCallEnded
  );

  // 🔥 NEW: Register camera status listener
  socket.on(
    "video_camera_status",
    handleCameraStatus
  );


  // ==========================================
  // CLEANUP
  // ==========================================

  return () => {
    console.log("🧹 Removing video call socket listeners");

    socket.off(
      "incoming_video_call",
      handleIncomingCall
    );

    socket.off(
      "video_call_accepted",
      handleCallAccepted
    );

    socket.off(
      "video_call_rejected",
      handleCallRejected
    );

    socket.off(
      "video_call_ended",
      handleCallEnded
    );

    // 🔥 NEW: Remove camera status listener
    socket.off(
      "video_camera_status",
      handleCameraStatus
    );
  };
};


// ==========================================
// CALLER -> RECEIVER
// ==========================================

export const sendVideoCallOffer = (
  socket,
  receiverId,
  roomName,
  callerName
) => {

  if (!socket) {
    console.log("❌ Socket not available");
    return;
  }

  console.log("📤 Sending video call offer");

  socket.emit("video_call_offer", {
    receiverId,
    roomName,
    callerName,
  });
};


// ==========================================
// ACCEPT CALL
// ==========================================

export const acceptVideoCall = (
  socket,
  callerId,
  roomName
) => {

  if (!socket) {
    console.log("❌ Socket not available");
    return;
  }

  console.log("📤 Accepting video call");

  socket.emit("video_call_accepted", {
    callerId,
    roomName,
  });
};


// ==========================================
// REJECT CALL
// ==========================================

export const rejectVideoCall = (
  socket,
  otherUserId,
  roomName
) => {

  if (!socket) {
    console.log("❌ Socket not available");
    return;
  }

  console.log("📤 Rejecting video call");

  socket.emit("video_call_rejected", {
    otherUserId,
    roomName,
  });
};


// ==========================================
// END CALL
// ==========================================

export const endVideoCall = (
  socket,
  otherUserId,
  roomName
) => {

  if (!socket) {
    console.log("❌ Socket not available");
    return;
  }

  console.log("📤 Ending video call");

  socket.emit("video_call_ended", {
    otherUserId,
    roomName,
  });
};


// // ==========================================
// // 🔥 NEW: SEND CAMERA STATUS
// // ==========================================

// export const sendCameraStatus = (
//   socket,
//   receiverId,
//   isCameraOff
// ) => {
//   if (!socket) {
//     console.log("❌ Socket not available");
//     return;
//   }

//   console.log(`📷 Sending camera status: ${isCameraOff ? 'OFF' : 'ON'}`);
  
//   socket.emit("video_camera_status", {
//     receiverId,
//     isCameraOff,
//   });
// };


// ==========================================
// 🔥 FIXED: SEND CAMERA STATUS - With better logging
// ==========================================

export const sendCameraStatus = (
  socket,
  receiverId,
  isCameraOff
) => {
  if (!socket) {
    console.log("❌ Socket not available");
    return;
  }

  if (!receiverId) {
    console.log("❌ Receiver ID not available");
    return;
  }

  const data = {
    receiverId,
    isCameraOff,
  };

  console.log(`📷 Sending camera status: ${isCameraOff ? 'OFF' : 'ON'} to ${receiverId}`);
  console.log("📷 Data:", data);
  
  socket.emit("video_camera_status", data);
};