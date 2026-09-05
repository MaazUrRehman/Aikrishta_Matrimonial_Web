import express from "express";
import {
  testTwilioVideo,
  testTwilioVoice,
} from "../controllers/twilioTestController.js";

const router = express.Router();

router.get("/video", testTwilioVideo);
router.post("/voice", testTwilioVoice);

export default router;