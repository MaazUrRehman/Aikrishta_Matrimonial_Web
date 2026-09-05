// validations/profile/updateProfileVerificationValidation.js
import { body, param, query } from "express-validator";

/*
|--------------------------------------------------------------------------
| Admin: Verify Documents Validation (Step 5)
|--------------------------------------------------------------------------
*/

export const adminVerifyDocumentsValidation = [

  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid user ID."),

  body("verified")
    .notEmpty()
    .withMessage("Verification status is required.")
    .isBoolean()
    .withMessage("Verification must be either true or false."),

  body("remarks")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Admin remarks must not exceed 500 characters.")
    .escape(),

];

/*
|--------------------------------------------------------------------------
| Admin: Fraud Detection Validation (Step 6)
|--------------------------------------------------------------------------
*/

export const adminFraudDetectionValidation = [

  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid user ID."),

  body("fraud_score")
    .notEmpty()
    .withMessage("Fraud score is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("Fraud score must be between 0 and 100."),

  body("fraud_detection_result")
    .optional()
    .isObject()
    .withMessage("Fraud detection result must be an object."),

];

/*
|--------------------------------------------------------------------------
| Admin: Update Profile Status Validation
|--------------------------------------------------------------------------
*/

export const adminUpdateProfileStatusValidation = [

  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid user ID."),

  body("profile_status")
    .trim()
    .notEmpty()
    .withMessage("Profile status is required.")
    .isIn([
      "Pending",
      "Phone Pending",
      "Email Pending",
      "Documents Pending",
      "Under Review",
      "Fraud Check",
      "Approved",
      "Rejected"
    ])
    .withMessage("Invalid profile status."),

  body("remarks")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Remarks must not exceed 500 characters.")
    .escape(),

];

/*
|--------------------------------------------------------------------------
| Admin: Get All Verifications Validation
|--------------------------------------------------------------------------
*/

export const adminGetAllVerificationsValidation = [

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer.")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100.")
    .toInt(),

  query("status")
    .optional()
    .trim()
    .isIn([
      "Pending",
      "Phone Pending",
      "Email Pending",
      "Documents Pending",
      "Under Review",
      "Fraud Check",
      "Approved",
      "Rejected"
    ])
    .withMessage("Invalid status value."),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Search term must be at least 2 characters.")
    .escape(),

];

/*
|--------------------------------------------------------------------------
| Admin: Get Verification Detail Validation
|--------------------------------------------------------------------------
*/

export const adminGetVerificationDetailValidation = [

  param("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid user ID."),

];

/*
|--------------------------------------------------------------------------
| Admin: Get Fraud Result Validation
|--------------------------------------------------------------------------
*/

export const adminGetFraudResultValidation = [

  param("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid user ID."),

];

