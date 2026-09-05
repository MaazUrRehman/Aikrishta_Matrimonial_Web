import mongoose from "mongoose";

const contactProfessionalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
    },

    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      required: [true, "Country is required."],
      trim: true,
      maxlength: 100,
    },

    education_level: {
      type: String,
      required: [true, "Education level is required."],
      trim: true,
      maxlength: 100,
    },

    occupation: {
      type: String,
      required: [true, "Occupation is required."],
      trim: true,
      maxlength: 100,
    },

    monthly_income: {
      type: Number,
      required: [true, "Monthly income is required."],
      min: [0, "Monthly income cannot be negative."],
    },

    additional_details: {
      type: String,
      default: null,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// One contact & professional record per user
// contactProfessionalSchema.index({ user_id: 1 }, { unique: true });

// Search optimization
contactProfessionalSchema.index({
  city: 1,
  country: 1,
  education_level: 1,
  occupation: 1,
});

const ContactProfessional = mongoose.model(
  "ContactProfessional",
  contactProfessionalSchema
);

export default ContactProfessional;