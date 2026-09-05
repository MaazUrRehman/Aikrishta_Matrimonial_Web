// models/profile/profileVerificationModel.js
import mongoose from "mongoose";

const profileVerificationSchema = new mongoose.Schema(
  {
    // User Reference
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
      index: true,
    },

    // Phone Verification Fields
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required."],
    },
    phone_otp: {
      type: String,
      trim: true,
    },
    phone_verified: {
      type: Boolean,
      default: false,
    },
    phone_otp_expiry: {
      type: Date,
    },

    // Email Verification Fields
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required."],
    },
    email_otp: {
      type: String,
      trim: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    email_otp_expiry: {
      type: Date,
    },

    // Documents Fields
    documents: [
      {
        type: {
          type: String,
          enum: [
            "Profile Image",
            "ID Card Front",
            "ID Card Back",
            "Passport",
            "Driving License",
            "Other",
          ],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        document_verified: {
          type: Boolean,
          default: false,
        },
        admin_remarks: {
          type: String,
          trim: true,
        },
      },
    ],



    // ✅ Fraud Detection
    fraud_detection: {
      analyzed: {
        type: Boolean,
        default: false,
      },

      overall_risk: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: null,
      },

      confidence: {
        type: Number,
        default: null,
      },

      edited: {
        type: String,
        default: null,
      },

      tampering: {
        type: String,
        default: null,
      },

      blur: {
        type: String,
        default: null,
      },

      ocr_issues: {
        type: String,
        default: null,
      },

      remarks: {
        type: String,
        trim: true,
        default: null,
      },

      raw_response: {
        type: String,
        default: null,
      },

      analyzed_at: {
        type: Date,
        default: null,
      },
    },



    // Profile Status
    profile_status: {
      type: String,
      enum: [
        "Pending",           // Initial state
        "Phone Pending",     // Phone not verified
        "Email Pending",     // Email not verified
        "Documents Pending", // Documents not uploaded/verified
        "Under Review",      // Admin review
        "Fraud Check",       // Fraud detection in progress
        "Approved",          // Fully verified and approved
        "Rejected",          // Rejected by admin
      ],
      default: "Pending",
    },

    // Timestamps (auto-managed by mongoose)
    // createdAt & updatedAt will be added automatically
  },
  {
    timestamps: true, // This adds createdAt and updatedAt
  }
);

// Indexes for better performance
profileVerificationSchema.index({ user_id: 1, profile_status: 1 });
profileVerificationSchema.index({ phone: 1 });
profileVerificationSchema.index({ email: 1 });

// Virtual field to check if all verifications are complete
profileVerificationSchema.virtual("is_fully_verified").get(function () {
  return (
    this.phone_verified &&
    this.email_verified &&
    this.documents.every(doc => doc.document_verified) &&
    this.profile_status === "Approved"
  );
});

// Ensure virtuals are included in JSON output
profileVerificationSchema.set("toJSON", { virtuals: true });
profileVerificationSchema.set("toObject", { virtuals: true });

const ProfileVerification = mongoose.model("ProfileVerification", profileVerificationSchema);

export default ProfileVerification;