import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    sendPhoneOTP,
    verifyPhoneOTP,
    resendPhoneOTP,
} from "../../services/otp/phoneOtpService.js";

/*
|--------------------------------------------------------------------------
| Send Phone OTP
|--------------------------------------------------------------------------
*/

export const sendPhoneOTPController = asyncHandler(async (req, res) => {

    console.log("===== SEND OTP =====");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const response = await sendPhoneOTP(
        req.user.id,
        req.body.phone
    );

    console.log("Service Response:", response);

    return new ApiResponse(
        res,
        200,
        response.message
    );

});

/*
|--------------------------------------------------------------------------
| Verify Phone OTP
|--------------------------------------------------------------------------
*/

export const verifyPhoneOTPController = asyncHandler(async (req, res) => {

    await verifyPhoneOTP(
        req.user.id,
        req.body.phone,
        req.body.otp
    );

    return new ApiResponse(
        res,
        200,
        "Phone number verified successfully."
    );

});

/*
|--------------------------------------------------------------------------
| Resend Phone OTP
|--------------------------------------------------------------------------
*/

export const resendPhoneOTPController = asyncHandler(async (req, res) => {

    const response = await resendPhoneOTP(
        req.user.id,
        req.body.phone
    );

    return new ApiResponse(
        res,
        200,
        response.message
    );

});