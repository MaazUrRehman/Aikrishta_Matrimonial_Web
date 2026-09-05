import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
    },

    first_name: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    last_name: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    relation: {
      type: String,
      required: [true, "Relation is required."],
      enum: {
        values: [
          "Father",
          "Mother",
          "Brother",
          "Sister",
          "Friend",
          "Other Relative",
        ],
        message: "Please select a valid relation.",
      },
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      minlength: 10,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

// One family member record per user
// familyMemberSchema.index({ user_id: 1 }, { unique: true });

// Search optimization
familyMemberSchema.index({
  first_name: 1,
  last_name: 1,
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);

export default FamilyMember;