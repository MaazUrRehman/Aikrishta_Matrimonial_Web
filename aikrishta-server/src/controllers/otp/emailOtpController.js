import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    sendEmailOTP,
    verifyEmailOTP,
    resendEmailOTP,
} from "../../services/otp/emailOtpService.js";

/*
|--------------------------------------------------------------------------
| Send Email OTP
|--------------------------------------------------------------------------
*/

export const sendEmailOTPController = asyncHandler(async (req, res) => {

    const response = await sendEmailOTP(
        req.user.id,
        req.body.email
    );

    return new ApiResponse(
        res,
        200,
        response.message
    );

});

/*
|--------------------------------------------------------------------------
| Verify Email OTP
|--------------------------------------------------------------------------
*/

export const verifyEmailOTPController = asyncHandler(async (req, res) => {

    await verifyEmailOTP(
        req.user.id,
        req.body.email,
        req.body.otp
    );

    return new ApiResponse(
        res,
        200,
        "Email verified successfully."
    );

});

/*
|--------------------------------------------------------------------------
| Resend Email OTP
|--------------------------------------------------------------------------
*/

export const resendEmailOTPController = asyncHandler(async (req, res) => {

    const response = await resendEmailOTP(
        req.user.id,
        req.body.email
    );

    return new ApiResponse(
        res,
        200,
        response.message
    );

});