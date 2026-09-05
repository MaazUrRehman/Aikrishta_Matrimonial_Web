import mongoose from "mongoose";

const familyBackgroundSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
    },

    father_name: {
      type: String,
      required: [true, "Father name is required."],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    mother_name: {
      type: String,
      required: [true, "Mother name is required."],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    father_profession: {
      type: String,
      required: [true, "Father profession is required."],
      trim: true,
      maxlength: 100,
    },

    mother_profession: {
      type: String,
      required: [true, "Mother profession is required."],
      trim: true,
      maxlength: 100,
    },

    brothers_count: {
      type: Number,
      required: [true, "Brothers count is required."],
      min: [0, "Brothers count cannot be negative."],
    },

    brothers_married: {
      type: Number,
      required: [true, "Married brothers count is required."],
      min: [0, "Married brothers count cannot be negative."],
    },

    sisters_count: {
      type: Number,
      required: [true, "Sisters count is required."],
      min: [0, "Sisters count cannot be negative."],
    },

    sisters_married: {
      type: Number,
      required: [true, "Married sisters count is required."],
      min: [0, "Married sisters count cannot be negative."],
    },

    social_status: {
      type: String,
      required: [true, "Social status is required."],
      trim: true,
      maxlength: 100,
    },

    family_residence: {
      type: String,
      required: [true, "Family residence is required."],
      trim: true,
      maxlength: 255,
    },

    financial_status: {
      type: String,
      required: [true, "Financial status is required."],
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// One family background per user
// familyBackgroundSchema.index({ user_id: 1 }, { unique: true });

// Search optimization
familyBackgroundSchema.index({
  social_status: 1,
  financial_status: 1,
});

const FamilyBackground = mongoose.model(
  "FamilyBackground",
  familyBackgroundSchema
);

export default FamilyBackground;