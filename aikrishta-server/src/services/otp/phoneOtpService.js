
// services/otp/phoneOtpService.js

import OTP from "../../models/otp/otpModel.js";
import AppError from "../../utils/AppError.js";
import ProfileVerification from "../../models/profile/profileVerificationModel.js";
import { sendOTP } from "../sms/twilioService.js";
import User from "../../models/User.js";

/*
|--------------------------------------------------------------------------
| Generate 6 Digit OTP
|--------------------------------------------------------------------------
*/

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/*
|--------------------------------------------------------------------------
| Send Phone OTP
|--------------------------------------------------------------------------
*/

export const sendPhoneOTP = async (
    userId,
    phone,
    purpose = "Phone Verification"
) => {

    console.log("====================================");
    console.log("===== SEND OTP =====");
    console.log("userId =", userId);
    console.log("phone =", phone);
    console.log("====================================");

    /*
    |--------------------------------------------------------------------------
    | Find Existing Profile
    |--------------------------------------------------------------------------
    */

    let existingProfile = await ProfileVerification.findOne({
        user_id: userId,
    });

    /*
    |--------------------------------------------------------------------------
    | Check Already Verified
    |--------------------------------------------------------------------------
    */

    if (existingProfile && existingProfile.phone_verified) {
        console.log(
            "Phone number is already verified.",
            400
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Create / Update Profile
    |--------------------------------------------------------------------------
    */

    if (!existingProfile) {

        const user = await User.findById(userId);

        if (!user) {
            console.log(
                "User not found.",
                404
            );
        }

        existingProfile = await ProfileVerification.create({
            user_id: userId,
            phone,
            email: user.email,
            phone_verified: false,
            profile_status: "Phone Pending",
        });

    } else {

        existingProfile.phone = phone;
        existingProfile.phone_verified = false;
        existingProfile.profile_status = "Phone Pending";

        await existingProfile.save();
    }

    /*
    |--------------------------------------------------------------------------
    | Send Actual OTP via Twilio
    |--------------------------------------------------------------------------
    */

    const result = await sendOTP(phone);

    /*
    |--------------------------------------------------------------------------
    | Save OTP
    |--------------------------------------------------------------------------
    */

    const otpRecord = await OTP.createOTP({
        user_id: userId,
        phone: phone,
        otp: result.otp,
        purpose: purpose,
        verification_id: existingProfile._id,
    });

    console.log("====================================");
    console.log("📲 PHONE OTP SENT SUCCESSFULLY");
    console.log(`📞 Phone     : ${phone}`);
    console.log(`🔑 OTP       : ${result.otp}`);
    console.log(`🆔 SID       : ${result.sid}`);
    console.log(`⏰ Expires At: ${otpRecord.expires_at}`);
    console.log("====================================");

    return {
        message: "OTP sent successfully to your phone.",
        sid: result.sid,
        expires_in: "5 minutes",
    };
};

/*
|--------------------------------------------------------------------------
| Verify Phone OTP
|--------------------------------------------------------------------------
*/

export const verifyPhoneOTP = async (
    userId,
    phone,
    otp,
    purpose = "Phone Verification"
) => {

    console.log("====================================");
    console.log("===== VERIFY OTP =====");
    console.log("userId =", userId);
    console.log("phone =", phone);
    console.log("entered OTP =", otp);
    console.log("====================================");

    /*
    |--------------------------------------------------------------------------
    | Find Valid OTP
    |--------------------------------------------------------------------------
    |
    | Model automatically checks:
    | is_verified = false
    | expires_at > current time
    | attempts < 5
    |
    */

    const otpRecord = await OTP.findValidOTP({
        user_id: userId,
        phone: phone,
        purpose: purpose,
    });

    /*
    |--------------------------------------------------------------------------
    | OTP Not Found / Expired / Already Used
    |--------------------------------------------------------------------------
    */

    if (!otpRecord) {

        console.log("❌ OTP not found / expired / already verified");

        console.log(
            "OTP not found or expired. Please request a new OTP.",
            400
        );
    }

    console.log("OTP found in database");
    console.log("Stored OTP =", otpRecord.otp);
    console.log("Entered OTP =", otp);
    console.log("Expires At =", otpRecord.expires_at);
    console.log("Current Time =", new Date());
    console.log("Attempts =", otpRecord.attempts);

    /*
    |--------------------------------------------------------------------------
    | Check Maximum Attempts
    |--------------------------------------------------------------------------
    */

    if (otpRecord.isMaxAttemptsReached()) {

        await otpRecord.deleteOne();

        console.log(
            "Too many invalid attempts. Please request a new OTP.",
            429
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Compare OTP
    |--------------------------------------------------------------------------
    */

    if (otpRecord.otp !== otp) {

        await otpRecord.incrementAttempts();

        const remainingAttempts = 5 - otpRecord.attempts;

        console.log(
            `Invalid OTP. ${remainingAttempts} attempts remaining.`,
            400
        );
    }

    /*
    |--------------------------------------------------------------------------
    | OTP CORRECT
    |--------------------------------------------------------------------------
    */

    otpRecord.is_verified = true;

    await otpRecord.save();

    console.log("====================================");
    console.log("✅ OTP VERIFIED SUCCESSFULLY");
    console.log("====================================");

    /*
    |--------------------------------------------------------------------------
    | Find Profile
    |--------------------------------------------------------------------------
    */

    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {

        console.log(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Determine Next Status
    |--------------------------------------------------------------------------
    */

    let nextStatus = "Email Pending";

    if (profileVerification.email_verified) {
        nextStatus = "Documents Pending";
    }

    if (
        profileVerification.documents &&
        profileVerification.documents.length > 0
    ) {
        nextStatus = "Under Review";
    }

    /*
    |--------------------------------------------------------------------------
    | Update Profile
    |--------------------------------------------------------------------------
    */

    await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                phone_verified: true,
                profile_status: nextStatus,
            }
        }
    );

    console.log("====================================");
    console.log("📱 PHONE VERIFICATION COMPLETED");
    console.log("Profile Status =", nextStatus);
    console.log("====================================");

    return {
        message: "Phone verified successfully.",
        phone_verified: true,
        next_step: profileVerification.email_verified
            ? "documents"
            : "email",
        profile_status: nextStatus,
    };
};

/*
|--------------------------------------------------------------------------
| Resend Phone OTP
|--------------------------------------------------------------------------
*/

export const resendPhoneOTP = async (
    userId,
    phone,
    purpose = "Phone Verification"
) => {

    const existingProfile = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (existingProfile && existingProfile.phone_verified) {

        console.log(
            "Phone number is already verified.",
            400
        );
    }

    return await sendPhoneOTP(
        userId,
        phone,
        purpose
    );
};