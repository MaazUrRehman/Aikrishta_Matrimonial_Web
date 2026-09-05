


// services/profile/profileVerificationService.js
import ProfileVerification from "../../models/profile/profileVerificationModel.js";
import OTP from "../../models/otp/otpModel.js";
import AppError from "../../utils/AppError.js";
import { sendOTP, verifyOTP, validatePhoneNumber } from "../sms/twilioService.js";

/*
|--------------------------------------------------------------------------
| User Services
|--------------------------------------------------------------------------
*/

/**
 * Submit Profile Form
 */
export const submitProfileForm = async (userId, formData) => {
    const { phone, email, name, gender, date_of_birth, religion, city, country } = formData;

    // Validate required fields
    if (!phone || !email) {
        throw new AppError(
            "Phone and email are required.",
            400
        );
    }

    // Check if profile already exists
    let profileVerification = await ProfileVerification.findOne({ user_id: userId });

    if (profileVerification) {
        // Update existing profile
        profileVerification = await ProfileVerification.findOneAndUpdate(
            { user_id: userId },
            {
                $set: {
                    phone,
                    email,
                    profile_status: "Phone Pending",
                }
            },
            { new: true }
        );
    } else {
        // Create new profile verification
        profileVerification = await ProfileVerification.create({
            user_id: userId,
            phone,
            email,
            profile_status: "Phone Pending",
        });
    }

    return {
        verification_id: profileVerification._id,
        next_step: "phone_verification",
        profile_status: profileVerification.profile_status,
    };
};

/**
 * Get Verification Status
 */
export const getVerificationStatus = async (userId) => {
    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    }).lean();

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    // Calculate progress
    const allDocumentsVerified = profileVerification.documents && 
        profileVerification.documents.length > 0 &&
        profileVerification.documents.every(doc => doc.document_verified === true);

    const steps = [
        { 
            name: "Phone", 
            completed: profileVerification.phone_verified,
            status: profileVerification.phone_verified ? "Completed" : "Pending"
        },
        { 
            name: "Email", 
            completed: profileVerification.email_verified,
            status: profileVerification.email_verified ? "Completed" : "Pending"
        },
        { 
            name: "Documents", 
            completed: allDocumentsVerified,
            status: allDocumentsVerified ? "Completed" : 
                    (profileVerification.documents && profileVerification.documents.length > 0 ? "In Progress" : "Pending")
        },
        { 
            name: "Admin Review", 
            completed: profileVerification.profile_status === "Approved" || 
                      profileVerification.profile_status === "Rejected",
            status: profileVerification.profile_status === "Approved" ? "Completed" :
                    profileVerification.profile_status === "Rejected" ? "Rejected" :
                    "Pending"
        },
    ];

    const completedCount = steps.filter(step => step.completed).length;
    const totalSteps = steps.length;

    return {
        verification_id: profileVerification._id,
        user_id: profileVerification.user_id,
        phone: profileVerification.phone,
        phone_verified: profileVerification.phone_verified,
        email: profileVerification.email,
        email_verified: profileVerification.email_verified,
        documents: profileVerification.documents || [],
        profile_status: profileVerification.profile_status,
        progress: {
            percentage: Math.round((completedCount / totalSteps) * 100),
            steps: steps,
            completed: completedCount,
            total: totalSteps,
        },
        createdAt: profileVerification.createdAt,
        updatedAt: profileVerification.updatedAt,
    };
};

/**
 * ✅ Send Phone OTP
 */
export const sendPhoneOTPService = async (userId, phoneNumber) => {
    // Validate phone number format
    const validation = await validatePhoneNumber(phoneNumber);
    if (!validation.valid) {
        throw new AppError('Invalid phone number format. Please use country code like +92.', 400);
    }

    // Check if profile exists
    const profile = await ProfileVerification.findOne({ user_id: userId });
    if (!profile) {
        throw new AppError('Profile not found. Please submit profile form first.', 404);
    }

    // Check if phone already verified
    if (profile.phone_verified) {
        throw new AppError('Phone number already verified.', 400);
    }

    // Check if phone matches the profile phone
    if (profile.phone !== phoneNumber) {
        throw new AppError('Phone number does not match profile phone.', 400);
    }

    // Check for existing valid OTP (prevent spam)
    const existingOTP = await OTP.findOne({
        user_id: userId,
        phone: phoneNumber,
        purpose: 'Phone Verification',
        is_verified: false,
        expires_at: { $gt: new Date() },
        attempts: { $lt: 5 }
    });

    if (existingOTP) {
        throw new AppError('OTP already sent. Please wait for it to expire.', 400);
    }

    // Send OTP via Twilio
    const result = await sendOTP(phoneNumber);

    // Save OTP to database using static method
    await OTP.createOTP({
        user_id: userId,
        phone: phoneNumber,
        otp: result.otp,
        purpose: 'Phone Verification',
        verification_id: profile._id,
    });

    return {
        message: 'OTP sent successfully to your phone.',
        sid: result.sid,
        expires_in: '5 minutes'
    };
};

/**
 * ✅ Verify Phone OTP
 */
export const verifyPhoneOTPService = async (userId, phoneNumber, otpCode) => {
    // Validate phone number
    const validation = await validatePhoneNumber(phoneNumber);
    if (!validation.valid) {
        throw new AppError('Invalid phone number format.', 400);
    }

    // Find valid OTP using static method
    const otpRecord = await OTP.findValidOTP({
        user_id: userId,
        phone: phoneNumber,
        purpose: 'Phone Verification',
    });

    if (!otpRecord) {
        throw new AppError('OTP not found or expired. Please request a new one.', 400);
    }

    // Check if max attempts reached
    if (otpRecord.isMaxAttemptsReached()) {
        throw new AppError('Too many failed attempts. Please request a new OTP.', 400);
    }

    // Verify OTP
    if (otpRecord.otp !== otpCode) {
        await otpRecord.incrementAttempts();
        const remainingAttempts = 5 - otpRecord.attempts;
        throw new AppError(`Invalid OTP. ${remainingAttempts} attempts remaining.`, 400);
    }

    // Mark OTP as verified
    otpRecord.is_verified = true;
    await otpRecord.save();

    // Update profile verification
    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                phone_verified: true,
                profile_status: 'Email Pending'
            }
        },
        { new: true }
    );

    return {
        message: 'Phone verified successfully.',
        phone_verified: true,
        next_step: 'email_verification',
        profile_status: updatedProfile.profile_status
    };
};

/**
 * Upload Document
 */
export const uploadDocument = async (userId, documentData) => {
    const { type, url, public_id } = documentData;

    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found. Please submit profile form first.",
            404
        );
    }

    // Check if profile is already approved
    if (profileVerification.profile_status === "Approved") {
        throw new AppError(
            "Profile is already verified. Cannot upload documents.",
            400
        );
    }

    // Check if profile is rejected
    if (profileVerification.profile_status === "Rejected") {
        throw new AppError(
            "Profile is rejected. Cannot upload documents.",
            400
        );
    }

    // Check if user has already uploaded this document type
    const existingDoc = profileVerification.documents.find(
        doc => doc.type === type
    );

    if (existingDoc) {
        throw new AppError(
            `Document type "${type}" already uploaded. Please delete existing document first.`,
            400
        );
    }

    // Add document
    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $push: {
                documents: {
                    type,
                    url,
                    public_id: public_id || null,
                    document_verified: false,
                }
            },
            $set: {
                profile_status: "Under Review",
            }
        },
        { new: true }
    );

    const newDocument = updatedProfile.documents[updatedProfile.documents.length - 1];

    return {
        document: newDocument,
        next_step: "admin_review",
        profile_status: updatedProfile.profile_status,
    };
};

/**
 * Delete Document
 */
export const deleteDocument = async (userId, documentId) => {
    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found.",
            404
        );
    }

    // Remove document
    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $pull: {
                documents: { _id: documentId }
            }
        },
        { new: true }
    );

    return {
        message: "Document deleted successfully.",
        documents: updatedProfile.documents,
    };
};

/*
|--------------------------------------------------------------------------
| Admin Services
|--------------------------------------------------------------------------
*/

/**
 * Admin: Get All Verifications with Filters
 */
export const adminGetAllVerifications = async (options) => {
    const { page = 1, limit = 10, status, search } = options;

    const filter = {};
    if (status) {
        filter.profile_status = status;
    }

    if (search) {
        filter.$or = [
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }

    const skip = (page - 1) * limit;

    const [verifications, total] = await Promise.all([
        ProfileVerification.find(filter)
            .populate("user_id", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        ProfileVerification.countDocuments(filter),
    ]);

    // Calculate additional stats for each verification
    const verificationsWithStats = verifications.map(verification => ({
        ...verification,
        documents_count: verification.documents ? verification.documents.length : 0,
        documents_verified_count: verification.documents ? 
            verification.documents.filter(doc => doc.document_verified).length : 0,
    }));

    return {
        verifications: verificationsWithStats,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

/**
 * Admin: Get Verification Detail
 */
export const adminGetVerificationDetail = async (userId) => {
    const detail = await ProfileVerification.findOne({
        user_id: userId,
    }).populate("user_id", "name email");

    if (!detail) {
        throw new AppError(
            "Verification not found.",
            404
        );
    }

    // Calculate additional stats
    const documents_count = detail.documents ? detail.documents.length : 0;
    const documents_verified_count = detail.documents ? 
        detail.documents.filter(doc => doc.document_verified).length : 0;

    return {
        ...detail.toObject(),
        documents_count,
        documents_verified_count,
    };
};

/**
 * Admin: Verify Documents
 */
export const adminVerifyDocuments = async (userId, adminId, remarks, verified) => {
    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found.",
            404
        );
    }

    // Check if there are documents to verify
    if (!profileVerification.documents || profileVerification.documents.length === 0) {
        throw new AppError(
            "No documents uploaded to verify.",
            400
        );
    }

    // Update all documents
    const updatedDocuments = profileVerification.documents.map(doc => ({
        ...doc.toObject(),
        document_verified: verified,
        admin_remarks: remarks || doc.admin_remarks,
    }));

    // Determine next status
    let newStatus = profileVerification.profile_status;
    let nextStep = "complete";
    
    if (!verified) {
        newStatus = "Rejected";
        nextStep = "complete";
    } else {
        // Check if phone and email are verified
        if (profileVerification.phone_verified && profileVerification.email_verified) {
            newStatus = "Fraud Check";
            nextStep = "fraud_detection";
        } else {
            newStatus = "Under Review";
            nextStep = "complete";
        }
    }

    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                documents: updatedDocuments,
                profile_status: newStatus,
            }
        },
        { new: true }
    );

    return {
        message: verified ? "Documents verified successfully." : "Documents rejected.",
        profile_status: updatedProfile.profile_status,
        verified: verified,
        next_step: nextStep,
    };
};

/**
 * Admin: Perform Fraud Detection
 */
export const adminPerformFraudDetection = async (userId, fraudScore, fraudResult) => {
    const profileVerification = await ProfileVerification.findOne({
        user_id: userId,
    });

    if (!profileVerification) {
        throw new AppError(
            "Profile verification not found.",
            404
        );
    }

    // Check if documents are verified
    const allDocumentsVerified = profileVerification.documents && 
        profileVerification.documents.length > 0 &&
        profileVerification.documents.every(doc => doc.document_verified === true);

    if (!allDocumentsVerified) {
        throw new AppError(
            "All documents must be verified before fraud detection.",
            400
        );
    }

    // Fraud detection logic
    const isFraudDetected = fraudScore && fraudScore > 50;

    let newStatus = profileVerification.profile_status;

    if (isFraudDetected) {
        newStatus = "Rejected";
    } else {
        // Check if phone and email are verified
        if (
            profileVerification.phone_verified &&
            profileVerification.email_verified &&
            allDocumentsVerified
        ) {
            newStatus = "Approved";
        } else {
            newStatus = "Under Review";
        }
    }

    // Update profile
    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                profile_status: newStatus,
                // Store fraud info if needed
                // fraud_score: fraudScore,
                // fraud_result: fraudResult,
            }
        },
        { new: true }
    );

    return {
        message: isFraudDetected 
            ? "Fraud detected. Profile rejected." 
            : "Fraud detection completed.",
        status: newStatus,
        fraud_score: fraudScore,
        profile_status: newStatus,
    };
};

/**
 * Admin: Get Statistics
 */
export const adminGetStatistics = async () => {
    const [total, pending, approved, rejected, underReview, fraudCheck] = await Promise.all([
        ProfileVerification.countDocuments(),
        ProfileVerification.countDocuments({ profile_status: "Pending" }),
        ProfileVerification.countDocuments({ profile_status: "Approved" }),
        ProfileVerification.countDocuments({ profile_status: "Rejected" }),
        ProfileVerification.countDocuments({ profile_status: "Under Review" }),
        ProfileVerification.countDocuments({ profile_status: "Fraud Check" }),
    ]);

    return {
        total,
        pending,
        approved,
        rejected,
        underReview,
        fraudCheck,
        verificationRate: total > 0 ? Math.round((approved / total) * 100) : 0,
    };
};

/**
 * Admin: Update Profile Status
 */
export const adminUpdateProfileStatus = async (userId, status, remarks) => {
    const validStatuses = ["Pending", "Phone Pending", "Email Pending", "Documents Pending", "Under Review", "Fraud Check", "Approved", "Rejected"];
    
    if (!validStatuses.includes(status)) {
        throw new AppError(
            `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            400
        );
    }

    const updatedProfile = await ProfileVerification.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                profile_status: status,
                admin_remarks: remarks || undefined,
            }
        },
        { new: true }
    );

    if (!updatedProfile) {
        throw new AppError(
            "Profile verification not found.",
            404
        );
    }

    return {
        message: "Profile status updated successfully.",
        profile_status: updatedProfile.profile_status,
    };
};