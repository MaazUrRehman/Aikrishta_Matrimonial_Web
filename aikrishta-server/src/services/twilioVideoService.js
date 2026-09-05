import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// ==========================================
// Generate Twilio Video Access Token
// ==========================================

export const generateVideoToken = (identity, roomName) => {
  // ------------------------------------------
  // Validate required values
  // ------------------------------------------

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKeySid = process.env.TWILIO_API_KEY_SID;
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

  if (!accountSid || !apiKeySid || !apiKeySecret) {
    console.error(
      "❌ Twilio Video configuration is incomplete."
    );

    return {
      success: false,
      code: "TWILIO_CONFIG_MISSING",
      message: "Twilio Video configuration is incomplete.",
    };
  }

  if (!identity) {
    return {
      success: false,
      code: "IDENTITY_MISSING",
      message: "User identity is required.",
    };
  }

  if (!roomName) {
    return {
      success: false,
      code: "ROOM_NAME_MISSING",
      message: "Video room name is required.",
    };
  }

  try {
    // ------------------------------------------
    // Create Access Token
    // ------------------------------------------

    const token = new AccessToken(
      accountSid,
      apiKeySid,
      apiKeySecret,
      {
        identity: identity.toString(),
        ttl: 3600,
      }
    );

    // ------------------------------------------
    // Create Video Grant
    // ------------------------------------------

    const videoGrant = new VideoGrant({
      room: roomName.toString(),
    });

    token.addGrant(videoGrant);

    const jwt = token.toJwt();

    console.log("========================================");
    console.log("🎥 TWILIO VIDEO TOKEN GENERATED");
    console.log("Identity:", identity.toString());
    console.log("Room:", roomName.toString());
    console.log("Token length:", jwt.length);
    console.log("========================================");

    return {
      success: true,
      token: jwt,
      identity: identity.toString(),
      roomName: roomName.toString(),
    };

  } catch (error) {
    console.error(
      "❌ Twilio Video Token Generation Error:",
      error
    );

    return {
      success: false,
      code: "VIDEO_TOKEN_GENERATION_FAILED",
      message: "Unable to generate video token.",
    };
  }
};