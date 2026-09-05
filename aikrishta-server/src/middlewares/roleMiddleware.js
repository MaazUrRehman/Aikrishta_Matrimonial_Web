import AppError from "../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Role Authorization Middleware
|--------------------------------------------------------------------------
*/

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError("Unauthorized access.", 401)
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not allowed to access this resource.",
          403
        )
      );
    }

    next();
  };
};

export default authorize;