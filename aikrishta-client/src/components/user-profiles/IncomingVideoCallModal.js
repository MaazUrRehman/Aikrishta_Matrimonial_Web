
// // src/components/profile-detail/IncomingVideoCallModal.js
// 'use client';

// import { useEffect, useState, useRef } from "react";
// import { useSocket } from "@/context/SocketContext";
// import {
//   setupVideoCallSocket,
//   acceptVideoCall,
//   rejectVideoCall,
// } from "./videoCallSocketHandler";
// import { getVideoToken, joinVideoRoom } from "./videoCallService";
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

// export default function IncomingVideoCallModal({
//   callData,  // Parent se aane wala data
//   onAccept,
//   onReject,
//   onLocalTrack,
//   onRemoteTrack,
// }) {
//   const socket = useSocket();
//   const [incomingCall, setIncomingCall] = useState(null);
//   const [isAccepting, setIsAccepting] = useState(false);
//   const cleanupRef = useRef(null);

//   // ==========================================
//   // 🔥 FIX: Directly use callData from props
//   // ==========================================
  
//   useEffect(() => {
//     if (callData) {
//       console.log("📞 MODAL received callData from parent:", callData);
//       setIncomingCall(callData);
//     } else {
//       // Agar callData null hai toh modal close ho jaye
//       setIncomingCall(null);
//     }
//   }, [callData]);

//   // ==========================================
//   // SETUP SOCKET LISTENERS - SIRF REJECT/END KE LIYE
//   // ==========================================

//   useEffect(() => {
//     if (!socket) {
//       console.log("⏳ Video modal waiting for socket...");
//       return;
//     }

//     console.log("📹 Video modal got socket:", socket.id);

//     let cleanupListeners = null;

//     const setupListeners = () => {
//       if (cleanupListeners) return;

//       console.log("✅ Setting up video modal socket listeners");

//       cleanupListeners = setupVideoCallSocket(socket, {
//         // 🔥 IMPORTANT: Isme incoming call handle mat karo
//         // kyunki parent se callData aa raha hai
        
//         onCallRejected: (data) => {
//           console.log("❌ Video call rejected:", data);
//           // Agar reject aaye toh modal close karo
//           setIncomingCall(null);
//           setIsAccepting(false);
//         },

//         onCallEnded: (data) => {
//           console.log("📴 Video call ended:", data);
//           setIncomingCall(null);
//           setIsAccepting(false);
//         },
        
//         // onCallAccepted ko handle mat karo kyunki
//         // receiver accept kar raha hai directly
//       });
//     };

//     if (socket.connected) {
//       setupListeners();
//     } else {
//       socket.once("connect", setupListeners);
//     }

//     return () => {
//       console.log("🧹 Cleaning video modal socket listeners");
//       socket.off("connect", setupListeners);
//       if (cleanupListeners) {
//         cleanupListeners();
//         cleanupListeners = null;
//       }
//     };
//   }, [socket]);

//   // ==========================================
//   // ACCEPT CALL - RECEIVER JOINS ROOM
//   // ==========================================

//   const handleAccept = async () => {
//     console.log("📹 handleAccept called");
//     console.log("📹 incomingCall:", incomingCall);
    
//     if (!incomingCall || isAccepting || !socket) {
//       console.log("❌ Cannot accept - conditions not met");
//       return;
//     }

//     try {
//       setIsAccepting(true);
//       console.log("📹 Accepting video call");

//       // 1. Get video token for receiver
//       const videoData = await getVideoToken(incomingCall.roomName);
//       console.log("🎥 Receiver video token received");

//       // 2. Send accept event to caller
//       acceptVideoCall(socket, incomingCall.callerId, incomingCall.roomName);
//       console.log("✅ Video call accepted signal sent");

//       // 3. Join the room
//       const room = await joinVideoRoom(
//         videoData.token,
//         videoData.roomName,
//         {
//           onLocalTrack: (track) => {
//             console.log("🎥 Receiver local track:", track.kind);
//             if (onLocalTrack) {
//               onLocalTrack(track);
//             }
//           },
//           onRemoteTrack: (track) => {
//             console.log("🎥 Receiver remote track:", track.kind);
//             if (onRemoteTrack) {
//               onRemoteTrack(track);
//             }
//           },
//         }
//       );

//       console.log("✅ Receiver joined video room:", room.name);

//       // 4. Pass room to parent
//       if (onAccept) {
//         onAccept(room);
//       }

//       // 5. Clear modal state
//       setIncomingCall(null);
//       setIsAccepting(false);

//     } catch (error) {
//       console.error("❌ Failed to accept video call:", error);
//       setIsAccepting(false);
//     }
//   };

//   // ==========================================
//   // REJECT CALL
//   // ==========================================

//   const handleReject = () => {
//     console.log("📹 handleReject called");
//     if (!incomingCall || !socket) {
//       return;
//     }

//     try {
//       console.log("📹 Rejecting video call");
//       rejectVideoCall(socket, incomingCall.callerId, incomingCall.roomName);
      
//       if (onReject) {
//         onReject();
//       }
      
//       setIncomingCall(null);
//       setIsAccepting(false);
//     } catch (error) {
//       console.error("❌ Failed to reject video call:", error);
//       setIncomingCall(null);
//       setIsAccepting(false);
//     }
//   };

//   // ==========================================
//   // RENDER
//   // ==========================================

//   if (!incomingCall) {
//     return null;
//   }

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.container}>
//         <div style={styles.icon}>📹</div>

//         <h3 style={styles.title}>Incoming Video Call</h3>

//         <p style={styles.status}>
//           <strong>{incomingCall.callerName || "Someone"}</strong> is calling you...
//         </p>

//         <div style={styles.actions}>
//           <button
//             onClick={handleReject}
//             disabled={isAccepting}
//             style={{
//               ...styles.rejectButton,
//               opacity: isAccepting ? 0.5 : 1,
//               cursor: isAccepting ? 'not-allowed' : 'pointer',
//             }}
//             onMouseEnter={(e) => {
//               if (!isAccepting) {
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
//             }}
//           >
//             Reject
//           </button>

//           <button
//             onClick={handleAccept}
//             disabled={isAccepting}
//             style={{
//               ...styles.acceptButton,
//               opacity: isAccepting ? 0.7 : 1,
//               cursor: isAccepting ? 'not-allowed' : 'pointer',
//             }}
//             onMouseEnter={(e) => {
//               if (!isAccepting) {
//                 e.currentTarget.style.transform = 'scale(1.02)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//             }}
//           >
//             {isAccepting ? "Connecting..." : "Accept"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ==========================================
// // STYLES - Using theme constants
// // ==========================================

// const styles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(2, 6, 23, 0.55)",
//     backdropFilter: "blur(4px)",
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-end",
//     padding: "24px",
//     zIndex: 99999,
//   },
//   container: {
//     width: "360px",
//     background: COLORS.primary || "#0F172A",
//     borderRadius: BORDER_RADIUS['2xl'] || "20px",
//     padding: SPACING[7] || "28px",
//     boxShadow: SHADOWS.xl || "0 20px 60px rgba(0, 0, 0, 0.35)",
//     border: "1px solid rgba(245, 158, 11, 0.25)",
//     textAlign: "center",
//     color: COLORS.textWhite || "#FFFFFF",
//   },
//   icon: {
//     width: "72px",
//     height: "72px",
//     margin: "0 auto 18px",
//     borderRadius: "50%",
//     background: "rgba(245, 158, 11, 0.12)",
//     border: "1px solid rgba(245, 158, 11, 0.35)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "34px",
//   },
//   title: {
//     margin: 0,
//     color: COLORS.textWhite || "#FFFFFF",
//     fontSize: TYPOGRAPHY.fontSize.xl || "21px",
//     fontWeight: TYPOGRAPHY.fontWeight.bold || 700,
//     letterSpacing: "-0.2px",
//   },
//   status: {
//     marginTop: SPACING[2.5] || "10px",
//     color: "rgba(255,255,255,0.6)",
//     fontSize: TYPOGRAPHY.fontSize.sm || "14px",
//     lineHeight: "1.6",
//   },
//   actions: {
//     display: "flex",
//     gap: "12px",
//     marginTop: SPACING[5] || "22px",
//   },
//   rejectButton: {
//     flex: 1,
//     padding: SPACING[3] || "12px",
//     border: "1px solid rgba(255, 255, 255, 0.12)",
//     borderRadius: BORDER_RADIUS.lg || "10px",
//     background: "rgba(255, 255, 255, 0.04)",
//     color: COLORS.textWhite || "#E2E8F0",
//     fontWeight: TYPOGRAPHY.fontWeight.semibold || 600,
//     cursor: "pointer",
//     fontSize: TYPOGRAPHY.fontSize.sm || "14px",
//     transition: "all 0.2s ease",
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//   },
//   acceptButton: {
//     flex: 1,
//     padding: SPACING[3] || "12px",
//     border: "none",
//     borderRadius: BORDER_RADIUS.lg || "10px",
//     background: COLORS.accent || "#F59E0B",
//     color: COLORS.primary || "#0F172A",
//     fontWeight: TYPOGRAPHY.fontWeight.bold || 700,
//     cursor: "pointer",
//     fontSize: TYPOGRAPHY.fontSize.sm || "14px",
//     transition: "all 0.2s ease",
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//   },
// };



































// src/components/profile-detail/IncomingVideoCallModal.js
'use client';

import { useEffect, useState, useRef } from "react";
import { useSocket } from "@/context/SocketContext";
import {
  setupVideoCallSocket,
  acceptVideoCall,
  rejectVideoCall,
} from "./videoCallSocketHandler";
import { getVideoToken, joinVideoRoom } from "./videoCallService";
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function IncomingVideoCallModal({
  callData,
  onAccept,
  onReject,
  onLocalTrack,
  onRemoteTrack,
}) {
  const socket = useSocket();
  const [incomingCall, setIncomingCall] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const cleanupRef = useRef(null);
  const audioRef = useRef(null);

  // ==========================================
  // PLAY RINGTONE
  // ==========================================
  
  useEffect(() => {
    if (incomingCall) {
      // Create and play ringtone
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for ringtone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440; // A4 note
      oscillator.type = 'sine';
      
      // Volume
      gainNode.gain.value = 0.3;
      
      // Start playing
      oscillator.start();
      
      // Create a pattern (ring-ring-pause)
      let isPlaying = true;
      let intervalId = setInterval(() => {
        if (isPlaying) {
          gainNode.gain.setTargetAtTime(0.3, audioContext.currentTime, 0.1);
          setTimeout(() => {
            gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
          }, 400);
        }
      }, 800);
      
      // Store for cleanup
      audioRef.current = {
        oscillator,
        gainNode,
        intervalId,
        audioContext,
        isPlaying: true,
      };
      
      return () => {
        // Cleanup
        if (audioRef.current) {
          audioRef.current.isPlaying = false;
          clearInterval(audioRef.current.intervalId);
          try {
            audioRef.current.oscillator.stop();
            audioRef.current.oscillator.disconnect();
          } catch (e) {
            // Ignore
          }
          try {
            audioRef.current.audioContext.close();
          } catch (e) {
            // Ignore
          }
        }
      };
    } else {
      // No incoming call, stop ringtone
      if (audioRef.current) {
        audioRef.current.isPlaying = false;
        clearInterval(audioRef.current.intervalId);
        try {
          audioRef.current.oscillator.stop();
          audioRef.current.oscillator.disconnect();
        } catch (e) {
          // Ignore
        }
        try {
          audioRef.current.audioContext.close();
        } catch (e) {
          // Ignore
        }
        audioRef.current = null;
      }
    }
  }, [incomingCall]);

  // ==========================================
  // DIRECTLY USE CALLDATA FROM PROPS
  // ==========================================
  
  useEffect(() => {
    if (callData) {
      console.log("📞 MODAL received callData from parent:", callData);
      setIncomingCall(callData);
    } else {
      setIncomingCall(null);
    }
  }, [callData]);

  // ==========================================
  // SETUP SOCKET LISTENERS
  // ==========================================

  useEffect(() => {
    if (!socket) {
      console.log("⏳ Video modal waiting for socket...");
      return;
    }

    console.log("📹 Video modal got socket:", socket.id);

    let cleanupListeners = null;

    const setupListeners = () => {
      if (cleanupListeners) return;

      console.log("✅ Setting up video modal socket listeners");

      cleanupListeners = setupVideoCallSocket(socket, {
        onCallRejected: (data) => {
          console.log("❌ Video call rejected:", data);
          setIncomingCall(null);
          setIsAccepting(false);
        },

        onCallEnded: (data) => {
          console.log("📴 Video call ended:", data);
          setIncomingCall(null);
          setIsAccepting(false);
        },
      });
    };

    if (socket.connected) {
      setupListeners();
    } else {
      socket.once("connect", setupListeners);
    }

    return () => {
      console.log("🧹 Cleaning video modal socket listeners");
      socket.off("connect", setupListeners);
      if (cleanupListeners) {
        cleanupListeners();
        cleanupListeners = null;
      }
    };
  }, [socket]);

  // ==========================================
  // ACCEPT CALL
  // ==========================================

  const handleAccept = async () => {
    console.log("📹 handleAccept called");
    console.log("📹 incomingCall:", incomingCall);
    
    if (!incomingCall || isAccepting || !socket) {
      console.log("❌ Cannot accept - conditions not met");
      return;
    }

    try {
      setIsAccepting(true);
      console.log("📹 Accepting video call");

      // Stop ringtone
      if (audioRef.current) {
        audioRef.current.isPlaying = false;
        clearInterval(audioRef.current.intervalId);
        try {
          audioRef.current.oscillator.stop();
          audioRef.current.oscillator.disconnect();
        } catch (e) {}
        try {
          audioRef.current.audioContext.close();
        } catch (e) {}
        audioRef.current = null;
      }

      // 1. Get video token for receiver
      const videoData = await getVideoToken(incomingCall.roomName);
      console.log("🎥 Receiver video token received");

      // 2. Send accept event to caller
      acceptVideoCall(socket, incomingCall.callerId, incomingCall.roomName);
      console.log("✅ Video call accepted signal sent");

      // 3. Join the room
      const room = await joinVideoRoom(
        videoData.token,
        videoData.roomName,
        {
          onLocalTrack: (track) => {
            console.log("🎥 Receiver local track:", track.kind);
            if (onLocalTrack) {
              onLocalTrack(track);
            }
          },
          onRemoteTrack: (track) => {
            console.log("🎥 Receiver remote track:", track.kind);
            if (onRemoteTrack) {
              onRemoteTrack(track);
            }
          },
        }
      );

      console.log("✅ Receiver joined video room:", room.name);

      // 4. Pass room to parent
      if (onAccept) {
        onAccept(room);
      }

      // 5. Clear modal state
      setIncomingCall(null);
      setIsAccepting(false);

    } catch (error) {
      console.error("❌ Failed to accept video call:", error);
      setIsAccepting(false);
    }
  };

  // ==========================================
  // REJECT CALL
  // ==========================================

  const handleReject = () => {
    console.log("📹 handleReject called");
    if (!incomingCall || !socket) {
      return;
    }

    try {
      console.log("📹 Rejecting video call");
      
      // Stop ringtone
      if (audioRef.current) {
        audioRef.current.isPlaying = false;
        clearInterval(audioRef.current.intervalId);
        try {
          audioRef.current.oscillator.stop();
          audioRef.current.oscillator.disconnect();
        } catch (e) {}
        try {
          audioRef.current.audioContext.close();
        } catch (e) {}
        audioRef.current = null;
      }
      
      rejectVideoCall(socket, incomingCall.callerId, incomingCall.roomName);
      
      if (onReject) {
        onReject();
      }
      
      setIncomingCall(null);
      setIsAccepting(false);
    } catch (error) {
      console.error("❌ Failed to reject video call:", error);
      setIncomingCall(null);
      setIsAccepting(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  if (!incomingCall) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.icon}>📹</div>

        <h3 style={styles.title}>Incoming Video Call</h3>

        <p style={styles.status}>
          <strong>{incomingCall.callerName || "Someone"}</strong> is calling you...
        </p>

        <div style={styles.ringingIndicator}>
          <div style={styles.ringingDot}></div>
          <div style={styles.ringingDot}></div>
          <div style={styles.ringingDot}></div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={handleReject}
            disabled={isAccepting}
            style={{
              ...styles.rejectButton,
              opacity: isAccepting ? 0.5 : 1,
              cursor: isAccepting ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isAccepting) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            Reject
          </button>

          <button
            onClick={handleAccept}
            disabled={isAccepting}
            style={{
              ...styles.acceptButton,
              opacity: isAccepting ? 0.7 : 1,
              cursor: isAccepting ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isAccepting) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isAccepting ? "Connecting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2, 6, 23, 0.55)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "24px",
    zIndex: 99999,
  },
  container: {
    width: "360px",
    background: COLORS?.primary || "#0F172A",
    borderRadius: BORDER_RADIUS?.['2xl'] || "20px",
    padding: SPACING?.[7] || "28px",
    boxShadow: SHADOWS?.xl || "0 20px 60px rgba(0, 0, 0, 0.35)",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    textAlign: "center",
    color: COLORS?.textWhite || "#FFFFFF",
  },
  icon: {
    width: "72px",
    height: "72px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.12)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  title: {
    margin: 0,
    color: COLORS?.textWhite || "#FFFFFF",
    fontSize: TYPOGRAPHY?.fontSize?.xl || "21px",
    fontWeight: TYPOGRAPHY?.fontWeight?.bold || 700,
    letterSpacing: "-0.2px",
  },
  status: {
    marginTop: SPACING?.[2.5] || "10px",
    color: "rgba(255,255,255,0.6)",
    fontSize: TYPOGRAPHY?.fontSize?.sm || "14px",
    lineHeight: "1.6",
  },
  ringingIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px",
  },
  ringingDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: COLORS?.accent || "#F59E0B",
    animation: "ringingBounce 1.2s ease-in-out infinite",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "22px",
  },
  rejectButton: {
    flex: 1,
    padding: SPACING?.[3] || "12px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: BORDER_RADIUS?.lg || "10px",
    background: "rgba(255, 255, 255, 0.04)",
    color: COLORS?.textWhite || "#E2E8F0",
    fontWeight: TYPOGRAPHY?.fontWeight?.semibold || 600,
    cursor: "pointer",
    fontSize: TYPOGRAPHY?.fontSize?.sm || "14px",
    transition: "all 0.2s ease",
    fontFamily: TYPOGRAPHY?.fontFamily?.body || "sans-serif",
  },
  acceptButton: {
    flex: 1,
    padding: SPACING?.[3] || "12px",
    border: "none",
    borderRadius: BORDER_RADIUS?.lg || "10px",
    background: COLORS?.accent || "#F59E0B",
    color: COLORS?.primary || "#0F172A",
    fontWeight: TYPOGRAPHY?.fontWeight?.bold || 700,
    cursor: "pointer",
    fontSize: TYPOGRAPHY?.fontSize?.sm || "14px",
    transition: "all 0.2s ease",
    fontFamily: TYPOGRAPHY?.fontFamily?.body || "sans-serif",
  },
};

// Add CSS animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    @keyframes ringingBounce {
      0%, 100% { transform: translateY(0); opacity: 0.3; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}