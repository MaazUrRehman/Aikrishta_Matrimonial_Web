// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const AccessToken = twilio.jwt.AccessToken;
// const VoiceGrant = AccessToken.VoiceGrant;



// // services/twilioVoiceService.js
// export const generateVoiceToken = (identity) => {
//   const token = new AccessToken(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_API_KEY_SID,
//     process.env.TWILIO_API_KEY_SECRET,
//     {
//       identity,
//       ttl: 3600,
//     }
//   );

//   const voiceGrant = new VoiceGrant({
//     outgoingApplicationSid: process.env.TWILIO_VOICE_APP_SID,
//     incomingAllow: true,
//     // Add the webhook URL for incoming calls
//     incoming: {
//       url: `${process.env.BASE_URL}/api/twilio/voice/twiml`, // Your backend URL
//     },
//   });

//   token.addGrant(voiceGrant);

//   return token.toJwt();
// };

// // Old PSTN test — only for testing
// export const makeVoiceCall = async (to) => {
//   const call = await twilioClient.calls.create({
//     to,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     url: "https://demo.twilio.com/docs/voice.xml",
//   });

//   return call;
// };


import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// =========================
// Generate Voice Token
// =========================


// services/twilioVoiceService.js
export const generateVoiceToken = (identity) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKeySid = process.env.TWILIO_API_KEY_SID;
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
  const voiceAppSid = process.env.TWILIO_VOICE_APP_SID;

  if (!accountSid || !apiKeySid || !apiKeySecret || !voiceAppSid) {
    console.error("Missing Twilio environment variables");
    console.log("Twilio configuration is incomplete");
  }

  const token = new AccessToken(
    accountSid,
    apiKeySid,
    apiKeySecret,
    {
      identity: identity.toString(),
      ttl: 3600,
    }
  );

  // Important: Voice grant configuration
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: voiceAppSid,
    incomingAllow: true,
  });

  token.addGrant(voiceGrant);

  const jwt = token.toJwt();
  console.log("Token generated for identity:", identity);
  console.log("Voice App SID:", voiceAppSid);
  console.log("Token length:", jwt.length);
  
  return jwt;
};

// =========================
// Make PSTN Call (Testing)
// =========================
export const makeVoiceCall = async (to) => {
  const call = await twilioClient.calls.create({
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
    url: "https://demo.twilio.com/docs/voice.xml",
  });

  return call;
};