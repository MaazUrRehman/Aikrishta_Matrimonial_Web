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

      const totalBrothers =
        req.body.brothers_count !== undefined
          ? Number(req.body.brothers_count)
          : Number(value);

      if (Number(value) > totalBrothers) {
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

      const totalSisters =
        req.body.sisters_count !== undefined
          ? Number(req.body.sisters_count)
          : Number(value);

      if (Number(value) > totalSisters) {
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
