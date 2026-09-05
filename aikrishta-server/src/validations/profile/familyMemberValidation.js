import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Family Member Validation
|--------------------------------------------------------------------------
*/

export const familyMemberValidation = [

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

  body("relation")
    .trim()
    .notEmpty()
    .withMessage("Relation is required.")
    .isIn([
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ])
    .withMessage(
      "Relation must be Father, Mother, Brother, Sister, Friend or Other Relative."
    ),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number."),

];

/*
|--------------------------------------------------------------------------
| Update Family Member Validation
|--------------------------------------------------------------------------
*/

export const updateFamilyMemberValidation = [

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

  body("relation")
    .optional()
    .trim()
    .isIn([
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ])
    .withMessage(
      "Relation must be Father, Mother, Brother, Sister, Friend or Other Relative."
    ),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number."),

];