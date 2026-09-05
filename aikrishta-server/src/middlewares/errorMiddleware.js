import AppError from "../utils/AppError.js";

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  const message = `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" already exists. Please use another ${field}.`;

  return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = errors.join(". ");

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again.", 401)
  ;

const handleJWTExpiredError = () =>
  new AppError("Your session has expired. Please login again.", 401)
  ;

const sendErrorProd = (err, res) => {
  // Operational Error
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // Programming Error
  console.error("ERROR 💥", err);

  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went wrong!",
  });
};

const errorMiddleware = (err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error(err.stack);

  if (err.name === "JsonWebTokenError") {
    err = handleJWTError();
  }

  if (err.name === "TokenExpiredError") {
    err = handleJWTExpiredError();
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }

    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};

export default errorMiddleware;
