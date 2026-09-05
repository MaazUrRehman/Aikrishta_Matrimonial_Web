// src/components/profile-detail/ActiveVideoCall.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { sendCameraStatus } from './videoCallSocketHandler';
import { useSocket } from '@/context/SocketContext';

export default function ActiveVideoCall({
  localTracks = [],
  remoteTracks = [],
  callerName = 'User',
  onEnd,
  profileId,
  isRemoteCameraOff = false,
}) {
  const socket = useSocket();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioElementsRef = useRef([]);
  
  // Get tracks
  const localVideoTrack = localTracks.find(t => t.kind === 'video');
  const localAudioTrack = localTracks.find(t => t.kind === 'audio');
  const remoteVideoTrack = remoteTracks.find(t => t.kind === 'video');

  // Get user name first letter for avatar
  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  // ==========================================
  // RESUME AUDIO CONTEXT
  // ==========================================
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
          console.log('🔊 Audio context resumed');
        }
      } catch (error) {
        console.warn('Could not resume audio context:', error);
      }
    }
  }, []);

  // ==========================================
  // ATTACH REMOTE AUDIO
  // ==========================================
  
  useEffect(() => {
    const audioTracks = remoteTracks.filter(t => t.kind === 'audio');
    
    console.log(`🔊 Found ${audioTracks.length} remote audio tracks`);
    
    audioTracks.forEach((track, index) => {
      try {
        const existingElement = audioElementsRef.current.find(
          el => el._trackId === track.id
        );
        
        if (!existingElement) {
          console.log(`🔊 Attaching remote audio track ${index + 1}`);
          const audioElement = track.attach();
          audioElement.style.display = 'none';
          audioElement._trackId = track.id;
          audioElement.autoplay = true;
          audioElement.volume = 1.0;
          document.body.appendChild(audioElement);
          audioElementsRef.current.push(audioElement);
          console.log(`🔊 Audio element attached, volume: ${audioElement.volume}`);
        }
      } catch (error) {
        console.error('Error attaching audio track:', error);
      }
    });
    
    return () => {
      audioElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          try {
            el.parentNode.removeChild(el);
          } catch (e) {}
        }
      });
      audioElementsRef.current = [];
    };
  }, [remoteTracks]);

  // ==========================================
  // ATTACH LOCAL VIDEO - LIVE PREVIEW
  // ==========================================
  
  useEffect(() => {
    const element = localVideoRef.current;
    if (!element) return;

    // Clear previous content
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (localVideoTrack && !isVideoOff) {
      // Camera ON - Show live video
      console.log('📷 Local video ON - attaching live preview');
      try {
        const videoElement = localVideoTrack.attach();
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.borderRadius = '12px';
        videoElement.style.transform = 'scaleX(-1)';
        element.appendChild(videoElement);
      } catch (error) {
        console.error('Error attaching local video:', error);
        showAvatar(element, getInitial(callerName));
      }
    } else {
      // Camera OFF - Show avatar
      console.log('📷 Local video OFF - showing avatar');
      showAvatar(element, getInitial(callerName));
    }

    return () => {
      if (localVideoTrack && !isVideoOff) {
        try {
          localVideoTrack.detach();
        } catch (e) {}
      }
    };
  }, [localVideoTrack, isVideoOff, callerName]);

  // ==========================================
  // ATTACH REMOTE VIDEO - FIXED
  // ==========================================
  
  useEffect(() => {
    const element = remoteVideoRef.current;
    if (!element) return;

    // Clear previous content
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    // Check if remote camera is ON or OFF
    if (remoteVideoTrack && !isRemoteCameraOff) {
      // Remote camera ON - Show live video
      console.log('📷 Remote video ON - attaching');
      try {
        const videoElement = remoteVideoTrack.attach();
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.borderRadius = '12px';
        element.appendChild(videoElement);
      } catch (error) {
        console.error('Error attaching remote video:', error);
        showRemoteAvatar(element, getInitial(callerName), callerName);
      }
    } else {
      // Remote camera OFF - Show avatar with name
      console.log('📷 Remote video OFF - showing avatar');
      showRemoteAvatar(element, getInitial(callerName), callerName);
    }

    return () => {
      if (remoteVideoTrack) {
        try {
          remoteVideoTrack.detach();
        } catch (e) {}
      }
    };
  }, [remoteVideoTrack, isRemoteCameraOff, callerName]);

  // ==========================================
  // HELPER FUNCTIONS FOR AVATAR
  // ==========================================
  
  const showAvatar = (element, initial) => {
    element.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${COLORS.primary || '#0F172A'};border-radius:12px;">
        <div style="width:70px;height:70px;border-radius:50%;background:${COLORS.accent || '#F59E0B'};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;color:${COLORS.primary || '#0F172A'};">
          ${initial}
        </div>
      </div>
    `;
  };

  const showRemoteAvatar = (element, initial, name) => {
    element.innerHTML = `
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${COLORS.primary || '#0F172A'};border-radius:12px;">
        <div style="width:100px;height:100px;border-radius:50%;background:${COLORS.accent || '#F59E0B'};display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:bold;color:${COLORS.primary || '#0F172A'};">
          ${initial}
        </div>
        <p style="margin-top:16px;color:rgba(255,255,255,0.6);font-size:16px;font-weight:500;font-family:${TYPOGRAPHY?.fontFamily?.body || 'sans-serif'};">
          ${name}
        </p>
      </div>
    `;
  };

  // ==========================================
  // TOGGLE MIC
  // ==========================================
  
  const toggleMic = () => {
    if (localAudioTrack) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      
      if (newMutedState) {
        localAudioTrack.disable();
        console.log('🎤 Mic muted');
      } else {
        localAudioTrack.enable();
        console.log('🎤 Mic unmuted');
      }
    } else {
      console.warn('No local audio track found');
    }
  };

  // ==========================================
  // TOGGLE CAMERA - SEND STATUS TO REMOTE
  // ==========================================
  
  // const toggleCamera = () => {
  //   if (localVideoTrack) {
  //     const newVideoState = !isVideoOff;
  //     setIsVideoOff(newVideoState);
      
  //     if (newVideoState) {
  //       localVideoTrack.disable();
  //       console.log('📷 Camera turned OFF');
  //     } else {
  //       localVideoTrack.enable();
  //       console.log('📷 Camera turned ON');
  //     }
      
  //     // Send camera status to remote user
  //     if (socket && profileId) {
  //       sendCameraStatus(socket, profileId, newVideoState);
  //       console.log(`📷 Camera status sent: ${newVideoState ? 'OFF' : 'ON'}`);
  //     }
  //   } else {
  //     console.warn('No local video track found');
  //   }
  // };

//   

const toggleCamera = () => {
  if (localVideoTrack) {
    const newVideoState = !isVideoOff;
    setIsVideoOff(newVideoState);
    
    if (newVideoState) {
      localVideoTrack.disable();
      console.log('📷 Camera turned OFF');
    } else {
      localVideoTrack.enable();
      console.log('📷 Camera turned ON');
    }
    
    // 🔥 FIXED: Send camera status to remote user with better logging
    if (socket && profileId) {
      console.log(`📷 Sending camera status to ${profileId}: ${newVideoState ? 'OFF' : 'ON'}`);
      sendCameraStatus(socket, profileId, newVideoState);
    } else {
      console.log("📷 Cannot send camera status - socket or profileId missing");
      console.log("📷 socket:", !!socket);
      console.log("📷 profileId:", profileId);
    }
  } else {
    console.warn('No local video track found');
  }
};



  // ==========================================
  // CLEANUP
  // ==========================================
  
  useEffect(() => {
    return () => {
      // Cleanup video elements
      if (localVideoRef.current) {
        while (localVideoRef.current.firstChild) {
          localVideoRef.current.removeChild(localVideoRef.current.firstChild);
        }
      }
      if (remoteVideoRef.current) {
        while (remoteVideoRef.current.firstChild) {
          remoteVideoRef.current.removeChild(remoteVideoRef.current.firstChild);
        }
      }
      
      // Cleanup audio elements
      audioElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          try {
            el.parentNode.removeChild(el);
          } catch (e) {}
        }
      });
      audioElementsRef.current = [];
    };
  }, []);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Remote Video - Large Screen */}
        <div style={styles.remoteVideoWrapper}>
          <div ref={remoteVideoRef} style={styles.remoteVideo} />
          {/* Caller name badge on remote video */}
          <div style={styles.callerNameBadge}>
            {isRemoteCameraOff ? '📷 Camera Off' : callerName}
          </div>
        </div>

        {/* Local Video - Small Picture in Picture */}
        <div style={styles.localVideoWrapper}>
          <div ref={localVideoRef} style={styles.localVideo} />
          <div style={styles.localVideoBadge}>
            {isVideoOff ? '📷 Off' : 'You'}
          </div>
        </div>

        {/* Call Controls */}
        <div style={styles.controls}>
          <button
            onClick={toggleMic}
            style={{
              ...styles.controlBtn,
              background: isMuted ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={styles.controlIcon}>
              {isMuted ? '🎤❌' : '🎤'}
            </span>
            <span style={styles.controlLabel}>
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          <button
            onClick={toggleCamera}
            style={{
              ...styles.controlBtn,
              background: isVideoOff ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={styles.controlIcon}>
              {isVideoOff ? '📷❌' : '📷'}
            </span>
            <span style={styles.controlLabel}>
              {isVideoOff ? 'Camera On' : 'Camera Off'}
            </span>
          </button>

          <button
            onClick={onEnd}
            style={{
              ...styles.controlBtn,
              background: 'rgba(255, 0, 0, 0.3)',
              border: '2px solid rgba(255, 0, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)';
            }}
          >
            <span style={styles.controlIcon}>📞</span>
            <span style={styles.controlLabel}>End Call</span>
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
    position: 'fixed',
    inset: 0,
    background: 'rgba(2, 6, 23, 0.9)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    height: '85vh',
    maxHeight: '800px',
    background: COLORS?.primary || '#0F172A',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
  },
  remoteVideoWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: COLORS?.primary || '#0F172A',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS?.primary || '#0F172A',
  },
  callerNameBadge: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    padding: '8px 20px',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  localVideoWrapper: {
    position: 'absolute',
    bottom: '100px',
    right: '24px',
    width: '200px',
    height: '150px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '2px solid rgba(255,255,255,0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    background: COLORS?.primary || '#0F172A',
  },
  localVideo: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS?.primary || '#0F172A',
  },
  localVideoBadge: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    padding: '4px 12px',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '11px',
    fontWeight: 500,
    backdropFilter: 'blur(4px)',
  },
  controls: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    padding: '12px 24px',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '50px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  controlBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '70px',
    background: 'rgba(255,255,255,0.08)',
    fontFamily: TYPOGRAPHY?.fontFamily?.body || 'sans-serif',
  },
  controlIcon: {
    fontSize: '20px',
  },
  controlLabel: {
    fontSize: '10px',
    opacity: 0.8,
  },
};