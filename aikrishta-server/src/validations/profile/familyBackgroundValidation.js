import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Family Background Validation
|--------------------------------------------------------------------------
*/

export const familyBackgroundValidation = [

  body("father_name")
    .trim()
    .notEmpty()
    .withMessage("Father name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Father name must be between 2 and 100 characters."),

  body("mother_name")
    .trim()
    .notEmpty()
    .withMessage("Mother name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Mother name must be between 2 and 100 characters."),

  body("father_profession")
    .trim()
    .notEmpty()
    .withMessage("Father profession is required.")
    .isLength({ max: 100 })
    .withMessage("Father profession must not exceed 100 characters."),

  body("mother_profession")
    .trim()
    .notEmpty()
    .withMessage("Mother profession is required.")
    .isLength({ max: 100 })
    .withMessage("Mother profession must not exceed 100 characters."),

  body("brothers_count")
    .notEmpty()
    .withMessage("Brothers count is required.")
    .isInt({ min: 0 })
    .withMessage("Brothers count must be 0 or greater."),

  body("brothers_married")
    .notEmpty()
    .withMessage("Married brothers count is required.")
    .isInt({ min: 0 })
    .withMessage("Married brothers count must be 0 or greater.")
    .custom((value, { req }) => {
      if (Number(value) > Number(req.body.brothers_count)) {
        console.log("Married brothers cannot exceed total brothers.");
      }
      return true;
    }),

  body("sisters_count")
    .notEmpty()
    .withMessage("Sisters count is required.")
    .isInt({ min: 0 })
    .withMessage("Sisters count must be 0 or greater."),

  body("sisters_married")
    .notEmpty()
    .withMessage("Married sisters count is required.")
    .isInt({ min: 0 })
    .withMessage("Married sisters count must be 0 or greater.")
    .custom((value, { req }) => {
      if (Number(value) > Number(req.body.sisters_count)) {
        console.log("Married sisters cannot exceed total sisters.");
      }
      return true;
    }),

  body("social_status")
    .trim()
    .notEmpty()
    .withMessage("Social status is required.")
    .isLength({ max: 100 })
    .withMessage("Social status must not exceed 100 characters."),

  body("family_residence")
    .trim()
    .notEmpty()
    .withMessage("Family residence is required.")
    .isLength({ max: 255 })
    .withMessage("Family residence must not exceed 255 characters."),

  body("financial_status")
    .trim()
    .notEmpty()
    .withMessage("Financial status is required.")
    .isLength({ max: 100 })
    .withMessage("Financial status must not exceed 100 characters."),

];

/*
|--------------------------------------------------------------------------
| Update Family Background Validation
|--------------------------------------------------------------------------
*/

export const updateFamilyBackgroundValidation = [

  body("father_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Father name must be between 2 and 100 characters."),

  body("mother_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Mother name must be between 2 and 100 characters."),

  body("father_profession")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Father profession must not exceed 100 characters."),

  body("mother_profession")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Mother profession must not exceed 100 characters."),

  body("brothers_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Brothers count must be 0 or greater."),

  body("brothers_married")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Married brothers count must be 0 or greater.")
    .custom((value, { req }) => {

      if (
        req.body.brothers_count !== undefined &&
        Number(value) > Number(req.body.brothers_count)
      ) {
        console.log("Married brothers cannot exceed total brothers.");
      }

      return true;
    }),

  body("sisters_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sisters count must be 0 or greater."),

  body("sisters_married")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Married sisters count must be 0 or greater.")
    .custom((value, { req }) => {

      if (
        req.body.sisters_count !== undefined &&
        Number(value) > Number(req.body.sisters_count)
      ) {
        console.log("Married sisters cannot exceed total sisters.");
      }

      return true;
    }),

  body("social_status")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Social status must not exceed 100 characters."),

  body("family_residence")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Family residence must not exceed 255 characters."),

  body("financial_status")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Financial status must not exceed 100 characters."),

];
