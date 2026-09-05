import { generateVideoToken } from "../services/twilioVideoService.js";

// ==========================================
// Get Video Token
// ==========================================

export const getVideoToken = (req, res) => {
  try {
    // ------------------------------------------
    // IMPORTANT:
    // Identity ONLY comes from authenticated user
    // ------------------------------------------

    const identity = req.user?._id?.toString();

    if (!identity) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required.",
      });
    }

    // ------------------------------------------
    // Room name comes from authenticated request
    // ------------------------------------------

    const { roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({
        success: false,
        message: "Video room name is required.",
      });
    }

    // ------------------------------------------
    // Prevent invalid room names
    // ------------------------------------------

    const cleanRoomName = roomName.toString().trim();

    if (!cleanRoomName) {
      return res.status(400).json({
        success: false,
        message: "Video room name cannot be empty.",
      });
    }

    if (cleanRoomName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Video room name is too long.",
      });
    }

    console.log("========================================");
    console.log("🎥 VIDEO TOKEN REQUEST");
    console.log("Authenticated User:", identity);
    console.log("Room:", cleanRoomName);
    console.log("========================================");

    // ------------------------------------------
    // Generate token
    // ------------------------------------------

    const result = generateVideoToken(
      identity,
      cleanRoomName
    );

    // ------------------------------------------
    // Handle service error
    // ------------------------------------------

    if (!result.success) {
      console.error(
        "❌ Video Token Service Error:",
        result.code
      );

      return res.status(500).json({
        success: false,
        message: result.message,
        code: result.code,
      });
    }

    // ------------------------------------------
    // Success
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Video token generated successfully.",
      token: result.token,
      identity: result.identity,
      roomName: result.roomName,
    });

  } catch (error) {
    // ------------------------------------------
    // Final safety net
    // ------------------------------------------

    console.error(
      "❌ Video Token Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate video token.",
      code: "VIDEO_TOKEN_CONTROLLER_ERROR",
    });
  }
};