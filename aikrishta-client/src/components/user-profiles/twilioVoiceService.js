

import { Device } from "@twilio/voice-sdk";
import axiosInstance from "@/lib/axios";
import { toast } from 'react-hot-toast';

let device = null;
let outgoingCallListener = null;
let isDeviceInitializing = false;
let deviceInitPromise = null;

// SUPPRESS TWILIO ERRORS
// =========================
// Store original console.error
const originalConsoleError = console.error;

// Override console.error to suppress Twilio errors
// console.error = function (...args) {
//   // Check if this is a Twilio error we want to suppress
//   const firstArg = args[0] || '';
//   const message = typeof firstArg === 'string' ? firstArg : JSON.stringify(firstArg);

//   // Suppress all Twilio errors
//   if (message.includes('Twilio') ||
//     message.includes('ConnectionError') ||
//     message.includes('HANGUP') ||
//     message.includes('31005') ||
//     message.includes('Error sent from gateway') ||
//     message.includes('gateway') ||
//     message.includes('Received an error') ||
//     message.includes('Microphone') ||
//     message.includes('timeout') ||
//     message.includes('MediaStream') ||
//     message.includes('53405') ||
//     message.includes('Failed to fetch') ||
//     message.includes('Unable to post')) {
//     return; // Silently suppress
//   }

//   // For other errors, use original
//   originalConsoleError.apply(console, args);
// };

console.error = function (...args) {
  const firstArg = args[0] || '';
  const message = typeof firstArg === 'string' ? firstArg : JSON.stringify(firstArg);

  // 🔥 SAB KUCH SUPPRESS
  const suppressPatterns = [
    'Twilio',
    'ConnectionError',
    'HANGUP',
    '31005',
    'gateway',
    'Error sent from gateway',
    'Received an error',
    'Microphone',
    'timeout',
    'MediaStream',
    '53405',
    'Failed to fetch',
    'Unable to post',
    'Insights'
  ];

  const shouldSuppress = suppressPatterns.some(pattern =>
    message.includes(pattern)
  );

  if (shouldSuppress) {
    return; // 🔥 CHUP CHAP SUPPRESS
  }

  originalConsoleError.apply(console, args);
};

export const getVoiceDevice = () => {
  return device;
};

export const setOutgoingCallListener = (listener) => {
  outgoingCallListener = listener;
};

// =========================
// CHECK AND REQUEST MICROPHONE PERMISSION
// =========================
export const checkAndRequestMicrophonePermission = async () => {
  try {
    console.log("🎤 Checking microphone permission...");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Your browser does not support audio capture. Please use Chrome, Firefox, or Edge.");
      return false;
    }

    const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
    console.log("Current microphone permission status:", permissionStatus.state);

    if (permissionStatus.state === 'granted') {
      console.log("✅ Microphone permission already granted");
      return true;
    }

    if (permissionStatus.state === 'denied') {
      console.error("❌ Microphone permission denied by user");
      toast.error("Microphone access was denied. Please allow microphone access in your browser settings and refresh the page.");
      return false;
    }

    console.log("🔄 Requesting microphone permission...");
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Microphone request timeout")), 20000);
    });

    const micPromise = navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    const stream = await Promise.race([micPromise, timeoutPromise]);

    stream.getTracks().forEach(track => track.stop());
    console.log("✅ Microphone permission granted successfully");
    return true;

  } catch (error) {
    console.error("❌ Microphone permission error:", error.message);


    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      toast.error("Microphone access was denied. Please click the camera/mic icon in your browser address bar and allow microphone access, then refresh the page.");
      return false;
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      toast.error("No microphone found. Please connect a microphone and try again.");
      return false;
    } else if (error.name === 'NotReadableError') {
      toast.error("Microphone is being used by another application. Please close other apps using the microphone.");
      return false;
    } else {
      toast.error(`Microphone error: ${error.message}`);
      return false;
    }

    return false;
  }
};

// =========================
// OPEN MICROPHONE PERMISSION SETTINGS
// =========================
export const openMicrophoneSettings = () => {
  if (navigator.permissions && navigator.permissions.request) {
    navigator.permissions.request({ name: 'microphone' })
      .then(result => {
        console.log("Permission requested:", result.state);
        if (result.state === 'granted') {
          window.location.reload();
        }
      })
      .catch(err => console.error("Error requesting permission:", err));
  }

  alert(
    "🔊 Please allow microphone access:\n\n" +
    "1. Click the 🔒 or camera icon in the address bar\n" +
    "2. Find 'Microphone' and select 'Allow'\n" +
    "3. Refresh the page\n\n" +
    "Or use Incognito/Private window for testing."
  );
};

// =========================
// Initialize Voice Device
// =========================
export const initializeVoiceDevice = async () => {
  if (device) {
    console.log("🔍 Device exists, checking state:", device.state);

    if (device.state === 'registered') {
      console.log("✅ Device already registered, reusing...");
      return { device };
    }

    console.log("🧹 Device exists but not registered, cleaning up...");
    try {
      if (device.state === 'registered') {
        await device.unregister();
      }
      device.destroy();
    } catch (err) {
      console.log("Error cleaning up device:", err);
    }
    device = null;
  }

  if (isDeviceInitializing) {
    console.log("⏳ Device initialization already in progress, waiting...");
    await deviceInitPromise;
    return deviceInitPromise;
  }

  isDeviceInitializing = true;

  try {
    console.log("🎤 Step 1: Checking microphone permission...");
    const hasPermission = await checkAndRequestMicrophonePermission();
    if (!hasPermission) {
      toast.error("Microphone permission is required for voice calls");
      return null;
    }

    console.log("🔑 Step 2: Fetching voice token...");
    const response = await axiosInstance.get("/twilio/voice/token", {
      withCredentials: true,
    });

    console.log("Token response:", {
      status: response.status,
      hasToken: !!response.data.token,
      identity: response.data.identity
    });

    const { token, identity } = response.data;

    if (!token) {
      console.error("❌ No token received from server");
      toast.error("No token received from server");
      return null;
    }

    console.log("✅ Token received, length:", token.length);

    if (device) {
      console.log("Device was created during async ops, checking state...");
      if (device.state === 'registered') {
        console.log("Device is registered, reusing...");
        return { device, identity };
      }
      try {
        if (device.state === 'registered') {
          await device.unregister();
        }
        device.destroy();
      } catch (err) {
        console.log("Error cleaning up device:", err);
      }
      device = null;
    }

    console.log("📱 Step 3: Creating Device instance...");
    device = new Device(token, {
      logLevel: 0,
      codecPreferences: ['opus', 'pcmu'],
      insights: false,
    });

    device.on("registered", () => {
      console.log("✅ Twilio Voice Device registered:", identity);
    });

    device.on("error", (error) => {
      console.error("❌ Twilio Device error:", error);
      if (error.code === 31204 || error.message?.includes('Token not validated')) {
        console.log("Token invalid, will reinitialize on next call");
        device = null;
      }
    });

    device.on("unregistered", () => {
      console.log("Twilio Voice Device unregistered");
    });

    device.on("destroyed", () => {
      console.log("Twilio Voice Device destroyed");
    });

    console.log("📡 Step 4: Registering device...");
    await device.register();
    console.log("✅ Device registered successfully");

    return { device, identity };
  } catch (error) {
    console.error("❌ Failed to initialize voice device:", error);

    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    device = null;
    return null;
  } finally {
    isDeviceInitializing = false;
    deviceInitPromise = null;
  }
};

// =========================
// Start Outgoing Call
// =========================
export const startVoiceCall = async (receiverId) => {
  if (!receiverId) {
    toast.error("Receiver ID is required");
    return { error: "Receiver ID is required" };
  }

  try {
    console.log("📞 Starting call to:", receiverId);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You must be logged in to make a call");
      return { error: "You must be logged in to make a call" };
    }

    const response = await axiosInstance.post(
      "/twilio/voice/initiate",
      { receiverId }
    );

    console.log("Initiate response:", response.data);

    const { receiverIdentity } = response.data;
    console.log("Receiver identity:", receiverIdentity);

    const result = await initializeVoiceDevice();

    if (!result) {
      toast.error("Failed to initialize voice device. Please check microphone permissions.");
      return { error: "Failed to initialize voice device. Please check microphone permissions." };
    }

    const { device: voiceDevice } = result;

    if (!voiceDevice) {
      toast.error("Failed to initialize voice device");
      return { error: "Failed to initialize voice device" };
    }

    console.log("Device state:", voiceDevice.state);

    const callPromise = voiceDevice.connect({
      params: {
        To: receiverIdentity,
        // timeout: 10,
      },
    });

    // const timeoutPromise = new Promise((_, reject) => {
    //   setTimeout(() => {
    //     reject(new Error("Receiver is not available"));
    //   }, 15000);
    // });

    // const call = await Promise.race([callPromise, timeoutPromise]);

    const call = await callPromise;

    let callAccepted = false;
    let callEndedByTimeout = false;

    const noAnswerTimer = setTimeout(() => {
      if (!callAccepted) {
        callEndedByTimeout = true;

        call.emit("userError", "Receiver is not available");

        try {
          call.disconnect();
        } catch (e) {
          // ignore
        }
      }
    }, 15000);

    console.log("✅ Call initiated:", call);

    if (outgoingCallListener) {
      outgoingCallListener(call);
    }

    call.on("accept", () => {
      console.log("✅ Call accepted");

      callAccepted = true;

      clearTimeout(noAnswerTimer);
    });

    call.on("ringing", () => {
      console.log("📞 Call ringing...");
    });

    

    call.on("error", (error) => {
  const message = String(error?.message || "").toLowerCase();

  // Microphone / permission / token errors
  if (
    message.includes("microphone") ||
    message.includes("permission") ||
    message.includes("token")
  ) {
    let errorMessage = "Voice call failed";

    if (message.includes("microphone")) {
      errorMessage = "Microphone access is required";
    } else if (message.includes("permission")) {
      errorMessage = "Microphone permission denied";
    } else if (message.includes("token")) {
      errorMessage = "Authentication error. Please refresh the page.";
    }

    call.emit("userError", errorMessage);
    return;
  }

  // HANGUP / 31005
  if (
    error?.code === 31005 ||
    message.includes("hangup") ||
    message.includes("error sent from gateway")
  ) {
    clearTimeout(noAnswerTimer);

    // Agar 15 sec already complete ho chuke hain
    // to unavailable already handle ho chuka hai.
    if (callEndedByTimeout) {
      return;
    }

    // HANGUP 15 sec se pehle = receiver rejected
    if (!callAccepted) {
      call.emit("userError", "Call rejected by receiver");
    }

    return;
  }

  if (
    message.includes("unavailable") ||
    message.includes("offline") ||
    message.includes("not found") ||
    message.includes("timeout") ||
    message.includes("not receiving")
  ) {
    call.emit("userError", "Receiver is not available");
    return;
  }

  if (message.includes("cancel")) {
    call.emit("userError", "Call cancelled");
    return;
  }

  call.emit("userError", "Voice call failed");
});




    call.on("disconnect", () => {
      console.log("📞 Call disconnected");
      clearTimeout(noAnswerTimer);
      call.emit('userEnd', 'Call ended');
    });

    call.on("cancel", () => {
      console.log("📞 Call cancelled");
      call.emit('userEnd', 'Call cancelled');
    });

    return call;
  } catch (error) {
    console.error("❌ Failed to start voice call:", error);

    let errorMessage = error?.response?.data?.message || error?.message || "Unable to start voice call";

    if (errorMessage.includes('HANGUP') || errorMessage.includes('31005') || errorMessage.includes('rejected')) {
      errorMessage = "Call was rejected by the user";
    } else if (errorMessage.includes('unavailable') || errorMessage.includes('offline') || errorMessage.includes('not found')) {
      errorMessage = "User is not available for a call right now";
    } else if (errorMessage.includes('timeout') || errorMessage.includes('not receiving')) {
      errorMessage = "Receiver is not receiving the call";
    }

    return { error: errorMessage };
  }
};

// =========================
// Setup Incoming Call Listener
// =========================
export const setupIncomingCallListener = async (onIncomingCall) => {
  try {
    console.log("Setting up incoming call listener...");

    const result = await initializeVoiceDevice();

    if (!result) {
      console.error("❌ Failed to initialize voice device");
      return () => { };
    }

    const { device: voiceDevice } = result;

    if (!voiceDevice) {
      console.error("❌ Failed to initialize voice device - device is null");
      return () => { };
    }

    const handleIncomingCall = (call) => {
      console.log("📞 Incoming voice call received:", call);
      if (onIncomingCall) {
        onIncomingCall(call);
      }
    };

    voiceDevice.on("incoming", handleIncomingCall);

    return () => {
      voiceDevice.off("incoming", handleIncomingCall);
    };
  } catch (error) {
    console.error("❌ Failed to setup incoming call listener:", error);
    return () => { };
  }
};

// =========================
// Destroy Device
// =========================
export const destroyVoiceDevice = () => {
  if (!device) {
    console.log("No device to destroy");
    return;
  }

  try {
    console.log("Destroying voice device, current state:", device.state);

    if (device.state === 'registered') {
      device.unregister();
    }

    device.destroy();
    console.log("✅ Voice device destroyed successfully");
  } catch (error) {
    console.error("❌ Voice device cleanup error:", error);
  }

  device = null;
  isDeviceInitializing = false;
  deviceInitPromise = null;
};

// =========================
// REQUEST MICROPHONE PERMISSION ON PAGE LOAD
// =========================
export const requestMicrophoneOnLoad = async () => {
  try {
    console.log("🎤 Requesting microphone permission on page load...");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    stream.getTracks().forEach(track => track.stop());
    console.log("✅ Microphone permission granted on page load");
    return true;
  } catch (error) {
    console.warn("⚠️ Microphone permission not granted on load:", error.message);
    return false;
  }
};
