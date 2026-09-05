class ApiResponse {
  constructor(res, statusCode, message, data = null) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}

export default ApiResponse;