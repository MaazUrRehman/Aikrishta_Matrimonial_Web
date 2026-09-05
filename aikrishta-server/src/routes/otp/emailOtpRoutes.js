import express from "express";
const router = express.Router();

import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";

import {
    sendEmailOTPValidation,
    verifyEmailOTPValidation,
    resendEmailOTPValidation,
} from "../../validations/otp/emailOtpValidation.js";

import {
    sendEmailOTPController,
    verifyEmailOTPController,
    resendEmailOTPController,
} from "../../controllers/otp/emailOtpController.js";

/*
|--------------------------------------------------------------------------
| Send Email OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/send-email-otp",
    protect,
    sendEmailOTPValidation,
    validate,
    sendEmailOTPController
);

/*
|--------------------------------------------------------------------------
| Verify Email OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/verify-email-otp",
    protect,
    verifyEmailOTPValidation,
    validate,
    verifyEmailOTPController
);

/*
|--------------------------------------------------------------------------
| Resend Email OTP
|--------------------------------------------------------------------------
*/

router.post(
    "/resend-email-otp",
    protect,
    resendEmailOTPValidation,
    validate,
    resendEmailOTPController
);

export default router;