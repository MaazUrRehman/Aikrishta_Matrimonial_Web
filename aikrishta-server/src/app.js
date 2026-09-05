import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import AppError from "./utils/AppError.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import ApiResponse from "./utils/ApiResponse.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileTypeRoutes from "./routes/profile/profileTypeRoutes.js";
import familyMemberRoutes from "./routes/profile/familyMemberRoutes.js";
import personalInformationRoutes from "./routes/profile/personalInformationRoutes.js";
import partnerPreferenceRoutes from "./routes/profile/partnerPreferenceRoutes.js";
import profileVerificationRoutes from "./routes/profile/profileVerificationRoutes.js";
import familyBackgroundRoutes from "./routes/profile/familyBackgroundRoutes.js";
import contactProfessionalRoutes from "./routes/profile/contactProfessionalRoutes.js";
import otpRoutes from "./routes/otp/phoneOtpRoutes.js";
import emailOtpRoutes from "./routes/otp/emailOtpRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { getVerificationStatusController } from "./controllers/profile/profileVerificationController.js";
import adminRoutes from "./routes/admin/adminRoutes.js"; 
import aiMatchRoutes from "./routes/ai-match/aiMatchRoutes.js";
import pictureRequestRoutes from "./routes/pictureRequestRoutes.js";
import horoscopeRoutes from "./routes/horoscopeRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import twilioTestRoutes from "./routes/twilioTestRoutes.js";
import twilioVoiceRoutes from "./routes/twilioVoiceRoutes.js";
import twilioVideoRoutes from "./routes/twilioVideoRoutes.js";

const app = express();


// ===============================
// Global Middlewares
// ===============================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


// ...
app.use("/api/v1/picture-requests", pictureRequestRoutes);
app.use("/api/v1/horoscope", horoscopeRoutes);

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/profile/profile-type", profileTypeRoutes);
app.use("/api/v1/profile/family-member", familyMemberRoutes);
app.use("/api/v1/profile/personal-information", personalInformationRoutes);
app.use("/api/v1/profile/contact-professional", contactProfessionalRoutes);
app.use("/api/v1/profile/family-background", familyBackgroundRoutes);
app.use("/api/v1/profile/partner-preference", partnerPreferenceRoutes);
app.use("/api/v1/profile/profile-verification", profileVerificationRoutes);

app.get("/api/v1/profile/verification-status",protect,getVerificationStatusController);

app.use("/api/v1/otp/phone-otp", otpRoutes);
app.use("/api/v1/otp/email-otp", emailOtpRoutes);

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/ai-match", aiMatchRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);

app.use("/api/v1/twilio-test", twilioTestRoutes);
app.use("/api/v1/twilio/voice", twilioVoiceRoutes);
app.use("/api/v1/twilio/video", twilioVideoRoutes);



// Health Check Route
app.get("/", (req, res) => {
  new ApiResponse(
    res,
    200,
    "Welcome to AIKRISHTA API 🚀"
  );
});


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;