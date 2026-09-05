// src/components/profile-detail/ProfileActions.js
'use client';

// import { useState } from 'react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import MatchDetailsModal from '../ai-match/MatchDetailsModal';
import HoroscopeModal from './HoroscopeModal';
import { API } from '@/lib/api';
import { useChat } from '@/context/ChatContext';
import { startVoiceCall, destroyVoiceDevice } from "./twilioVoiceService";
import { useSocket } from "@/context/SocketContext";
import { getVideoToken, joinVideoRoom, leaveVideoRoom, } from "./videoCallService";
import { setupVideoCallSocket, sendVideoCallOffer, acceptVideoCall, rejectVideoCall, endVideoCall, sendCameraStatus } from "./videoCallSocketHandler";
import ActiveVideoCall from "./ActiveVideoCall";
import IncomingVideoCallModal from "./IncomingVideoCallModal";
import CallingVideoModal from "./CallingVideoModal";

export default function ProfileActions({
  profileId,
  matchPercentage,
  matchCategory,
  permissionStatus = 'No Request',
  onPermissionChange,
  currentUser,
  candidateProfile,
  isProfileActive = true,
}) {
  const { openConversation } = useChat();
  const socket = useSocket();
  const profileDisabled = !isProfileActive;
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCallDropdownOpen, setIsCallDropdownOpen] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showHoroscopeModal, setShowHoroscopeModal] = useState(false);
  const [matchProfile, setMatchProfile] = useState(null);
  const [isLoadingMatch, setIsLoadingMatch] = useState(false);
  const activeCallRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callerName, setCallerName] = useState('');
  const videoRoomRef = useRef(null);
  const [incomingVideoCall, setIncomingVideoCall] = useState(null);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteTracks, setRemoteTracks] = useState([]);
  const [videoRoom, setVideoRoom] = useState(null);
  const [isRemoteCameraOff, setIsRemoteCameraOff] = useState(false);

  const pictureActions = [];
  if (permissionStatus === 'No Request') {
    pictureActions.push({ id: 'request-picture', label: isRequesting ? 'Sending...' : 'Request Picture', icon: isRequesting ? '⏳' : '📸' });
  } else if (permissionStatus === 'Pending') {
    pictureActions.push({ id: 'request-sent', label: 'Request Sent', icon: '📩', disabled: true });
    pictureActions.push({ id: 'resend-request', label: isRequesting ? 'Sending...' : 'Resend Request', icon: isRequesting ? '⏳' : '🔄' });
  }

  const actions = [
    ...(matchPercentage && matchCategory
      ? [{
        id: 'ai-match-info',
        label: `${matchPercentage}% ${matchCategory}`,
        icon: '🤖',
        isMatchInfo: true
      }]
      : [{ id: 'ai-match', label: 'AI Match', icon: '🤖' }]),
    ...pictureActions,
    { id: 'horoscope', label: 'Horoscope', icon: '🔮' },
    { id: 'chat', label: 'Chat', icon: '💬' },
  ];

  const handleAiMatchClick = async () => {
    if (profileDisabled) {
      toast.error("Please activate your profile first.");
      return;
    }
    if (matchProfile) {
      setShowMatchModal(true);
      return;
    }

    setIsLoadingMatch(true);
    const toastId = toast.loading('Fetching AI Match details...');
    try {
      const response = await axiosInstance.get(API.aiMatch.getMatches);
      const matches = response.data?.data || [];
      const found = matches.find(m => String(m.user_id) === String(profileId));
      if (found) {
        setMatchProfile(found);
        setShowMatchModal(true);
        toast.dismiss(toastId);
      } else {
        if (matchPercentage && matchCategory) {
          const fallbackProfile = {
            user_id: profileId,
            matchPercentage: parseInt(matchPercentage) || 0,
            matchLevel: matchCategory,
            matchBreakdown: {}
          };
          setMatchProfile(fallbackProfile);
          setShowMatchModal(true);
          toast.dismiss(toastId);
        } else {
          toast.error('AI Match details not found for this profile.');
          toast.dismiss(toastId);
        }
      }
    } catch (error) {
      console.error('Error fetching AI matches:', error);
      if (matchPercentage && matchCategory) {
        const fallbackProfile = {
          user_id: profileId,
          matchPercentage: parseInt(matchPercentage) || 0,
          matchLevel: matchCategory,
          matchBreakdown: {}
        };
        setMatchProfile(fallbackProfile);
        setShowMatchModal(true);
      } else {
        toast.error('Failed to load AI Match details.');
      }
      toast.dismiss(toastId);
    } finally {
      setIsLoadingMatch(false);
    }
  };

  const handleActionClick = async (actionId) => {
    if (profileDisabled) {
      toast.error("Please activate your profile first.");
      return;
    }
    if (actionId === 'chat') {
      openConversation(profileId);
      return;
    }
    if (actionId === 'horoscope') {
      setShowHoroscopeModal(true);
      return;
    }
    if (actionId === 'request-picture' || actionId === 'resend-request') {
      setIsRequesting(true);
      try {
        const response = await axiosInstance.post('/picture-requests/send', {
          ownerId: profileId,
        });
        toast.success(response.data.message || 'Picture request sent!');
        if (onPermissionChange) {
          onPermissionChange('Pending');
        }
      } catch (error) {
        console.error('Error requesting picture:', error);
        toast.error(error.response?.data?.message || 'Failed to request picture.');
      } finally {
        setIsRequesting(false);
      }
    } else {
      console.log(`[UI Only] ${actionId} clicked for profile: ${profileId}`);
    }
  };


  // ==========================================
  // START VIDEO CALL
  // ==========================================

  const handleVideoCall = async () => {
    if (!socket) {
      toast.error("Connecting to call service. Please try again.");
      return;
    }

    try {
      setIsCalling(true); // SHOW CALLING MODAL
      const toastId = toast.loading("Connecting...");

      // Get current user info
      const currentUserData = JSON.parse(localStorage.getItem("user") || "{}");
      const callerNameText = currentUserData?.name || currentUserData?.fullName || currentUserData?.username || "User";
      setCallerName(callerNameText);

      // Generate unique room name
      const roomName = `video_${Date.now()}_${profileId}`;
      console.log("🎥 Video room:", roomName);

      // Get video token for caller
      const videoData = await getVideoToken(roomName);
      console.log("🎥 Video token received for caller");

      // Send call offer to receiver
      sendVideoCallOffer(socket, profileId, videoData.roomName, callerNameText);
      console.log("📤 Video call offer sent to:", profileId);

      // IMPORTANT: Caller does NOT join room yet
      // They wait for receiver to accept

      toast.dismiss(toastId);
      toast("Calling...", { id: "video-call" });

    } catch (error) {
      console.error("❌ Video call failed:", error);
      setIsCalling(false);
      toast.error(error?.message || "Unable to start video call", { id: "video-call" });
    }
  };


  const handleCallAction = async (type) => {
    setIsCallDropdownOpen(false);

    if (type === "Video Call") {
      await handleVideoCall();
      return;
    }

    if (type !== "Voice Call") {
      return;
    }

    try {
      toast.loading("Connecting voice call...", {
        id: "voice-call",
      });

      const call = await startVoiceCall(profileId);

      // 🔥 CHECK: Agar error return ho
      if (call && call.error) {
        toast.error(call.error, { id: "voice-call" });
        activeCallRef.current = null;
        return;
      }
      activeCallRef.current = call;

      toast("Calling...", {
        id: "voice-call",
      });

      console.log("Voice call started:", call);

      // =========================
      // CALL DISCONNECTED
      // =========================
      call.on("disconnect", () => {
        console.log("Voice call ended");
        activeCallRef.current = null;
        toast.success("Call ended", {
          id: "voice-call",
        });
      });

      // =========================
      // CALL CANCELLED
      // =========================
      call.on("cancel", () => {
        console.log("Voice call cancelled");
        activeCallRef.current = null;
        toast("Call cancelled", {
          id: "voice-call",
        });
      });

      // =========================
      // 🔥 NEW: USER ERROR (from twilioVoiceService)
      // =========================
      call.on("userError", (errorMessage) => {
        console.log("📞 Call error:", errorMessage);
        activeCallRef.current = null;
        toast.error(errorMessage, {
          id: "voice-call",
        });
      });

      // =========================
      // CALL ERROR (fallback)
      // =========================
      // call.on("error", (error) => {
      //   console.error("Voice call error:", error);
      //   activeCallRef.current = null;

      //   let errorMessage = error?.message || "Voice call failed";

      //   if (errorMessage.includes('HANGUP') || errorMessage.includes('31005') || errorMessage.includes('rejected')) {
      //     errorMessage = "Call rejected by receiver";
      //   } else if (errorMessage.includes('unavailable') || errorMessage.includes('offline')) {
      //     errorMessage = "User is not available";
      //   } else if (errorMessage.includes('timeout') || errorMessage.includes('not receiving')) {
      //     errorMessage = "User is not receiving the call";
      //   }

      //   toast.error(errorMessage, {
      //     id: "voice-call",
      //   });
      // });


    } catch (error) {
      console.error("Voice call failed:", error);

      activeCallRef.current = null;

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to start voice call";

      toast.error(errorMessage, {
        id: "voice-call",
      });
    }
  };

  // ==========================================
  // VIDEO CALL SOCKET LISTENERS
  // ==========================================

  useEffect(() => {
    if (!socket) {
      console.log("📹 Video socket not ready");
      return;
    }

    console.log("📹 Setting up video call listeners");

    const cleanup = setupVideoCallSocket(socket, {

      // ========================================
      // INCOMING CALL
      // ========================================
      onIncomingCall: (data) => {
        console.log("📞📞📞 INCOMING VIDEO CALL RECEIVED:", data);
        console.log("📞 Setting incomingVideoCall state");

        setIncomingVideoCall(data);
      },


      // ========================================
      // CALL ACCEPTED - CALLER SIDE
      // ========================================

      onCallAccepted: async (data) => {
        console.log("✅ VIDEO CALL ACCEPTED:", data);
        console.log("🎥 Caller joining room:", data.roomName);

        try {
          // Caller gets token and joins the room
          const videoData = await getVideoToken(data.roomName);
          console.log("🎥 Caller token received");

          const room = await joinVideoRoom(
            videoData.token,
            data.roomName,
            {
              onLocalTrack: (track) => {
                console.log("🎥 Caller local track:", track.kind);
                setLocalTracks((prev) => [...prev, track]);
              },
              onRemoteTrack: (track) => {
                console.log("🎥 Caller remote track:", track.kind);
                setRemoteTracks((prev) => [...prev, track]);
              },
            }
          );

          videoRoomRef.current = room;
          setVideoRoom(room);
          setIsVideoCalling(true);
          setIsCalling(false); // HIDE CALLING MODAL
          setIncomingVideoCall(null);

          toast.success("Video call connected!", { id: "video-call" });

        } catch (error) {
          console.error("❌ Caller failed to join room:", error);
          setIsCalling(false);
          toast.error(error?.message || "Unable to join video call", { id: "video-call" });
        }
      },

      // ========================================
      // CALL REJECTED
      // ========================================

      onCallRejected: (data) => {
        console.log("❌ VIDEO CALL REJECTED:", data);
        setIncomingVideoCall(null);
        setIsCalling(false); // YEH ADD KARO
        setIsVideoCalling(false);
        toast.error("Video call rejected", { id: "video-call" });
      },


      // ========================================
      // CALL ENDED
      // ========================================
      onCallEnded: async (data) => {
        console.log("📴 VIDEO CALL ENDED:", data);

        if (videoRoomRef.current) {
          leaveVideoRoom(videoRoomRef.current);
          videoRoomRef.current = null;
        }

        setVideoRoom(null);
        setLocalTracks([]);
        setRemoteTracks([]);
        setIncomingVideoCall(null);
        setIsVideoCalling(false);
        setIsCalling(false);
        setIsRemoteCameraOff(false);

        toast.success("Video call ended", { id: "video-call" });
      },

      // ========================================
      // 🔥 NEW: CAMERA STATUS RECEIVED
      // ========================================

      onCameraStatus: (data) => {
        console.log("📷📷📷 CAMERA STATUS RECEIVED IN PROFILE ACTIONS:", data);
        console.log("📷 Setting isRemoteCameraOff to:", data.isCameraOff);
        setIsRemoteCameraOff(data.isCameraOff);
      },

    });

    return () => {
      cleanup();
    };

  }, [socket]);



  const getActionStyle = (isMatchInfo, disabled) => ({
    ...styles.actionBtn,
    background: disabled ? 'rgba(255,255,255,0.05)' : (isMatchInfo ? COLORS.accent : COLORS.secondary),
    color: disabled ? 'rgba(255,255,255,0.3)' : (isMatchInfo ? COLORS.primary : COLORS.textWhite),
    boxShadow: disabled ? 'none' : (isMatchInfo ? `0 4px 20px rgba(201, 169, 110, 0.3)` : `0 4px 20px rgba(139, 30, 63, 0.4)`),
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    filter: profileDisabled ? 'blur(2px)' : 'none',
    opacity: profileDisabled ? 0.5 : 1,
    cursor: profileDisabled ? 'not-allowed' : (disabled ? 'not-allowed' : 'pointer'),
  });

  return (
    <>
      <div style={styles.container}>
        <div style={styles.actionsWrapper}>
          {actions.map((action) => (
            <button
              key={action.id}
              disabled={action.disabled || isLoadingMatch}
              onClick={() => {
                if (action.disabled) return;
                if (action.id === 'ai-match-info' || action.id === 'ai-match') {
                  handleAiMatchClick();
                } else {
                  handleActionClick(action.id);
                }
              }}
              style={getActionStyle(action.isMatchInfo, action.disabled)}
              onMouseEnter={(e) => {
                if (!action.disabled && !profileDisabled) {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!action.disabled && !profileDisabled) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }
              }}
            >
              <span style={styles.actionIcon}>{action.icon}</span>
              <span style={styles.actionLabel}>{action.label}</span>
            </button>
          ))}

          {/* Call Button with Dropdown */}
          <div style={styles.callWrapper}>
            <button
              onClick={() => {
                if (profileDisabled) {
                  toast.error("Please activate your profile first.");
                  return;
                }
                setIsCallDropdownOpen(!isCallDropdownOpen);
              }}
              style={{
                ...styles.callBtn,
                filter: profileDisabled ? 'blur(2px)' : 'none',
                opacity: profileDisabled ? 0.5 : 1,
                cursor: profileDisabled ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!profileDisabled) {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!profileDisabled) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }
              }}
            >
              <span style={styles.actionIcon}>📞</span>
              <span style={styles.actionLabel}>Call</span>
              <span style={styles.dropdownArrow}>▼</span>
            </button>

            {isCallDropdownOpen && (
              <div style={styles.callDropdown}>
                <button
                  onClick={() => handleCallAction('Voice Call')}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={styles.dropdownIcon}>🎤</span>
                  Voice Call
                </button>
                <button
                  onClick={() => handleCallAction('Video Call')}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={styles.dropdownIcon}>📹</span>
                  Video Call
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <MatchDetailsModal
        profile={matchProfile}
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
      />
      <HoroscopeModal
        currentUser={currentUser}
        candidateUser={candidateProfile}
        isOpen={showHoroscopeModal}
        onClose={() => setShowHoroscopeModal(false)}
      />

      {/* CALLING MODAL - Shows for caller while waiting */}
      {isCalling && (
        <CallingVideoModal
          receiverName={candidateProfile?.name || "User"}
          onCancel={() => {
            setIsCalling(false);
            toast("Call cancelled", { id: "video-call" });
          }}
        />
      )}

      {/* ACTIVE VIDEO CALL */}
      {isVideoCalling && videoRoom && (
        <ActiveVideoCall
          localTracks={localTracks}
          remoteTracks={remoteTracks}
          callerName={candidateProfile?.name || "User"}
          profileId={profileId} // 🔥 Receiver ID for sending status
          isRemoteCameraOff={isRemoteCameraOff} // 🔥 Remote camera status
          onEnd={() => {
            endVideoCall(socket, profileId, videoRoom.name);
            leaveVideoRoom(videoRoom);
            videoRoomRef.current = null;
            setVideoRoom(null);
            setLocalTracks([]);
            setRemoteTracks([]);
            setIsVideoCalling(false);
          }}
        />
      )}

      {/* INCOMING VIDEO CALL - Shows for receiver */}
      {incomingVideoCall && (
        <IncomingVideoCallModal
          callData={incomingVideoCall}
          onAccept={(room) => {
            console.log("🎥 PARENT RECEIVED ROOM:", room);
            videoRoomRef.current = room;
            setVideoRoom(room);
            setIsVideoCalling(true);
            setIncomingVideoCall(null);
            toast.success("Video call connected!", { id: "video-call" });
          }}
          onLocalTrack={(track) => {
            console.log("🎥 PARENT LOCAL TRACK:", track.kind);
            setLocalTracks((prev) => [...prev, track]);
          }}
          onRemoteTrack={(track) => {
            console.log("🎥 PARENT REMOTE TRACK:", track.kind);
            setRemoteTracks((prev) => [...prev, track]);
          }}
          onReject={() => {
            rejectVideoCall(socket, incomingVideoCall.callerId, incomingVideoCall.roomName);
            setIncomingVideoCall(null);
          }}
        />
      )}

    </>
  );
}

const styles = {
  container: {
    marginTop: SPACING[6],
    padding: SPACING[6],
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  actionsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING[3],
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  actionIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  actionLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  callWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  callBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.4)`,
  },
  dropdownArrow: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginLeft: SPACING[1],
    transition: 'transform 0.3s ease',
  },
  callDropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    minWidth: '200px',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.08)`,
    overflow: 'hidden',
    padding: SPACING[1],
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
    animation: 'slideDown 0.2s ease',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    borderRadius: BORDER_RADIUS.base,
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dropdownIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
};