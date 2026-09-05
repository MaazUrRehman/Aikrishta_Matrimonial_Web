import User from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import resetPasswordTemplate from "../templates/resetPasswordTemplate.js";
import {generateAccessToken,generateRefreshToken,verifyRefreshToken,} from "../utils/jwt.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import verifyEmailTemplate from "../templates/verifyEmailTemplate.js";
/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/



export const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  console.log("📝 Registration attempt:", { fullName, email });

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log("⚠️ User already exists:", email);
    return next(new AppError("User already exists with this email.", 409));
  }

  // Create user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  console.log("✅ User created:", user._id);

  // Generate Email Verification Token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Verification URL
  const verificationUrl = `${process.env.SERVER_URL}/api/v1/auth/verify-email/${verificationToken}`;
  
  console.log("🔗 Verification URL:", verificationUrl);

  // Generate HTML Template
  const html = verifyEmailTemplate(user.fullName, verificationUrl);

  // Send Email - Yeh important hai
  try {
    console.log("📧 Sending verification email...");
    console.log("📧 Email content preview:", html.substring(0, 200) + "...");
    
    const result = await sendEmail({
      email: user.email,
      subject: "Verify Your Email - AIKRISHTA",
      html,
    });

    console.log("✅ Email sent successfully!");
    console.log("📨 Message ID:", result.messageId);
    
  } catch (error) {
    console.log("========== EMAIL ERROR ==========");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.log("=================================");
    
    // Clear verification tokens
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "Verification email could not be sent. Please try again later.",
        500
      )
    );
  }

  return new ApiResponse(
    res,
    201,
    "Registration successful. Please verify your email before logging in.",
    {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileActivation: user.profileActivation,
      },
    }
  );
});


/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid email or password.", 401));
  }

  // Active Check
  if (!user.isActive) {
    return next(new AppError("Your account has been disabled.", 403));
  }

  // Password Check
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password.", 401));
  }

  // Email Verification Check
  if (!user.isVerified) {
    return next(
      new AppError(
        "Please verify your email before logging in.",
        403
      )
    );
  }

  // Generate Tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save Refresh Token
  user.refreshToken = refreshToken;

  await user.save();

  // Cookies
  const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  };

  const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return new ApiResponse(
    res,
    200,
    "Login successful.",
    {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileActivation: user.profileActivation,
      },
      accessToken,
      refreshToken,
    }
  );
});

/*
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/

export const logout = asyncHandler(async (req, res, next) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Already logged out.", 400));
  }

  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return new ApiResponse(
    res,
    200,
    "Logout successful."
  );

});
/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

export const refreshToken = asyncHandler(async (req, res, next) => {

  let refreshToken =
    req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(
      new AppError(
        "Refresh token not found. Please login again.",
        401
      )
    );
  }

  // Verify Refresh Token
  const decoded =
    verifyRefreshToken(refreshToken);

  // Find User
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError(
        "User not found.",
        401
      )
    );
  }

  // Match Stored Refresh Token
  if (user.refreshToken !== refreshToken) {
    return next(
      new AppError(
        "Invalid refresh token.",
        401
      )
    );
  }

  // Generate New Tokens
  const newAccessToken =
    generateAccessToken(user);

  const newRefreshToken =
    generateRefreshToken(user);

  // Save New Refresh Token
  user.refreshToken = newRefreshToken;

  await user.save();

  // Cookie Options
  // Cookie Options with environment-aware SameSite
  const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  };

  const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  // Set Cookies
  res.cookie(
    "accessToken",
    newAccessToken,
    accessCookieOptions
  );

  res.cookie(
    "refreshToken",
    newRefreshToken,
    refreshCookieOptions
  );

  return new ApiResponse(
    res,
    200,
    "Access token refreshed successfully."
  );

});
/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPassword = asyncHandler(async (req, res, next) => {

  const { email } = req.body;

  // Check Email
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("No user found with this email.", 404)
    );
  }

  // Generate Reset Token
  const resetToken = user.createPasswordResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  // Reset URL
  // const resetURL = `${process.env.SERVER_URL}/reset-password/${resetToken}`;
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const resetURL = `${clientUrl}/auth/reset-password/${resetToken}`;

  console.log("🔗 Reset Password URL:", resetURL);

  // ✅ FIXED: HTML Template instead of plain text
  const html = resetPasswordTemplate(user.fullName, resetURL);
  
  // Email Message
//   const message = `
// Hello ${user.fullName},

// You requested to reset your password.

// Click the link below to reset your password:

// ${resetURL}

// This link will expire in ${process.env.PASSWORD_RESET_EXPIRES} minutes.

// If you did not request this, please ignore this email.

// Regards,
// AIKRISHTA Team
// `;

  try {

    await sendEmail({
      email: user.email,
      subject: "AIKRISHTA Password Reset",
      html,
    });

    return new ApiResponse(
      res,
      200,
      "Password reset link sent successfully."
    );

  } catch (error) {

    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save({
      validateBeforeSave: false,
    });

    return next(
      new AppError(
        "Unable to send reset email. Please try again later.",
        500
      )
    );

  }

});

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPassword = asyncHandler(async (req, res, next) => {

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new AppError(
        "Token is invalid or has expired.",
        400
      )
    );
  }

  user.password = req.body.password;

  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  user.refreshToken = null;

  await user.save();

  return new ApiResponse(
    res,
    200,
    "Password reset successfully."
  );

});

/*
|--------------------------------------------------------------------------
| Verify Email
|--------------------------------------------------------------------------
*/


// export const verifyEmail = asyncHandler(async (req, res, next) => {
//   const { token } = req.params;

//   // Hash Token
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   // Find User
//   const user = await User.findOne({
//     emailVerificationToken: hashedToken,
//     emailVerificationExpires: {
//       $gt: Date.now(),
//     },
//   });

//   if (!user) {
//     // HTML Response with Error
//     return res.status(400).send(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Verification Failed</title>
//         <style>
//           body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
//           .container { background: white; padding: 40px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//           h1 { color: #e74c3c; }
//           .btn { display: inline-block; margin-top: 20px; padding: 12px 30px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>❌ Verification Failed</h1>
//           <p>Invalid or expired verification link.</p>
//           <a href="${process.env.CLIENT_URL}/resend-verification" class="btn">Resend Verification</a>
//         </div>
//       </body>
//       </html>
//     `);
//   }

//   // Verify User
//   user.isVerified = true;
//   user.emailVerificationToken = null;
//   user.emailVerificationExpires = null;
//   await user.save({ validateBeforeSave: false });

//   // Success HTML Page - Same page pe dikhega
//   return res.status(200).send(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Email Verified Successfully</title>
//       <style>
//         body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
//         .container { background: white; padding: 40px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//         h1 { color: #2ecc71; }
//         .btn { display: inline-block; margin-top: 20px; padding: 12px 30px; background: #2ecc71; color: white; text-decoration: none; border-radius: 5px; }
//         .btn:hover { background: #27ae60; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>✅ Email Verified!</h1>
//         <p>Your email has been verified successfully.</p>
//         <a href="${process.env.CLIENT_URL}/login" class="btn">Login Now</a>
//       </div>
//     </body>
//     </html>
//   `);
// });


export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  // Hash Token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find User
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    // ✅ UPDATED: Error HTML with AIKRISHTA Theme
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Verification Failed - AIKRISHTA</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1A2A4A 0%, #0A1528 100%);
            padding: 20px;
          }
          .container {
            max-width: 480px;
            width: 100%;
            background: #FFFFFF;
            padding: 50px 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 24px 64px rgba(0,0,0,0.25);
            border: 1px solid #E8ECF0;
          }
          .icon { font-size: 60px; display: block; margin-bottom: 20px; }
          h1 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            color: #DC2626;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            color: #666666;
            margin-bottom: 30px;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #8B1E3F;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(139, 30, 63, 0.3);
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(139, 30, 63, 0.4);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="icon">❌</span>
          <h1>Verification Failed</h1>
          <p>Invalid or expired verification link. Please request a new one.</p>
          <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/resend-verification" class="btn">Resend Verification</a>
        </div>
      </body>
      </html>
    `);
  }

  // Verify User
  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save({ validateBeforeSave: false });

  // ✅ UPDATED: Success HTML with AIKRISHTA Theme
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Verified - AIKRISHTA</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1A2A4A 0%, #0A1528 100%);
          padding: 20px;
        }
        .container {
          max-width: 480px;
          width: 100%;
          background: #FFFFFF;
          padding: 50px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          border: 1px solid #E8ECF0;
        }
        .icon { font-size: 60px; display: block; margin-bottom: 20px; }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #16A34A;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
          color: #666666;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        .btn {
          display: inline-block;
          padding: 12px 30px;
          background: #8B1E3F;
          color: #FFFFFF;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(139, 30, 63, 0.3);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139, 30, 63, 0.4);
        }
        .sub-text {
          font-size: 14px;
          color: #999999;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="icon">✅</span>
        <h1>Email Verified!</h1>
        <p>Your email has been verified successfully.<br>You can now login to your account.</p>
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/login" class="btn">Login Now</a>
        <p class="sub-text">Redirecting in 3 seconds...</p>
      </div>
      <script>
        setTimeout(function() {
          window.location.href = "${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/login";
        }, 3000);
      </script>
    </body>
    </html>
  `);
});


/*
|--------------------------------------------------------------------------
| Toggle Profile Activation (Profile Visible/Invisible)
|--------------------------------------------------------------------------
*/

export const toggleProfileActivation = asyncHandler(async (req, res, next) => {
  const { profileActivation } = req.body;
  
  // Validate input
  if (typeof profileActivation !== 'boolean') {
    return next(new AppError('profileActivation must be a boolean value.', 400));
  }

  // Find user
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  // Update profile activation status
  user.profileActivation = profileActivation;
  await user.save();

  return new ApiResponse(
    res,
    200,
    `Profile ${profileActivation ? 'activated' : 'deactivated'} successfully.`,
    {
      profileActivation: user.profileActivation,
      userId: user._id,
    }
  );
});



/*
|--------------------------------------------------------------------------
| Resend Verification Email
|--------------------------------------------------------------------------
*/

// export const resendVerificationEmail = asyncHandler(async (req, res, next) => {

//   const { email } = req.body;

//   // Find User
//   const user = await User.findOne({ email });

//   if (!user) {
//     return next(
//       new AppError(
//         "User not found.",
//         404
//       )
//     );
//   }

//   if (user.isVerified) {
//     return next(
//       new AppError(
//         "Email is already verified.",
//         409
//       )
//     );
//   }

//   // Generate New Token
//   const verificationToken =
//     user.createEmailVerificationToken();

//   await user.save({
//     validateBeforeSave: false,
//   });

//   // Verification URL
//   const verificationUrl =
//     `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

//   // HTML
//   const html =
//     verifyEmailTemplate(
//       user.fullName,
//       verificationUrl
//     );

//   try {

//     await sendEmail({
//       email: user.email,
//       subject: "Verify Your Email",
//       html,
//     });

//     return new ApiResponse(
//       res,
//       200,
//       "Verification email sent successfully."
//     );

//   } catch (error) {

//     user.emailVerificationToken = null;
//     user.emailVerificationExpires = null;

//     await user.save({
//       validateBeforeSave: false,
//     });

//     return next(
//       new AppError(
//         "Unable to send verification email.",
//         500
//       )
//     );

//   }

// });



/*
|--------------------------------------------------------------------------
| Resend Verification Email
|--------------------------------------------------------------------------
*/

export const resendVerificationEmail = asyncHandler(async (req, res, next) => {

  const { email } = req.body;

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError(
        "User not found.",
        404
      )
    );
  }

  if (user.isVerified) {
    return next(
      new AppError(
        "Email is already verified.",
        409
      )
    );
  }

  // Generate New Token
  const verificationToken =
    user.createEmailVerificationToken();

  await user.save({
    validateBeforeSave: false,
  });

  // ✅ FIXED: Correct URL with /auth/
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const verificationUrl = `${clientUrl}/auth/verify-email/${verificationToken}`;

  console.log("🔗 Resend Verification URL:", verificationUrl);

  // HTML
  const html =
    verifyEmailTemplate(
      user.fullName,
      verificationUrl
    );

  try {

    await sendEmail({
      email: user.email,
      subject: "Verify Your Email - AIKRISHTA",
      html,
    });

    console.log("✅ Resend email sent successfully to:", user.email);

    return new ApiResponse(
      res,
      200,
      "Verification email sent successfully."
    );

  } catch (error) {

    console.log("========== RESEND EMAIL ERROR ==========");
    console.error("Error:", error.message);
    console.log("=========================================");

    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save({
      validateBeforeSave: false,
    });

    return next(
      new AppError(
        "Unable to send verification email. Please try again later.",
        500
      )
    );

  }

});








