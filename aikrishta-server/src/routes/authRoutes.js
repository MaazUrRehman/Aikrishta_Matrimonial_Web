// import protect from "../middlewares/authMiddleware.js";
import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";


import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  toggleProfileActivation,
} from "../controllers/authController.js";

import validate from "../middlewares/validate.js";

import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validations/authValidation.js";

import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.post(
  "/logout",
  protect,
  logout
);

router.post(
  "/refresh-token",
  refreshToken
);

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPassword
);

router.post(
  "/resend-verification",
  resendVerificationEmail
);



router.patch(
  "/reset-password/:token",
  resetPasswordValidation,
  validate,
  resetPassword
);


router.get(
  "/verify-email/:token",
  verifyEmail
);

router.get(
  "/me",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Authenticated user fetched successfully.",
      data: req.user,
    });
  }
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin.",
      data: req.user,
    });
  }
);


// Add this with other routes
router.patch(
  "/profile/activation",
  protect,
  toggleProfileActivation
);


export default router;