/*
|--------------------------------------------------------------------------
| Update Partner Preference Validation
|--------------------------------------------------------------------------
*/

export const updatePartnerPreferenceValidation = [

  body("preferred_age_min")
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage("Minimum preferred age must be between 18 and 100 years."),

  body("preferred_age_max")
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage("Maximum preferred age must be between 18 and 100 years."),

  body("preferred_education")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred education must not exceed 100 characters."),

  body("preferred_profession")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred profession must not exceed 100 characters."),

  body("preferred_caste")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred caste must not exceed 100 characters."),

  body("preferred_marital_status")
    .optional()
    .trim()
    .isIn([
      "Never Married",
      "Divorced",
      "Widowed",
      "Separated",
    ])
    .withMessage("Please select a valid preferred marital status."),

  body("preferred_city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred city must not exceed 100 characters."),

  body("preferred_country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred country must not exceed 100 characters."),

  body("preferred_age_max")
    .optional()
    .custom((value, { req }) => {

      if (
        req.body.preferred_age_min !== undefined &&
        Number(value) < Number(req.body.preferred_age_min)
      ) {
        console.log(
          "Maximum preferred age must be greater than or equal to minimum preferred age."
        );
      }

      return true;

    }),

];
