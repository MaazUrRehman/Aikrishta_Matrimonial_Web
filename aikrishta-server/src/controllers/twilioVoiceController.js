// import { generateVoiceToken } from "../services/twilioVoiceService.js";
// import twilio from "twilio";

// export const getVoiceToken = (req, res) => {
//   try {
//     const identity = req.user?._id?.toString() || req.body.identity;

//     if (!identity) {
//       return res.status(400).json({
//         success: false,
//         message: "User identity is required",
//       });
//     }

//     const token = generateVoiceToken(identity);

//     res.status(200).json({
//       success: true,
//       message: "Voice token generated successfully",
//       token,
//       identity,
//     });
//   } catch (error) {
//     console.error("Voice Token Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to generate voice token",
//       error: error.message,
//     });
//   }
// };

// // export const handleVoiceCall = (req, res) => {
// //   try {
// //     const { To } = req.body;

// //     const VoiceResponse = twilio.twiml.VoiceResponse;
// //     const response = new VoiceResponse();

// //     const dial = response.dial();

// //     if (To) {
// //       dial.client(To);
// //     }

// //     res.type("text/xml");
// //     res.send(response.toString());
// //   } catch (error) {
// //     console.error("TwiML Voice Error:", error);

// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to generate TwiML",
// //       error: error.message,
// //     });
// //   }
// // };


// // export const handleVoiceCall = (req, res) => {
// //   try {
// //     const { To, From } = req.body;

// //     console.log("========== TWILIO TWIML ==========");
// //     console.log("From:", From);
// //     console.log("To:", To);
// //     console.log("==================================");

// //     if (!To) {
// //       return res.status(400).type("text/xml").send(`
// //         <Response>
// //           <Say>Receiver was not provided.</Say>
// //           <Hangup/>
// //         </Response>
// //       `);
// //     }

// //     const VoiceResponse = twilio.twiml.VoiceResponse;
// //     const response = new VoiceResponse();

// //     const dial = response.dial();

// //     dial.client(To);

// //     res
// //       .status(200)
// //       .type("text/xml")
// //       .send(response.toString());

// //   } catch (error) {
// //     console.error("TwiML Voice Error:", error);

// //     res.status(500).type("text/xml").send(`
// //       <Response>
// //         <Say>Unable to connect the call.</Say>
// //         <Hangup/>
// //       </Response>
// //     `);
// //   }
// // };

// // controllers/twilioVoiceController.js
// export const handleVoiceCall = (req, res) => {
//   try {
//     const { To, From, CallSid } = req.body;

//     console.log("========== TWILIO TWIML ==========");
//     console.log("From:", From);
//     console.log("To:", To);
//     console.log("CallSid:", CallSid);
//     console.log("All params:", req.body);
//     console.log("==================================");

//     // If no To parameter, this is likely an incoming call to the user
//     if (!To) {
//       // For incoming calls, we need to handle them differently
//       // This is where you would route the call to the appropriate client
//       const VoiceResponse = twilio.twiml.VoiceResponse;
//       const response = new VoiceResponse();
      
//       // Try to connect to the user's device
//       const dial = response.dial();
      
//       // If we have the caller's identity from the request
//       if (req.body.From) {
//         dial.client(req.body.From);
//       } else {
//         // Default response for testing
//         response.say("Thank you for calling. Please try again.");
//         response.hangup();
//       }
      
//       res.status(200).type("text/xml").send(response.toString());
//       return;
//     }

//     // For outgoing calls (when To is provided)
//     const VoiceResponse = twilio.twiml.VoiceResponse;
//     const response = new VoiceResponse();

//     const dial = response.dial({
//       callerId: process.env.TWILIO_PHONE_NUMBER,
//       timeout: 30,
//     });

//     // Connect to the client identity
//     dial.client(To);

//     // Add a fallback if the client doesn't answer
//     response.say({
//       voice: 'alice',
//     }, 'The person you are trying to reach is not available. Please try again later.');
//     response.hangup();

//     const twimlResponse = response.toString();
//     console.log("TwiML Response:", twimlResponse);

//     res
//       .status(200)
//       .type("text/xml")
//       .send(twimlResponse);

//   } catch (error) {
//     console.error("TwiML Voice Error:", error);

//     res.status(500).type("text/xml").send(`
//       <Response>
//         <Say voice="alice">Unable to connect the call. Please try again later.</Say>
//         <Hangup/>
//       </Response>
//     `);
//   }
// };


// // export const initiateVoiceCall = async (req, res) => {

// //   try {
// //     const { receiverId } = req.body;

// //     if (!receiverId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Receiver ID is required",
// //       });
// //     }

// //     const callerId = req.user._id.toString();

// //     if (callerId === receiverId.toString()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "You cannot call yourself",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Voice call request ready",
// //       callerIdentity: callerId,
// //       receiverIdentity: receiverId.toString(),
// //     });
// //   } catch (error) {
// //     console.error("Voice Call Initiation Error:", error);

// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to initiate voice call",
// //       error: error.message,
// //     });
// //   }
// // };


// // controllers/twilioVoiceController.js
// export const initiateVoiceCall = async (req, res) => {
//   try {
//     const { receiverId } = req.body;

//     if (!receiverId) {
//       return res.status(400).json({
//         success: false,
//         message: "Receiver ID is required",
//       });
//     }

//     const callerId = req.user._id.toString();

//     if (callerId === receiverId.toString()) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot call yourself",
//       });
//     }

//     // Log for debugging
//     console.log("Initiating call from:", callerId);
//     console.log("To receiver:", receiverId.toString());

//     res.status(200).json({
//       success: true,
//       message: "Voice call request ready",
//       callerIdentity: callerId,
//       receiverIdentity: receiverId.toString(),
//     });
//   } catch (error) {
//     console.error("Voice Call Initiation Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to initiate voice call",
//       error: error.message,
//     });
//   }
// };













import { generateVoiceToken } from "../services/twilioVoiceService.js";
import twilio from "twilio";

// =========================
// Get Voice Token
// =========================
export const getVoiceToken = (req, res) => {
  try {
    const identity = req.user?._id?.toString() || req.body.identity;

    if (!identity) {
      return res.status(400).json({
        success: false,
        message: "User identity is required",
      });
    }

    console.log("Generating token for user:", identity);

    const token = generateVoiceToken(identity);

    res.status(200).json({
      success: true,
      message: "Voice token generated successfully",
      token,
      identity,
    });
  } catch (error) {
    console.error("Voice Token Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate voice token",
      error: error.message,
    });
  }
};

// =========================
// Handle Voice Call (TwiML)
// =========================
// export const handleVoiceCall = (req, res) => {
//   try {
//     const { To, From, CallSid } = req.body;

//     console.log("========== TWILIO TWIML ==========");
//     console.log("From:", From);
//     console.log("To:", To);
//     console.log("CallSid:", CallSid);
//     console.log("All params:", req.body);
//     console.log("==================================");

//     const VoiceResponse = twilio.twiml.VoiceResponse;
//     const response = new VoiceResponse();

//     // If no To parameter, this is an incoming call
//     if (!To) {
//       // For incoming calls, connect to the client
//       const dial = response.dial({
//         callerId: process.env.TWILIO_PHONE_NUMBER,
//         timeout: 30,
//       });
      
//       // Use the From parameter to identify the client
//       if (From) {
//         dial.client(From);
//       } else {
//         response.say("Thank you for calling. Please try again.");
//         response.hangup();
//       }
      
//       res.status(200).type("text/xml").send(response.toString());
//       return;
//     }

//     // For outgoing calls (when To is provided)
//     const dial = response.dial({
//       callerId: process.env.TWILIO_PHONE_NUMBER,
//       timeout: 30,
//     });

//     // Connect to the client identity
//     dial.client(To);

//     // Add a fallback if the client doesn't answer
//     response.say({
//       voice: 'alice',
//     }, 'The person you are trying to reach is not available. Please try again later.');
//     response.hangup();

//     const twimlResponse = response.toString();
//     console.log("TwiML Response:", twimlResponse);

//     res
//       .status(200)
//       .type("text/xml")
//       .send(twimlResponse);

//   } catch (error) {
//     console.error("TwiML Voice Error:", error);
//     res.status(500).type("text/xml").send(`
//       <Response>
//         <Say voice="alice">Unable to connect the call. Please try again later.</Say>
//         <Hangup/>
//       </Response>
//     `);
//   }
// };

// controllers/twilioVoiceController.js
export const handleVoiceCall = (req, res) => {
  try {
    const { To, From, CallSid, CallStatus } = req.body;

    console.log("========== TWILIO TWIML ==========");
    console.log("From:", From);
    console.log("To:", To);
    console.log("CallSid:", CallSid);
    console.log("CallStatus:", CallStatus);
    console.log("All params:", req.body);
    console.log("==================================");

    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    // For outgoing calls (when To is provided)
    if (To) {
      console.log("Outgoing call to:", To);
      
      const dial = response.dial({
        callerId: From, // Use the caller's identity as callerId
        timeout: 30,
        answerOnBridge: true, // Important: This keeps the call connected
        action: '/api/twilio/voice/status', // Optional: webhook for call status
        method: 'POST',
      });

      // Connect to the client identity
      dial.client(To);

      console.log("TwiML Response:", response.toString());
      
      res
        .status(200)
        .type("text/xml")
        .send(response.toString());
      return;
    }

    // For incoming calls (when To is not provided)
    console.log("Incoming call from:", From);
    
    const dial = response.dial({
      callerId: process.env.TWILIO_PHONE_NUMBER,
      timeout: 30,
      answerOnBridge: true,
    });

    // Use the From parameter to identify the client
    if (From) {
      dial.client(From);
    } else {
      response.say("Thank you for calling. Please try again.");
      response.hangup();
    }

    res
      .status(200)
      .type("text/xml")
      .send(response.toString());

  } catch (error) {
    console.error("TwiML Voice Error:", error);
    res.status(500).type("text/xml").send(`
      <Response>
        <Say voice="alice">Unable to connect the call. Please try again later.</Say>
        <Hangup/>
      </Response>
    `);
  }
};

// Add this new endpoint for call status updates
export const handleCallStatus = (req, res) => {
  console.log("========== CALL STATUS UPDATE ==========");
  console.log("CallSid:", req.body.CallSid);
  console.log("CallStatus:", req.body.CallStatus);
  console.log("From:", req.body.From);
  console.log("To:", req.body.To);
  console.log("=========================================");
  
  res.status(200).send();
};

// =========================
// Initiate Voice Call
// =========================
export const initiateVoiceCall = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    const callerId = req.user._id.toString();

    if (callerId === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot call yourself",
      });
    }

    console.log("Initiating call from:", callerId);
    console.log("To receiver:", receiverId.toString());

    res.status(200).json({
      success: true,
      message: "Voice call request ready",
      callerIdentity: callerId,
      receiverIdentity: receiverId.toString(),
    });
  } catch (error) {
    console.error("Voice Call Initiation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate voice call",
      error: error.message,
    });
  }
};