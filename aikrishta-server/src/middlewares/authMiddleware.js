import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

const protect = asyncHandler(async (req, res, next) => {

    let token;

    // 1. Check Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2. Check Cookies
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    // No Token Found
    if (!token) {
        console.log("Access denied. Please login first.", 401);
    }

    // Verify JWT
    const decoded = verifyAccessToken(token);

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        console.log("User not found.", 401);
    }

    // Check User Status
    if (!user.isActive) {
        console.log("Your account has been deactivated.", 403);
    }

    // Attach User
    req.user = user;

    next();
    
});


/*
|--------------------------------------------------------------------------
| isAdmin Middleware - Authorization
|--------------------------------------------------------------------------
*/

const isAdmin = asyncHandler(async (req, res, next) => {

    // Check if user is attached by protect middleware
    if (!req.user) {
        console.log("Authentication required.", 401);
    }

    // Check if user has Admin role
    if (req.user.role !== "admin") {
        console.log("Access denied. Admin privileges required.", 403);
    }

    next();
});

/*
|--------------------------------------------------------------------------
| authorize Middleware - Role Based Access
|--------------------------------------------------------------------------
*/

const authorize = (...roles) => {
    return asyncHandler(async (req, res, next) => {

        // Check if user is attached by protect middleware
        if (!req.user) {
            console.log("Authentication required.", 401);
        }

        // Check if user role is allowed
        if (!roles.includes(req.user.role)) {
            console.log(
                `Access denied. Required roles: ${roles.join(", ")}`,
                403
            );
        }

        next();
    });
};


export { protect, isAdmin, authorize };
