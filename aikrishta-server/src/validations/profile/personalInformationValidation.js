import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Personal Information Validation
|--------------------------------------------------------------------------
*/

export const personalInformationValidation = [

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters."),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters."),

  body("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100 years."),

  body("date_of_birth")
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isISO8601()
    .withMessage("Please enter a valid date of birth.")
    .toDate(),

  body("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either 'Male' or 'Female'."),

  body("religion")
    .trim()
    .notEmpty()
    .withMessage("Religion is required.")
    .isLength({ max: 50 })
    .withMessage("Religion must not exceed 50 characters."),

  body("caste")
    .trim()
    .notEmpty()
    .withMessage("Caste is required.")
    .isLength({ max: 100 })
    .withMessage("Caste must not exceed 100 characters."),

  body("mother_tongue")
    .trim()
    .notEmpty()
    .withMessage("Mother tongue is required.")
    .isLength({ max: 50 })
    .withMessage("Mother tongue must not exceed 50 characters."),

  body("marital_status")
    .trim()
    .notEmpty()
    .withMessage("Marital status is required.")
    .isIn([
      "Never Married",
      "Divorced",
      "Widowed",
      "Separated",
    ])
    .withMessage("Please select a valid marital status."),

  body("height")
    .notEmpty()
    .withMessage("Height is required.")
    .isFloat({ min: 2, max: 8 })
    .withMessage("Height must be between 2 and 8 feet."),

  body("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .isFloat({ min: 20, max: 300 })
    .withMessage("Weight must be between 20 and 300 kg."),

  body("profile_status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Profile status must be either 'Active' or 'Inactive'."),

];

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
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either 'Male' or 'Female'."),

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

  body("profile_status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Profile status must be either 'Active' or 'Inactive'."),

];