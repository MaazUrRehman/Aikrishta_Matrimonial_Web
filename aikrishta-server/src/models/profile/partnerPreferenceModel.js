import mongoose from "mongoose";

const partnerPreferenceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
    },

    preferred_age_min: {
      type: Number,
      required: [true, "Minimum preferred age is required."],
      min: [18, "Minimum preferred age must be at least 18."],
      max: [100, "Preferred age cannot exceed 100."],
    },

    preferred_age_max: {
      type: Number,
      required: [true, "Maximum preferred age is required."],
      min: [18, "Maximum preferred age must be at least 18."],
      max: [100, "Preferred age cannot exceed 100."],
    },

    preferred_education: {
      type: String,
      required: [true, "Preferred education is required."],
      trim: true,
      maxlength: 100,
    },

    preferred_profession: {
      type: String,
      required: [true, "Preferred profession is required."],
      trim: true,
      maxlength: 100,
    },

    preferred_caste: {
      type: String,
      required: [true, "Preferred caste is required."],
      trim: true,
      maxlength: 100,
    },

    preferred_marital_status: {
      type: String,
      required: [true, "Preferred marital status is required."],
      enum: {
        values: [
          "Never Married",
          "Divorced",
          "Widowed",
          "Separated",
        ],
        message: "Please select a valid marital status.",
      },
      trim: true,
    },

    preferred_city: {
      type: String,
      required: [true, "Preferred city is required."],
      trim: true,
      maxlength: 100,
    },

    preferred_country: {
      type: String,
      required: [true, "Preferred country is required."],
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// One partner preference record per user
// partnerPreferenceSchema.index({ user_id: 1 }, { unique: true });

// Search & AI Matching optimization
partnerPreferenceSchema.index({
  preferred_city: 1,
  preferred_country: 1,
  preferred_caste: 1,
  preferred_marital_status: 1,
});

const PartnerPreference = mongoose.model(
  "PartnerPreference",
  partnerPreferenceSchema
);

export default PartnerPreference;