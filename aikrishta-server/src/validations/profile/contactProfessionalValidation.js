import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Contact & Professional Information Validation
|--------------------------------------------------------------------------
*/

export const contactProfessionalValidation = [

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required.")
    .isLength({ max: 100 })
    .withMessage("City must not exceed 100 characters."),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required.")
    .isLength({ max: 100 })
    .withMessage("Country must not exceed 100 characters."),

  body("education_level")
    .trim()
    .notEmpty()
    .withMessage("Education level is required.")
    .isLength({ max: 100 })
    .withMessage("Education level must not exceed 100 characters."),

  body("occupation")
    .trim()
    .notEmpty()
    .withMessage("Occupation is required.")
    .isLength({ max: 100 })
    .withMessage("Occupation must not exceed 100 characters."),

  body("monthly_income")
    .notEmpty()
    .withMessage("Monthly income is required.")
    .isFloat({ min: 0 })
    .withMessage("Monthly income must be greater than or equal to 0."),

  body("additional_details")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Additional details must not exceed 1000 characters."),

];

/*
|--------------------------------------------------------------------------
| Update Contact & Professional Information Validation
|--------------------------------------------------------------------------
*/

export const updateContactProfessionalValidation = [

  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City must not exceed 100 characters."),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country must not exceed 100 characters."),

  body("education_level")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Education level must not exceed 100 characters."),

  body("occupation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Occupation must not exceed 100 characters."),

  body("monthly_income")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Monthly income must be greater than or equal to 0."),

  body("additional_details")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Additional details must not exceed 1000 characters."),

];