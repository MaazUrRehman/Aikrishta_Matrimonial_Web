import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Profile Type Validation
|--------------------------------------------------------------------------
*/

export const profileTypeValidation = [

  body("profile_for")
    .trim()
    .notEmpty()
    .withMessage("Profile type is required.")
    .isIn(["Myself", "Family Member"])
    .withMessage("Profile type must be either 'Myself' or 'Family Member'."),

];

/*
|--------------------------------------------------------------------------
| Update Profile Type Validation
|--------------------------------------------------------------------------
*/

export const updateProfileTypeValidation = [

  body("profile_for")
    .optional()
    .trim()
    .isIn(["Myself", "Family Member"])
    .withMessage("Profile type must be either 'Myself' or 'Family Member'."),

];