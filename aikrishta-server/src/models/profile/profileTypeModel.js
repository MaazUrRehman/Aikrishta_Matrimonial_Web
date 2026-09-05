import mongoose from "mongoose";

const profileTypeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      unique: true,
    },

    profile_for: {
      type: String,
      enum: {
        values: ["Myself", "Family Member"],
        message: "Profile type must be either 'Myself' or 'Family Member'.",
      },
      required: [true, "Profile type is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// One profile type per user
// profileTypeSchema.index({ user_id: 1 }, { unique: true });

const ProfileType = mongoose.model("ProfileType", profileTypeSchema);

export default ProfileType;