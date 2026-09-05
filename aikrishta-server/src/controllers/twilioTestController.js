import { generateVideoToken } from "../services/twilioVideoService.js";
import { makeVoiceCall } from "../services/twilioVoiceService.js";

export const testTwilioVideo = (req, res) => {
  try {
    const token = generateVideoToken(
      "aikrishta-test-user",
      "aikrishta-test-room"
    );

    res.status(200).json({
      success: true,
      message: "Twilio Video token generated successfully",
      token,
    });
  } catch (error) {
    console.error("Twilio Video Test Error:", error);

    res.status(500).json({
      success: false,
      message: "Twilio Video test failed",
      error: error.message,
    });
  }
};

export const testTwilioVoice = async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Phone number (to) is required",
      });
    }

    const call = await makeVoiceCall(to);

    res.status(200).json({
      success: true,
      message: "Twilio Voice call initiated successfully",
      callSid: call.sid,
      status: call.status,
    });
  } catch (error) {
    console.error("Twilio Voice Test Error:", error);

    res.status(500).json({
      success: false,
      message: "Twilio Voice test failed",
      error: error.message,
    });
  }
};