// // services/otp/emailOtpService.js
// import OTP from "../../models/otp/otpModel.js";
// import AppError from "../../utils/AppError.js";
// import ProfileVerification from "../../models/profile/profileVerificationModel.js";
// import sendEmail from "../../utils/email.js";

// /*
// |--------------------------------------------------------------------------
// | Generate 6 Digit OTP
// |--------------------------------------------------------------------------
// */

// export const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// /*
// |--------------------------------------------------------------------------
// | Send Email OTP
// |--------------------------------------------------------------------------
// */

// export const sendEmailOTP = async (
//     userId,
//     email,
//     purpose = "Email Verification"
// ) => {

//     // Check if email already verified
//     const existingProfile = await ProfileVerification.findOne({
//         user_id: userId,
//     });

//     if (existingProfile && existingProfile.email_verified) {
//         throw new AppError(
//             "Email is already verified.",
//             400
//         );
//     }

//     // Delete previous unverified OTPs for same purpose
//     await OTP.deleteMany({
//         user_id: userId,
//         purpose,
//         verified: false,
//     });

//     const otp = generateOTP();

//     const expiresAt = new Date(
//         Date.now() + 5 * 60 * 1000 // 5 Minutes
//     );

//     const otpRecord = await OTP.create({
//         user_id: userId,
//         email,
//         otp,
//         purpose,
//         expires_at: expiresAt,
//     });

//     /*
//     |--------------------------------------------------------------------------
//     | Update Profile Verification with OTP
//     |--------------------------------------------------------------------------
//     */

//     if (existingProfile) {
//         await ProfileVerification.findOneAndUpdate(
//             { user_id: userId },
//             {
//                 $set: {
//                     email_otp: otp,
//                     email_otp_expiry: expiresAt,
//                     profile_status: "Email Pending",
//                 }
//             }
//         );
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Send Email
//     |--------------------------------------------------------------------------
//     */

//     await sendEmail({
//         email,
//         subject: "AIKRISHTA Email Verification OTP",
//         message: `Your Email Verification OTP is ${otp}`,
//         html: `
//             <div style="font-family: Arial, sans-serif; padding:20px; max-width:600px; margin:0 auto;">
//                 <h2 style="color:#333;">AIKRISHTA Email Verification</h2>
//                 <p>Please use the following OTP to verify your email address:</p>
//                 <div style="background:#f4f4f4; padding:20px; text-align:center; border-radius:8px; margin:20px 0;">
//                     <h1 style="letter-spacing:8px; color:#2c3e50;">${otp}</h1>
//                 </div>
//                 <p style="color:#666;">This OTP is valid for <b>5 minutes</b>.</p>
//                 <p style="color:#666; font-size:14px;">If you did not request this verification, please ignore this email.</p>
//                 <hr style="border:1px solid #eee; margin:20px 0;">
//                 <p style="color:#999; font-size:12px;">AIKRISHTA - Your Trusted Matrimony Platform</p>
//             </div>
//         `,
//     });

//     console.log("\n====================================");
//     console.log("📧 EMAIL OTP");
//     console.log(`📩 Email   : ${email}`);
//     console.log(`🔐 OTP     : ${otp}`);
//     console.log(`⏰ Expires : ${expiresAt}`);
//     console.log("====================================\n");

//     return {
//         message: "Email OTP sent successfully.",
//         otp: otp, // Only in development
//     };

// };

// /*
// |--------------------------------------------------------------------------
// | Verify Email OTP
// |--------------------------------------------------------------------------
// */

// // export const verifyEmailOTP = async (
// //     userId,
// //     email,
// //     otp,
// //     purpose = "Email Verification"
// // ) => {

// //     const otpRecord = await OTP.findOne({
// //         user_id: userId,
// //         email,
// //         purpose,
// //         verified: false,
// //     });

// //     if (!otpRecord) {
// //         console.log(
// //             "OTP not found or already verified.",
// //             404
// //         );
// //     }

// //     if (otpRecord.expires_at < new Date()) {
// //         await otpRecord.deleteOne();
// //         console.log(
// //             "OTP has expired. Please request a new one.",
// //             400
// //         );
// //     }

// //     otpRecord.attempts += 1;

// //     if (otpRecord.attempts > 5) {
// //         await otpRecord.deleteOne();
// //         console.log(
// //             "Too many invalid attempts. Please request a new OTP.",
// //             429
// //         );
// //     }

// //     if (otpRecord.otp !== otp) {
// //         await otpRecord.save();
// //         console.log(
// //             "Invalid OTP. Please try again.",
// //             400
// //         );
// //     }

// //     otpRecord.verified = true;
// //     await otpRecord.save();

// //     /*
// //     |--------------------------------------------------------------------------
// //     | Update Profile Verification
// //     |--------------------------------------------------------------------------
// //     */

// //     const profileVerification = await ProfileVerification.findOne({
// //         user_id: userId,
// //     });

// //     if (!profileVerification) {
// //         console.log(
// //             "Profile verification not found. Please submit profile form first.",
// //             404
// //         );
// //     }

// //     // Determine next status based on phone verification
// //     let nextStatus = "Documents Pending";
// //     if (!profileVerification.phone_verified) {
// //         nextStatus = "Phone Pending";
// //     }

// //     // Check if all documents are already uploaded
// //     if (profileVerification.documents && profileVerification.documents.length > 0) {
// //         nextStatus = "Under Review";
// //     }

// //     await ProfileVerification.findOneAndUpdate(
// //         { user_id: userId },
// //         {
// //             $set: {
// //                 email_verified: true,
// //                 email_otp: null,
// //                 email_otp_expiry: null,
// //                 profile_status: nextStatus,
// //             }
// //         }
// //     );

// //     return {
// //         message: "Email verified successfully.",
// //         email_verified: true,
// //         next_step: profileVerification.phone_verified ? "documents" : "phone",
// //     };

// // };


// export const verifyEmailOTP = async (
//     userId,
//     email,
//     otp,
//     purpose = "Email Verification"
// ) => {

//     const otpRecord = await OTP.findOne({
//         user_id: userId,
//         email,
//         purpose,
//         verified: false,
//     });

//     // OTP record not found
//     if (!otpRecord) {
//         throw new AppError(
//             "OTP not found or already verified. Please request a new OTP.",
//             404
//         );
//     }

//     // OTP expired
//     if (otpRecord.expires_at < new Date()) {
//         await otpRecord.deleteOne();

//         throw new AppError(
//             "OTP has expired. Please request a new one.",
//             400
//         );
//     }

//     // Increment attempts
//     otpRecord.attempts += 1;

//     // Too many attempts
//     if (otpRecord.attempts > 5) {
//         await otpRecord.deleteOne();

//         throw new AppError(
//             "Too many invalid attempts. Please request a new OTP.",
//             429
//         );
//     }

//     // Invalid OTP
//     if (otpRecord.otp !== otp) {
//         await otpRecord.save();

//         throw new AppError(
//             "Invalid OTP. Please try again.",
//             400
//         );
//     }

//     // Mark OTP as verified
//     otpRecord.verified = true;
//     await otpRecord.save();

//     /*
//     |--------------------------------------------------------------------------
//     | Update Profile Verification
//     |--------------------------------------------------------------------------
//     */

//     const profileVerification = await ProfileVerification.findOne({
//         user_id: userId,
//     });

//     if (!profileVerification) {
//         throw new AppError(
//             "Profile verification not found. Please submit profile form first.",
//             404
//         );
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Determine Next Profile Status
//     |--------------------------------------------------------------------------
//     */

//     let nextStatus = "Documents Pending";

//     if (!profileVerification.phone_verified) {
//         nextStatus = "Phone Pending";
//     }

//     if (
//         profileVerification.documents &&
//         profileVerification.documents.length > 0
//     ) {
//         nextStatus = "Under Review";
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Update Profile Verification
//     |--------------------------------------------------------------------------
//     */

//     await ProfileVerification.findOneAndUpdate(
//         { user_id: userId },
//         {
//             $set: {
//                 email_verified: true,
//                 email_otp: null,
//                 email_otp_expiry: null,
//                 profile_status: nextStatus,
//             },
//         }
//     );

//     return {
//         message: "Email verified successfully.",
//         email_verified: true,
//         next_step: profileVerification.phone_verified
//             ? "documents"
//             : "phone",
//     };
// };

// /*
// |--------------------------------------------------------------------------
// | Resend Email OTP
// |--------------------------------------------------------------------------
// */

// export const resendEmailOTP = async (
//     userId,
//     email,
//     purpose = "Email Verification"
// ) => {

//     // Check if email already verified
//     const existingProfile = await ProfileVerification.findOne({
//         user_id: userId,
//     });

//     if (existingProfile && existingProfile.email_verified) {
//         throw new AppError(
//             "Email is already verified.",
//             400
//         );
//     }

//     return await sendEmailOTP(
//         userId,
//         email,
//         purpose
//     );

// };






















// services/otp/emailOtpService.js

import OTP from "../../models/otp/otpModel.js";
import AppError from "../../utils/AppError.js";
import ProfileVerification from "../../models/profile/profileVerificationModel.js";
import sendEmail from "../../utils/email.js";

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
| Send Email OTP
|--------------------------------------------------------------------------
*/

export const sendEmailOTP = async (
    userId,
    email,
    purpose = "Email Verification"
) => {

    // Check if profile exists
    const existingProfile = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!existingProfile) {
        throw new AppError(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    // Check if email already verified
    if (existingProfile.email_verified) {
        throw new AppError(
            "Email is already verified.",
            400
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Delete previous unverified OTPs
    |--------------------------------------------------------------------------
    */

    await OTP.deleteMany({
        user_id: userId,
        email: email.toLowerCase(),
        purpose,
        is_verified: false,
    });

    /*
    |--------------------------------------------------------------------------
    | Generate OTP
    |--------------------------------------------------------------------------
    */

    const otp = generateOTP();

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    /*
    |--------------------------------------------------------------------------
    | Create OTP Record
    |--------------------------------------------------------------------------
    */

    const otpRecord = await OTP.create({
        user_id: userId,
        email: email.toLowerCase(),
        otp,
        purpose,
        expires_at: expiresAt,
        is_verified: false,
        attempts: 0,
        verification_id: existingProfile._id,
    });

    /*
    |--------------------------------------------------------------------------
    | Update Profile Verification
    |--------------------------------------------------------------------------
    */

    await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                email_otp: otp,
                email_otp_expiry: expiresAt,
                profile_status: "Email Pending",
            }
        }
    );

    /*
    |--------------------------------------------------------------------------
    | Send Email
    |--------------------------------------------------------------------------
    */

    await sendEmail({
        email,
        subject: "AIKRISHTA Email Verification OTP",
        message: `Your Email Verification OTP is ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding:20px; max-width:600px; margin:0 auto;">
                <h2 style="color:#333;">AIKRISHTA Email Verification</h2>

                <p>Please use the following OTP to verify your email address:</p>

                <div style="
                    background:#f4f4f4;
                    padding:20px;
                    text-align:center;
                    border-radius:8px;
                    margin:20px 0;
                ">
                    <h1 style="
                        letter-spacing:8px;
                        color:#2c3e50;
                    ">
                        ${otp}
                    </h1>
                </div>

                <p style="color:#666;">
                    This OTP is valid for <b>5 minutes</b>.
                </p>

                <p style="color:#666; font-size:14px;">
                    If you did not request this verification, please ignore this email.
                </p>

                <hr style="border:1px solid #eee; margin:20px 0;">

                <p style="color:#999; font-size:12px;">
                    AIKRISHTA - Your Trusted Matrimony Platform
                </p>
            </div>
        `,
    });

    console.log("\n====================================");
    console.log("📧 EMAIL OTP");
    console.log(`📩 Email   : ${email}`);
    console.log(`🔐 OTP     : ${otp}`);
    console.log(`⏰ Expires : ${expiresAt}`);
    console.log("====================================\n");

    return {
        message: "Email OTP sent successfully.",
        otp: otp,
    };
};

/*
|--------------------------------------------------------------------------
| Verify Email OTP
|--------------------------------------------------------------------------
*/

export const verifyEmailOTP = async (
    userId,
    email,
    otp,
    purpose = "Email Verification"
) => {

    /*
    |--------------------------------------------------------------------------
    | Find OTP
    |--------------------------------------------------------------------------
    */

    const otpRecord = await OTP.findOne({
        user_id: userId,
        email: email.toLowerCase(),
        purpose,
        is_verified: false,
    });

    console.log("🔍 Email OTP verification search:");
    console.log("User ID:", userId);
    console.log("Email:", email);
    console.log("OTP entered:", otp);
    console.log("OTP record:", otpRecord);

    /*
    |--------------------------------------------------------------------------
    | OTP Not Found
    |--------------------------------------------------------------------------
    */

    if (!otpRecord) {
        throw new AppError(
            "OTP not found or already verified. Please request a new OTP.",
            404
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Check Expiry
    |--------------------------------------------------------------------------
    */

    if (otpRecord.expires_at < new Date()) {

        await otpRecord.deleteOne();

        throw new AppError(
            "OTP has expired. Please request a new one.",
            400
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Check Attempts
    |--------------------------------------------------------------------------
    */

    if (otpRecord.attempts >= 5) {

        await otpRecord.deleteOne();

        throw new AppError(
            "Too many invalid attempts. Please request a new OTP.",
            429
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Increment Attempts
    |--------------------------------------------------------------------------
    */

    otpRecord.attempts += 1;

    /*
    |--------------------------------------------------------------------------
    | Check OTP
    |--------------------------------------------------------------------------
    */

    if (otpRecord.otp !== otp) {

        await otpRecord.save();

        const remainingAttempts = 5 - otpRecord.attempts;

        throw new AppError(
            `Invalid OTP. ${remainingAttempts} attempts remaining.`,
            400
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Mark OTP Verified
    |--------------------------------------------------------------------------
    */

    otpRecord.is_verified = true;

    await otpRecord.save();

    /*
    |--------------------------------------------------------------------------
    | Find Profile Verification
    |--------------------------------------------------------------------------
    */

    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Determine Next Status
    |--------------------------------------------------------------------------
    */

    let nextStatus = "Documents Pending";

    if (!profileVerification.phone_verified) {
        nextStatus = "Phone Pending";
    }

    if (
        profileVerification.documents &&
        profileVerification.documents.length > 0
    ) {
        nextStatus = "Under Review";
    }

    /*
    |--------------------------------------------------------------------------
    | Update Profile Verification
    |--------------------------------------------------------------------------
    */

    await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                email_verified: true,
                email_otp: null,
                email_otp_expiry: null,
                profile_status: nextStatus,
            }
        },
        { new: true }
    );

    /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

    return {
        message: "Email verified successfully.",
        email_verified: true,
        next_step: profileVerification.phone_verified
            ? "documents"
            : "phone",
    };
};

/*
|--------------------------------------------------------------------------
| Resend Email OTP
|--------------------------------------------------------------------------
*/

export const resendEmailOTP = async (
    userId,
    email,
    purpose = "Email Verification"
) => {

    const existingProfile = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!existingProfile) {
        throw new AppError(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    if (existingProfile.email_verified) {
        throw new AppError(
            "Email is already verified.",
            400
        );
    }

    return await sendEmailOTP(
        userId,
        email,
        purpose
    );
};