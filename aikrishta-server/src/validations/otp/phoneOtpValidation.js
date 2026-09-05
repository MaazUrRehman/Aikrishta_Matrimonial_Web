import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Send Phone OTP Validation
|--------------------------------------------------------------------------
*/

export const sendPhoneOTPValidation = [

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number."),

];

/*
|--------------------------------------------------------------------------
| Verify Phone OTP Validation
|--------------------------------------------------------------------------
*/

export const verifyPhoneOTPValidation = [

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number."),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required.")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be exactly 6 digits.")
    .isNumeric()
    .withMessage("OTP must contain only numbers."),

];

/*
|--------------------------------------------------------------------------
| Resend Phone OTP Validation
|--------------------------------------------------------------------------
*/

export const resendPhoneOTPValidation = [

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number."),

];