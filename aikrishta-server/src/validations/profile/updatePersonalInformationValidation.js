

/*
|--------------------------------------------------------------------------
| Update Personal Information Validation
|--------------------------------------------------------------------------
*/

export const updatePersonalInformationValidation = [

  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters."),

  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters."),

  body("age")
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100 years."),

  body("date_of_birth")
    .optional()
    .isISO8601()
    .withMessage("Please enter a valid date of birth.")
    .toDate(),

  body("gender")
    .optional()
    .trim()
    .isIn([
      "Male",
      "Female",
    ])
    .withMessage(
      "Gender must be either 'Male' or 'Female'."
    ),

  body("religion")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Religion must not exceed 50 characters."),

  body("caste")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Caste must not exceed 100 characters."),

  body("mother_tongue")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Mother tongue must not exceed 50 characters."),

  body("marital_status")
    .optional()
    .trim()
    .isIn([
      "Never Married",
      "Divorced",
      "Widowed",
      "Separated",
    ])
    .withMessage("Please select a valid marital status."),

  body("height")
    .optional()
    .isFloat({ min: 2, max: 8 })
    .withMessage("Height must be between 2 and 8 feet."),

  body("weight")
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage("Weight must be between 20 and 300 kg."),

  body("profile_picture")
    .optional()
    .trim(),

  body("profile_status")
    .optional()
    .isIn([
      "Active",
      "Inactive",
    ])
    .withMessage(
      "Profile status must be either 'Active' or 'Inactive'."
    ),

];