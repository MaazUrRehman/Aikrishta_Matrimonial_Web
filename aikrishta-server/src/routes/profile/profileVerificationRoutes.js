// // routes/profile/profileVerificationRoutes.js
// import express from "express";
// const router = express.Router();

// import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
// import validate from "../../middlewares/validate.js";
// import { uploadDocument } from "../../middlewares/upload.js"; 

// import {
//     submitProfileFormController,
//     getVerificationStatusController,
//     uploadDocumentController,
//     deleteDocumentController,
//     adminGetAllVerificationsController,
//     adminGetVerificationDetailController,
//     adminVerifyDocumentsController,
//     adminPerformFraudDetectionController,
//     adminUpdateProfileStatusController,
//     adminGetStatisticsController,
//     adminGetFraudResultController,
// } from "../../controllers/profile/profileVerificationController.js";

// import {
//     submitProfileFormValidation,
//     uploadDocumentValidation,
//     deleteDocumentValidation,
// } from "../../validations/profile/profileVerificationValidation.js";

// import {
//     adminVerifyDocumentsValidation,
//     adminFraudDetectionValidation,
//     adminUpdateProfileStatusValidation,
//     adminGetAllVerificationsValidation,
//     adminGetVerificationDetailValidation,
//     adminGetFraudResultValidation,
// } from "../../validations/profile/updateProfileVerificationValidation.js";

// /*
// |--------------------------------------------------------------------------
// | User Routes (Protected)
// |--------------------------------------------------------------------------
// */

// // Step 1: Submit Profile Form
// router.post(
//     "/submit-profile",
//     protect,
//     submitProfileFormValidation,
//     validate,
//     submitProfileFormController
// );

// // Get Verification Status
// router.get(
//     "/verification-status",
//     protect,
//     getVerificationStatusController
// );

// // Step 4: Upload Documents
// router.post(
//     "/upload-document",
//     protect,
//     uploadDocument, 
//     uploadDocumentValidation,
//     validate,
//     uploadDocumentController
// );

// // Delete Document
// router.delete(
//     "/document/:documentId",
//     protect,
//     deleteDocumentValidation,
//     validate,
//     deleteDocumentController
// );

// /*
// |--------------------------------------------------------------------------
// | Admin Routes (Protected + Admin Only)
// |--------------------------------------------------------------------------
// */

// // Step 5: Admin Verify Documents
// router.post(
//     "/admin/verify-documents",
//     protect,
//     isAdmin,
//     adminVerifyDocumentsValidation,
//     validate,
//     adminVerifyDocumentsController
// );

// // Step 6: Admin Perform Fraud Detection
// router.post(
//     "/admin/fraud-detection",
//     protect,
//     isAdmin,
//     adminFraudDetectionValidation,
//     validate,
//     adminPerformFraudDetectionController
// );

// // Admin Update Profile Status
// router.patch(
//     "/admin/update-status",
//     protect,
//     isAdmin,
//     adminUpdateProfileStatusValidation,
//     validate,
//     adminUpdateProfileStatusController
// );

// // Admin Get All Verifications
// router.get(
//     "/admin/verifications",
//     protect,
//     isAdmin,
//     adminGetAllVerificationsValidation,
//     validate,
//     adminGetAllVerificationsController
// );

// // Admin Get Verification Detail
// router.get(
//     "/admin/verification/:userId",
//     protect,
//     isAdmin,
//     adminGetVerificationDetailValidation,
//     validate,
//     adminGetVerificationDetailController
// );

// // Admin Get Fraud Result
// router.get(
//     "/admin/fraud-result/:userId",
//     protect,
//     isAdmin,
//     adminGetFraudResultValidation,
//     validate,
//     adminGetFraudResultController
// );

// // Admin Get Statistics
// router.get(
//     "/admin/statistics",
//     protect,
//     isAdmin,
//     adminGetStatisticsController
// );

// export default router;
















// routes/profile/profileVerificationRoutes.js
import express from "express";
const router = express.Router();

import { protect, isAdmin } from "../../middlewares/authMiddleware.js";
import validate from "../../middlewares/validate.js";
import { uploadDocument } from "../../middlewares/upload.js"; 

import {
    submitProfileFormController,
    getVerificationStatusController,
    uploadDocumentController,
    deleteDocumentController,
    adminGetAllVerificationsController,
    adminGetVerificationDetailController,
    adminVerifyDocumentsController,
    adminPerformFraudDetectionController,
    adminUpdateProfileStatusController,
    adminGetStatisticsController,
    adminGetFraudResultController,
    // ✅ Phone OTP Controllers Add Karein
    sendPhoneOTPController,
    verifyPhoneOTPController,
} from "../../controllers/profile/profileVerificationController.js";

import {
    submitProfileFormValidation,
    uploadDocumentValidation,
    deleteDocumentValidation,
    // ✅ Phone OTP Validations
    sendPhoneOTPValidation,
    verifyPhoneOTPValidation,
} from "../../validations/profile/profileVerificationValidation.js";

import {
    adminVerifyDocumentsValidation,
    adminFraudDetectionValidation,
    adminUpdateProfileStatusValidation,
    adminGetAllVerificationsValidation,
    adminGetVerificationDetailValidation,
    adminGetFraudResultValidation,
} from "../../validations/profile/updateProfileVerificationValidation.js";

/*
|--------------------------------------------------------------------------
| User Routes (Protected)
|--------------------------------------------------------------------------
*/

// Step 1: Submit Profile Form
router.post(
    "/submit-profile",
    protect,
    submitProfileFormValidation,
    validate,
    submitProfileFormController
);

// Get Verification Status
router.get(
    "/verification-status",
    protect,
    getVerificationStatusController
);

// ✅ Step 2: Send Phone OTP
router.post(
    "/send-phone-otp",
    protect,
    sendPhoneOTPValidation,
    validate,
    sendPhoneOTPController
);

// ✅ Step 3: Verify Phone OTP
router.post(
    "/verify-phone-otp",
    protect,
    verifyPhoneOTPValidation,
    validate,
    verifyPhoneOTPController
);

// Step 4: Upload Documents
router.post(
    "/upload-document",
    protect,
    uploadDocument, 
    uploadDocumentValidation,
    validate,
    uploadDocumentController
);

// Delete Document
router.delete(
    "/document/:documentId",
    protect,
    deleteDocumentValidation,
    validate,
    deleteDocumentController
);

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected + Admin Only)
|--------------------------------------------------------------------------
*/

// Step 5: Admin Verify Documents
router.post(
    "/admin/verify-documents",
    protect,
    isAdmin,
    adminVerifyDocumentsValidation,
    validate,
    adminVerifyDocumentsController
);

// Step 6: Admin Perform Fraud Detection
router.post(
    "/admin/fraud-detection",
    protect,
    isAdmin,
    adminFraudDetectionValidation,
    validate,
    adminPerformFraudDetectionController
);

// Admin Update Profile Status
router.patch(
    "/admin/update-status",
    protect,
    isAdmin,
    adminUpdateProfileStatusValidation,
    validate,
    adminUpdateProfileStatusController
);

// Admin Get All Verifications
router.get(
    "/admin/verifications",
    protect,
    isAdmin,
    adminGetAllVerificationsValidation,
    validate,
    adminGetAllVerificationsController
);

// Admin Get Verification Detail
router.get(
    "/admin/verification/:userId",
    protect,
    isAdmin,
    adminGetVerificationDetailValidation,
    validate,
    adminGetVerificationDetailController
);

// Admin Get Fraud Result
router.get(
    "/admin/fraud-result/:userId",
    protect,
    isAdmin,
    adminGetFraudResultValidation,
    validate,
    adminGetFraudResultController
);

// Admin Get Statistics
router.get(
    "/admin/statistics",
    protect,
    isAdmin,
    adminGetStatisticsController
);

export default router;