import express from "express";
const router = express.Router();

import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";

import {
    sendPhoneOTPValidation,
    verifyPhoneOTPValidation,
    resendPhoneOTPValidation,
} from "../../validations/otp/phoneOtpValidation.js";

import {
    sendPhoneOTPController,
    verifyPhoneOTPController,
    resendPhoneOTPController,
} from "../../controllers/otp/phoneOtpController.js";

/*
|--------------------------------------------------------------------------
| Send Phone OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/send-phone-otp",
    protect,
    sendPhoneOTPValidation,
    validate,
    sendPhoneOTPController
);

/*
|--------------------------------------------------------------------------
| Verify Phone OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/verify-phone-otp",
    protect,
    verifyPhoneOTPValidation,
    validate,
    verifyPhoneOTPController
);

/*
|--------------------------------------------------------------------------
| Resend Phone OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/resend-phone-otp",
    protect,
    resendPhoneOTPValidation,
    validate,
    resendPhoneOTPController
);

export default router;