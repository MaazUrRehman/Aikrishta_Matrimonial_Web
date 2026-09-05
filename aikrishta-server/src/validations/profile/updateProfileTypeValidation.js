/*
|--------------------------------------------------------------------------
| Update Profile Type Validation
|--------------------------------------------------------------------------
*/

export const updateProfileTypeValidation = [

  body("profile_for")
    .optional()
    .trim()
    .isIn([
      "Myself",
      "Family Member",
    ])
    .withMessage(
      "Profile type must be either 'Myself' or 'Family Member'."
    ),

];