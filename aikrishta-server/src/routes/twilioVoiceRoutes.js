import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getVoiceToken, handleVoiceCall, initiateVoiceCall,handleCallStatus } from "../controllers/twilioVoiceController.js";

const router = express.Router();

router.get("/token", protect, getVoiceToken);

router.post("/twiml", handleVoiceCall);

router.post("/initiate", protect, initiateVoiceCall);

router.post("/status", (req, res) => {
  console.log("📞 Call Status Update:", req.body);
  res.status(200).send();
});

export default router;