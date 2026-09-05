import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Send Email OTP Validation
|--------------------------------------------------------------------------
*/

export const sendEmailOTPValidation = [

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

];

/*
|--------------------------------------------------------------------------
| Verify Email OTP Validation
|--------------------------------------------------------------------------
*/

export const verifyEmailOTPValidation = [

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

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
| Resend Email OTP Validation
|--------------------------------------------------------------------------
*/

export const resendEmailOTPValidation = [

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

];