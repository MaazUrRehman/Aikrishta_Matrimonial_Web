

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  setupIncomingCallListener,
  destroyVoiceDevice,
  setOutgoingCallListener,
  initializeVoiceDevice,
  checkAndRequestMicrophonePermission,
  openMicrophoneSettings,
  getVoiceDevice,
  requestMicrophoneOnLoad
} from "./twilioVoiceService";

export default function IncomingVoiceCall({ callerName = "Someone", receiverName = "User" }) {
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [callError, setCallError] = useState(null);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [showMicPermission, setShowMicPermission] = useState(false);
  const { user, token, loading: authLoading } = useAuth();

  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const timerRef = useRef(null);

  const handleCallEnd = useCallback(() => {
    setIncomingCall(null);
    setActiveCall(null);
    setIsConnecting(false);
    setIsMuted(false);
    setCallSeconds(0);
  }, []);


  const handleCallError = useCallback(
    (error) => {
      const rawMessage = String(
        error?.message || error || ""
      );

      const errorMessage = rawMessage.toLowerCase();

      // ==========================================
      // TWILIO 31005 / HANGUP
      // ==========================================
      // IMPORTANT:
      // HANGUP alone does NOT mean receiver rejected.
      // Twilio can send HANGUP for multiple call-ending cases.
      if (
        error?.code === 31005 ||
        errorMessage.includes("hangup") ||
        errorMessage.includes("error sent from gateway")
      ) {
        console.log("📞 Twilio gateway hangup handled silently");
        return;
      }

      // ==========================================
      // RECEIVER UNAVAILABLE
      // ==========================================
      if (
        errorMessage.includes("unavailable") ||
        errorMessage.includes("offline") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("not available") ||
        errorMessage.includes("timeout") ||
        errorMessage.includes("not receiving")
      ) {
        setCallError("📵 Receiver is not available");
        handleCallEnd();

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setCallError(null);
        }, 3000);

        return;
      }

      // ==========================================
      // EXPLICIT REJECTION MESSAGE
      // ==========================================
      if (
        errorMessage.includes("rejected") ||
        errorMessage.includes("call was rejected")
      ) {
        setCallError("📞 Call rejected by receiver");
        handleCallEnd();

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setCallError(null);
        }, 3000);

        return;
      }

      // ==========================================
      // MICROPHONE
      // ==========================================
      let finalMessage = rawMessage || "Voice call failed. Please try again.";

      if (
        errorMessage.includes("microphone") ||
        errorMessage.includes("getusermedia")
      ) {
        finalMessage =
          "🎤 Microphone access is required. Please allow microphone access.";
        setShowMicPermission(true);
      } else if (
        errorMessage.includes("permission") ||
        errorMessage.includes("denied")
      ) {
        finalMessage =
          "🔒 Microphone permission denied. Please allow microphone access.";
        setShowMicPermission(true);
      } else if (
        errorMessage.includes("network") ||
        errorMessage.includes("connection")
      ) {
        finalMessage =
          "🌐 Network error. Please check your internet connection.";
      } else if (
        errorMessage.includes("token") ||
        errorMessage.includes("authenticated")
      ) {
        finalMessage =
          "🔑 Authentication error. Please refresh the page.";
      } else {
        finalMessage = "⚠️ " + finalMessage;
      }

      setCallError(finalMessage);
      handleCallEnd();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setCallError(null);
        setShowMicPermission(false);
      }, 5000);
    },
    [handleCallEnd]
  );

  // =========================
  // INITIALIZE VOICE DEVICE WITH RETRY
  // =========================
  const initializeDeviceWithRetry = useCallback(async () => {
    if (!mountedRef.current) return null;

    const existingDevice = getVoiceDevice();
    if (existingDevice && existingDevice.state === 'registered') {
      console.log("✅ Device already registered globally, using existing...");
      setIsDeviceReady(true);
      return { device: existingDevice };
    }

    setIsInitializing(true);
    setRetryAttempt(retryCountRef.current + 1);
    setShowMicPermission(false);

    try {
      console.log(`🔄 Attempt ${retryCountRef.current + 1}/${maxRetries}...`);

      const result = await initializeVoiceDevice();

      if (result && result.device) {
        console.log("✅ Voice device initialized successfully");
        setIsDeviceReady(true);
        retryCountRef.current = 0;
        setRetryAttempt(0);
        setIsInitializing(false);
        setShowMicPermission(false);
        return result;
      } else {
        const device = getVoiceDevice();
        if (device && device.state === 'registered') {
          console.log("✅ Device found registered globally after init attempt");
          setIsDeviceReady(true);
          retryCountRef.current = 0;
          setRetryAttempt(0);
          setIsInitializing(false);
          return { device };
        }
        console.warn("⚠️ Device initialization returned null, but continuing...");
        return null;
      }
    } catch (error) {
      console.error("❌ Device initialization failed:", error);
      setIsInitializing(false);

      const isMicError = error.message?.toLowerCase().includes('microphone') ||
        error.message?.toLowerCase().includes('permission');

      if (isMicError) {
        setShowMicPermission(true);
      }

      const device = getVoiceDevice();
      if (device && device.state === 'registered') {
        console.log("✅ Device is registered, treating as success");
        setIsDeviceReady(true);
        retryCountRef.current = 0;
        setRetryAttempt(0);
        setIsInitializing(false);
        return { device };
      }

      if (retryCountRef.current < maxRetries && mountedRef.current) {
        retryCountRef.current++;
        console.log(`🔄 Retrying in 3 seconds... (${retryCountRef.current}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        return initializeDeviceWithRetry();
      } else {
        setIsDeviceReady(false);
        retryCountRef.current = 0;
        setRetryAttempt(0);

        if (mountedRef.current) {
          handleCallError(error);
        }
        return null;
      }
    }
  }, [handleCallError]);

  // =========================
  // HANDLE MICROPHONE PERMISSION
  // =========================
  const handleMicrophonePermission = useCallback(async () => {
    try {
      setShowMicPermission(false);
      const hasPermission = await checkAndRequestMicrophonePermission();
      if (hasPermission) {
        console.log("✅ Microphone permission granted, retrying...");
        retryCountRef.current = 0;
        await initializeDeviceWithRetry();
      } else {
        setShowMicPermission(true);
        handleCallError(new Error("Microphone permission not granted"));
      }
    } catch (error) {
      console.error("Microphone permission error:", error);
      setShowMicPermission(true);
      handleCallError(error);
    }
  }, [initializeDeviceWithRetry, handleCallError]);

  const handleOpenSettings = useCallback(() => {
    openMicrophoneSettings();
  }, []);

  // =========================
  // SETUP LISTENERS
  // =========================
  const setupListeners = useCallback(() => {
    setupIncomingCallListener((call) => {
      if (!mountedRef.current) {
        call.reject();
        return;
      }

      console.log("📞 Incoming call received");


      setCallError(null);
      setIncomingCall(call);

      // call.on("cancel", handleCallEnd);
      // call.on("disconnect", handleCallEnd);
      // call.on("error", handleCallError);

      call.on("cancel", () => {
        console.log("📞 Outgoing call cancelled");
        handleCallEnd();
      });

      call.on("disconnect", () => {
        console.log("📞 Outgoing call ended normally");

        if (!mountedRef.current) return;

        handleCallEnd();

        setCallError("Call ended");

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setCallError(null);
          }
        }, 2000);
      });

      call.on("error", (error) => {
        console.log("📞 Call error:", error);

        // Normal Twilio hangup ko error mat banao
        if (
          error?.code === 31005 ||
          String(error?.message || "").toLowerCase().includes("hangup") ||
          String(error?.message || "").toLowerCase().includes("error sent from gateway")
        ) {
          console.log("📞 Normal Twilio hangup ignored");
          return;
        }

        handleCallError(error);
      });
    });

    setOutgoingCallListener((call) => {
      if (!mountedRef.current) return;

      console.log("📞 Outgoing call initiated");
      setCallError(null);
      setActiveCall(call);
      setIsConnecting(true);

      call.on("accept", () => {
        console.log("✅ Call accepted");
        setIsConnecting(false);
        setCallSeconds(0);
      });

      // call.on("cancel", handleCallEnd);
      // call.on("disconnect", handleCallEnd);
      // call.on("error", handleCallError);

      call.on("cancel", () => {
  console.log("📞 Incoming call cancelled");
  handleCallEnd();
});

call.on("disconnect", () => {
  console.log("📞 Incoming call ended normally");

  if (!mountedRef.current) return;

  handleCallEnd();

  setCallError("Call ended");

  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  timerRef.current = setTimeout(() => {
    if (mountedRef.current) {
      setCallError(null);
    }
  }, 2000);
});

call.on("error", (error) => {
  console.log("📞 Incoming call error:", error);

  if (
    error?.code === 31005 ||
    String(error?.message || "").toLowerCase().includes("hangup") ||
    String(error?.message || "").toLowerCase().includes("error sent from gateway")
  ) {
    console.log("📞 Normal Twilio hangup ignored");
    return;
  }

  handleCallError(error);
});
    });
  }, [handleCallEnd, handleCallError]);

  // =========================
  // INCOMING CALL LISTENER
  // =========================
  useEffect(() => {
    let cleanup;
    mountedRef.current = true;
    retryCountRef.current = 0;

    if (authLoading || !user || !token) {
      return;
    }

    // 🔥 Page load pe microphone permission lo (no loading UI)
    const requestMic = async () => {
      try {
        console.log("🎤 Requesting microphone on page load...");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        console.log("✅ Microphone ready");
        setCallError(null);
      } catch (error) {
        console.warn("⚠️ Microphone not available:", error.message);
        setShowMicPermission(true);
      }
    };
    requestMic();

    const setup = async () => {
      try {
        const deviceResult = await initializeDeviceWithRetry();

        if (!deviceResult || !mountedRef.current) {
          return;
        }

        console.log("✅ Device ready, setting up listeners...");
        setupListeners();
        console.log("✅ Voice call listeners setup complete");

      } catch (error) {
        console.error("❌ Failed to setup voice call:", error);
        if (mountedRef.current) {
          handleCallError(error);
        }
      }
    };

    setup();

    return () => {
      console.log("🧹 Cleaning up...");
      mountedRef.current = false;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (cleanup) {
        cleanup();
      }

      setTimeout(() => {
        destroyVoiceDevice();
        setIsDeviceReady(false);
      }, 500);
    };
  }, [user, token, authLoading, handleCallEnd, handleCallError, initializeDeviceWithRetry, setupListeners]);

  // =========================
  // CALL TIMER
  // =========================
  useEffect(() => {
    if (!activeCall || isConnecting) return;

    const interval = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [activeCall, isConnecting]);

  // =========================
  // ACCEPT CALL
  // =========================
  const handleAccept = async () => {
    if (!incomingCall) return;

    try {
      setIsConnecting(true);
      setCallError(null);

      await incomingCall.accept();

      setActiveCall(incomingCall);
      setIncomingCall(null);
      setIsConnecting(false);
      setCallSeconds(0);

      incomingCall.on("disconnect", handleCallEnd);
      incomingCall.on("cancel", handleCallEnd);
      incomingCall.on("error", handleCallError);
    } catch (error) {
      console.error("❌ Failed to accept call:", error);
      setIncomingCall(null);
      setIsConnecting(false);
      handleCallError(error);
    }
  };

  // =========================
  // REJECT CALL
  // =========================
  const handleReject = () => {
    if (!incomingCall) return;

    try {
      incomingCall.reject();
    } catch (error) {
      console.error("❌ Failed to reject call:", error);
    }

    setIncomingCall(null);
    setIsConnecting(false);
  };

  
  const handleEndCall = () => {
  if (!activeCall) return;

  try {
    activeCall.disconnect();
  } catch (error) {
    console.log("📞 Disconnect completed with:", error);
  }

  handleCallEnd();

  setCallError("Call ended");

  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  timerRef.current = setTimeout(() => {
    if (mountedRef.current) {
      setCallError(null);
    }
  }, 2000);
};

  // =========================
  // MUTE / UNMUTE
  // =========================
  const handleMute = () => {
    if (!activeCall) return;

    try {
      const newMutedState = !isMuted;
      activeCall.mute(newMutedState);
      setIsMuted(newMutedState);
    } catch (error) {
      console.error("❌ Mute error:", error);
      handleCallError(error);
    }
  };

  // =========================
  // FORMAT TIMER
  // =========================
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // =========================
  // MICROPHONE PERMISSION UI
  // =========================
  if (showMicPermission) {
    return (
      <div style={styles.micContainer}>
        <div style={styles.micIcon}>🎤</div>
        <h3 style={styles.micTitle}>Microphone Access Required</h3>
        <p style={styles.micText}>
          Voice calls need microphone access. Please allow microphone permission in your browser.
        </p>
        <div style={styles.micActions}>
          <button onClick={handleMicrophonePermission} style={styles.micAllowButton}>
            Try Again
          </button>
          <button onClick={handleOpenSettings} style={styles.micSettingsButton}>
            Open Settings
          </button>
          <button onClick={() => window.location.reload()} style={styles.micRefreshButton}>
            Refresh Page
          </button>
        </div>
        <p style={styles.micHelp}>
          💡 Tip: Click the 🔒 icon in address bar → Site Settings → Microphone → Allow
        </p>
      </div>
    );
  }

  // =========================
  // LOADING STATE - Just return null (no loading UI)
  // =========================
  if (authLoading) {
    return null;
  }

  // =========================
  // ERROR MESSAGE - Call errors (no buttons)
  // =========================
  if (callError && !showMicPermission) {
    const isCallError = callError.includes('rejected') ||
      callError.includes('not available') ||
      callError.includes('not receiving');

    if (isCallError) {
      return (
        <div style={styles.simpleErrorContainer}>
          <div style={styles.errorIcon}>📞</div>
          <p style={styles.simpleErrorText}>{callError}</p>
        </div>
      );
    }

    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3 style={styles.errorTitle}>Voice Call Failed</h3>
        <p style={styles.errorText}>{callError}</p>
        
      </div>
    );
  }

  // =========================
  // NOTHING HAPPENING
  // =========================
  if (!incomingCall && !activeCall) {
    return null;
  }

  // =========================
  // ACTIVE CALL UI
  // =========================
  if (activeCall) {
    return (
      <div style={styles.container}>
        <div style={styles.icon}>📞</div>
        <h3 style={styles.title}>Call with <strong>{receiverName}</strong></h3>
        <p style={styles.status}>
          {isConnecting ? "Connecting..." : "Connected"}
        </p>
        {!isConnecting && (
          <div style={styles.timer}>
            {formatTime(callSeconds)}
          </div>
        )}
        <div style={styles.actions}>
          <button
            onClick={handleMute}
            style={{
              ...styles.button,
              background: isMuted ? "#8B1E3F" : "#eeeeee",
              color: isMuted ? "#ffffff" : "#8B1E3F",
            }}
          >
            {isMuted ? "🔇 Unmute" : "🎤 Mute"}
          </button>
          <button onClick={handleEndCall} style={styles.endButton}>
            ☎ End Call
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // INCOMING CALL UI
  // =========================
  return (
    <div style={styles.container}>
      <div style={styles.icon}>📞</div>
      <h3 style={styles.title}>Incoming Voice Call</h3>
      <p style={styles.status}>
        <strong>{callerName}</strong> is calling you...
      </p>
      <div style={styles.actions}>
        <button
          onClick={handleReject}
          disabled={isConnecting}
          style={styles.rejectButton}
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          disabled={isConnecting}
          style={styles.acceptButton}
        >
          {isConnecting ? "Connecting..." : "Accept"}
        </button>
      </div>
    </div>
  );
}

// =========================
// STYLES
// =========================
const styles = {
  container: {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "360px",
    background: "#0F172A",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
    zIndex: 99999,
    border: "1px solid rgba(245, 158, 11, 0.25)",
    textAlign: "center",
    color: "#FFFFFF",
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
  },

  title: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: "21px",
    fontWeight: 700,
    letterSpacing: "-0.2px",
  },

  status: {
    marginTop: "10px",
    color: "#CBD5E1",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  timer: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#F59E0B",
    margin: "18px 0",
    letterSpacing: "1px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },

  button: {
    flex: 1,
    padding: "12px",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  rejectButton: {
    flex: 1,
    padding: "12px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "10px",
    background: "#1E293B",
    color: "#E2E8F0",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  acceptButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#F59E0B",
    color: "#0F172A",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  endButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#DC2626",
    color: "#FFFFFF",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  errorContainer: {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "360px",
    background: "#0F172A",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
    zIndex: 99999,
    border: "1px solid rgba(245, 158, 11, 0.25)",
    textAlign: "center",
    color: "#FFFFFF",
  },

  errorIcon: {
    width: "60px",
    height: "60px",
    margin: "0 auto 14px",
    borderRadius: "50%",
    background: "rgba(220, 38, 38, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },

  errorTitle: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: "19px",
    fontWeight: 700,
  },

  errorText: {
    marginTop: "10px",
    color: "#CBD5E1",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  errorActions: {
    marginTop: "18px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },

  retryButton: {
    padding: "11px 20px",
    background: "#F59E0B",
    color: "#0F172A",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
  },

  refreshButton: {
    padding: "11px 20px",
    background: "#1E293B",
    color: "#E2E8F0",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
  },

  loader: {
    marginTop: "12px",
    color: "#F59E0B",
    fontSize: "13px",
  },

  simpleErrorContainer: {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "340px",
    background: "#0F172A",
    borderRadius: "16px",
    padding: "20px 24px",
    boxShadow: "0 15px 45px rgba(0, 0, 0, 0.3)",
    zIndex: 99999,
    border: "1px solid rgba(245, 158, 11, 0.25)",
    textAlign: "center",
  },

  simpleErrorText: {
    margin: "8px 0 0 0",
    color: "#F59E0B",
    fontSize: "15px",
    fontWeight: 600,
  },

  micContainer: {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "360px",
    background: "#0F172A",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
    zIndex: 99999,
    border: "1px solid rgba(245, 158, 11, 0.35)",
    textAlign: "center",
    color: "#FFFFFF",
  },

  micIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 16px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
  },

  micTitle: {
    margin: "0 0 8px 0",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 700,
  },

  micText: {
    marginTop: "8px",
    color: "#CBD5E1",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  micActions: {
    marginTop: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },

  micAllowButton: {
    padding: "12px",
    background: "#F59E0B",
    color: "#0F172A",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  },

  micSettingsButton: {
    padding: "12px",
    background: "#1E293B",
    color: "#E2E8F0",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  },

  micRefreshButton: {
    padding: "12px",
    background: "transparent",
    color: "#94A3B8",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  },

  micHelp: {
    marginTop: "14px",
    color: "#64748B",
    fontSize: "12px",
    lineHeight: "1.5",
  },
};