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