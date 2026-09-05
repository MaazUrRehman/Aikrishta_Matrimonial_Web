












import { body, param } from "express-validator";

/*
|--------------------------------------------------------------------------
| Submit Profile Form Validation (Step 1)
|--------------------------------------------------------------------------
*/

export const submitProfileFormValidation = [

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Please enter a valid phone number with country code (e.g., +923001234567)."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters."),

  body("gender")
    .optional()
    .trim()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other."),

  body("date_of_birth")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Please enter a valid date of birth.")
    .custom((value) => {
      const age = Math.floor((new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 18) {
        console.log("You must be at least 18 years old.");
      }
      return true;
    }),

  body("religion")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Religion cannot exceed 50 characters."),

  body("city")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("City cannot exceed 50 characters."),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Country cannot exceed 50 characters."),

];

/*
|--------------------------------------------------------------------------
| Upload Document Validation (Step 4) - ✅ UPDATED (URL removed)
|--------------------------------------------------------------------------
*/

export const uploadDocumentValidation = [

  body("type")
    .trim()
    .notEmpty()
    .withMessage("Document type is required.")
    .isIn([
      "Profile Image",
      "ID Card Front",
      "ID Card Back",
      "Passport",
      "Driving License",
      "Other"
    ])
    .withMessage("Invalid document type. Must be one of: Profile Image, ID Card Front, ID Card Back, Passport, Driving License, Other."),

  // ✅ URL validation commented out - ab file upload hai, URL nahi
  // body("url")
  //   .trim()
  //   .notEmpty()
  //   .withMessage("Document URL is required.")
  //   .isURL()
  //   .withMessage("Please enter a valid URL."),

  body("public_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Public ID cannot be empty.")
    .isLength({ max: 255 })
    .withMessage("Public ID cannot exceed 255 characters."),

];

/*
|--------------------------------------------------------------------------
| Delete Document Validation (User)
|--------------------------------------------------------------------------
*/

export const deleteDocumentValidation = [

  param("documentId")
    .trim()
    .notEmpty()
    .withMessage("Document ID is required.")
    .isMongoId()
    .withMessage("Please enter a valid document ID."),

];

export const sendPhoneOTPValidation = (req, res, next) => {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({ 
            success: false, 
            message: "Phone number is required." 
        });
    }
    
    // Basic phone validation (with country code)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid phone number format. Use country code like +92XXXXXXXXXX." 
        });
    }
    
    next();
};

// ✅ Verify Phone OTP Validation
export const verifyPhoneOTPValidation = (req, res, next) => {
    const { phone, otp } = req.body;
    
    if (!phone) {
        return res.status(400).json({ 
            success: false, 
            message: "Phone number is required." 
        });
    }
    
    if (!otp) {
        return res.status(400).json({ 
            success: false, 
            message: "OTP is required." 
        });
    }
    
    if (!/^\d{6}$/.test(otp)) {
        return res.status(400).json({ 
            success: false, 
            message: "OTP must be exactly 6 digits." 
        });
    }
    
    next();
};
