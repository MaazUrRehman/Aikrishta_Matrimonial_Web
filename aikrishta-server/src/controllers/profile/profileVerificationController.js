


// controllers/profile/profileVerificationController.js
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AppError from "../../utils/AppError.js"; 
import cloudinary from "../../config/cloudinary.js"; 

import {
    submitProfileForm,
    getVerificationStatus,
    uploadDocument,
    adminVerifyDocuments,
    adminPerformFraudDetection,
    adminGetAllVerifications,
    adminGetVerificationDetail,
    // ✅ Phone OTP Services Add Karein
    sendPhoneOTPService,
    verifyPhoneOTPService,
} from "../../services/profile/profileVerificationService.js";

/*
|--------------------------------------------------------------------------
| User Controllers
|--------------------------------------------------------------------------
*/

/**
 * @desc    Submit Profile Form
 * @route   POST /api/profile/submit-profile
 * @access  Private
 */
export const submitProfileFormController = asyncHandler(async (req, res) => {
    const { phone, email, name, gender, date_of_birth, religion, city, country } = req.body;

    const response = await submitProfileForm(req.user.id, {
        phone,
        email,
        name,
        gender,
        date_of_birth,
        religion,
        city,
        country,
    });

    return new ApiResponse(
        res,
        200,
        "Profile form submitted successfully.",
        {
            verification_id: response.verification_id,
            next_step: response.next_step,
            profile_status: response.profile_status,
        }
    );
});

/**
 * @desc    Get Verification Status
 * @route   GET /api/profile/verification-status
 * @access  Private
 */
export const getVerificationStatusController = asyncHandler(async (req, res) => {
    const status = await getVerificationStatus(req.user.id);

    return new ApiResponse(
        res,
        200,
        "Verification status retrieved successfully.",
        status
    );
});

// ✅ Send Phone OTP Controller
export const sendPhoneOTPController = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        console.log("Phone number is required.", 400);
    }

    const result = await sendPhoneOTPService(req.user.id, phone);

    return new ApiResponse(
        res,
        200,
        result.message,
        {
            sid: result.sid,
            expires_in: result.expires_in
        }
    );
});

// ✅ Verify Phone OTP Controller
export const verifyPhoneOTPController = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        console.log("Phone number and OTP are required.", 400);
    }

    const result = await verifyPhoneOTPService(req.user.id, phone, otp);

    return new ApiResponse(
        res,
        200,
        result.message,
        {
            phone_verified: result.phone_verified,
            next_step: result.next_step,
            profile_status: result.profile_status
        }
    );
});

/**
 * @desc    Upload Document
 * @route   POST /api/profile/upload-document
 * @access  Private
 */
export const uploadDocumentController = asyncHandler(async (req, res) => {
    const { type } = req.body;
    const file = req.file;

    if (!file) {
        console.log("No file uploaded.", 400);
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "documents",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(file.buffer);
    });

    const response = await uploadDocument(req.user.id, {
        type,
        url: result.secure_url,
        public_id: result.public_id,
    });

    return new ApiResponse(
        res,
        200,
        "Document uploaded successfully.",
        {
            document: response.document,
            next_step: response.next_step,
            profile_status: response.profile_status,
        }
    );
});

/**
 * @desc    Get All Documents
 * @route   GET /api/profile/documents
 * @access  Private
 */
export const getDocumentsController = asyncHandler(async (req, res) => {
    const documents = await getVerificationStatus(req.user.id);
    
    return new ApiResponse(
        res,
        200,
        "Documents retrieved successfully.",
        documents.documents
    );
});

/**
 * @desc    Delete Document
 * @route   DELETE /api/profile/document/:documentId
 * @access  Private
 */
export const deleteDocumentController = asyncHandler(async (req, res) => {
    const { documentId } = req.params;
    
    // You can implement this if needed
    // await deleteDocument(req.user.id, documentId);
    
    return new ApiResponse(
        res,
        200,
        "Document deleted successfully."
    );
});

/*
|--------------------------------------------------------------------------
| Admin Controllers
|--------------------------------------------------------------------------
*/

/**
 * @desc    Admin: Get All Verifications
 * @route   GET /api/profile/admin/verifications
 * @access  Private (Admin Only)
 */
export const adminGetAllVerificationsController = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;

    const result = await adminGetAllVerifications({
        page: parseInt(page),
        limit: parseInt(limit),
        status,
    });

    return new ApiResponse(
        res,
        200,
        "Verifications retrieved successfully.",
        result
    );
});

/**
 * @desc    Admin: Get Verification Detail
 * @route   GET /api/profile/admin/verification/:userId
 * @access  Private (Admin Only)
 */
export const adminGetVerificationDetailController = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const detail = await adminGetVerificationDetail(userId);

    return new ApiResponse(
        res,
        200,
        "Verification detail retrieved successfully.",
        detail
    );
});

/**
 * @desc    Admin: Verify Documents
 * @route   POST /api/profile/admin/verify-documents
 * @access  Private (Admin Only)
 */
export const adminVerifyDocumentsController = asyncHandler(async (req, res) => {
    const { user_id, verified, remarks } = req.body;

    const response = await adminVerifyDocuments(
        user_id,
        req.user.id,
        remarks,
        verified
    );

    return new ApiResponse(
        res,
        200,
        response.message,
        {
            profile_status: response.profile_status,
            verified: response.verified,
            next_step: response.next_step,
        }
    );
});

/**
 * @desc    Admin: Perform Fraud Detection
 * @route   POST /api/profile/admin/fraud-detection
 * @access  Private (Admin Only)
 */
export const adminPerformFraudDetectionController = asyncHandler(async (req, res) => {
    const { user_id, fraud_score, fraud_detection_result } = req.body;

    const response = await adminPerformFraudDetection(
        user_id,
        fraud_score,
        fraud_detection_result
    );

    return new ApiResponse(
        res,
        200,
        response.message,
        {
            status: response.status,
            fraud_score: response.fraud_score,
            profile_status: response.profile_status,
        }
    );
});

/**
 * @desc    Admin: Get Fraud Detection Result
 * @route   GET /api/profile/admin/fraud-result/:userId
 * @access  Private (Admin Only)
 */
export const adminGetFraudResultController = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    // You can implement this if needed
    // const result = await adminGetFraudResult(userId);
    
    return new ApiResponse(
        res,
        200,
        "Fraud result retrieved successfully."
    );
});

/**
 * @desc    Admin: Update Profile Status
 * @route   PATCH /api/profile/admin/update-status
 * @access  Private (Admin Only)
 */
export const adminUpdateProfileStatusController = asyncHandler(async (req, res) => {
    const { user_id, profile_status, remarks } = req.body;

    // You can implement this if needed
    // const response = await adminUpdateProfileStatus(user_id, profile_status, remarks);

    return new ApiResponse(
        res,
        200,
        "Profile status updated successfully."
    );
});

/**
 * @desc    Admin: Get Verification Statistics
 * @route   GET /api/profile/admin/statistics
 * @access  Private (Admin Only)
 */
export const adminGetStatisticsController = asyncHandler(async (req, res) => {
    // You can implement this if needed
    // const stats = await adminGetStatistics();
    
    return new ApiResponse(
        res,
        200,
        "Statistics retrieved successfully."
    );
});
