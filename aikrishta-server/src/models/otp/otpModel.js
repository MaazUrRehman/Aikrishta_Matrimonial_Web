

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      index: true,
    },

    // ✅ Email support (already hai)
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    // ✅ Phone support (already hai)
    phone: {
      type: String,
      trim: true,
      index: true,
    },

    otp: {
      type: String,
      required: [true, "OTP is required."],
    },

    purpose: {
      type: String,
      required: true,
      enum: [
        "Phone Verification",
        "Email Verification",
        "Forgot Password",
        "Login OTP",
        "Change Phone Number",
        "Change Email",
        "Two Factor Authentication",
      ],
      default: "Phone Verification",
    },

    expires_at: {
      type: Date,
      required: true,
    },

    // ✅ CHANGE: verified → is_verified (clearer name)
    is_verified: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // ✅ Reference to profile verification (already hai)
    verification_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfileVerification",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Pre-validate Hook: Ensure either email or phone is provided
|--------------------------------------------------------------------------
*/

otpSchema.pre("validate", function () {
  // Email verification requires email
  if (
    this.purpose === "Email Verification" ||
    this.purpose === "Change Email"
  ) {
    if (!this.email) {
      console.log("Email is required for email verification.");
    }
  }

  // Phone verification requires phone
  if (
    this.purpose === "Phone Verification" ||
    this.purpose === "Change Phone Number"
  ) {
    if (!this.phone) {
      console.log("Phone number is required for phone verification.");
    }
  }

  // Either email or phone must be present
  if (!this.email && !this.phone) {
    console.log("Either email or phone is required.");
  }
});

/*
|--------------------------------------------------------------------------
| Indexes for Better Performance
|--------------------------------------------------------------------------
*/

// Compound indexes for faster queries
otpSchema.index({ user_id: 1, purpose: 1, is_verified: 1 });
otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ phone: 1, purpose: 1 });

// ✅ UNCOMMENT THIS: Auto-delete expired OTPs
otpSchema.index(
  { expires_at: 1 },
  {
    expireAfterSeconds: 0, // MongoDB will delete documents when expires_at time passes
  }
);

/*
|--------------------------------------------------------------------------
| Instance Methods
|--------------------------------------------------------------------------
*/

// ✅ Check if OTP is expired
otpSchema.methods.isExpired = function () {
  return new Date() > this.expires_at;
};

// ✅ Check if OTP is already verified
otpSchema.methods.isVerified = function () {
  return this.is_verified === true;
};

// ✅ Increment attempts
otpSchema.methods.incrementAttempts = function () {
  this.attempts += 1;
  return this.save();
};

// ✅ Check if max attempts reached
otpSchema.methods.isMaxAttemptsReached = function () {
  return this.attempts >= 5;
};

/*
|--------------------------------------------------------------------------
| Static Methods
|--------------------------------------------------------------------------
*/

// ✅ Find valid OTP
otpSchema.statics.findValidOTP = async function (filter) {
  return this.findOne({
    ...filter,
    is_verified: false,
    expires_at: { $gt: new Date() },
    attempts: { $lt: 5 },
  });
};

// ✅ Create OTP with expiry
otpSchema.statics.createOTP = async function (data) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  
  return this.create({
    ...data,
    expires_at: expiresAt,
    is_verified: false,
    attempts: 0,
  });
};

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
