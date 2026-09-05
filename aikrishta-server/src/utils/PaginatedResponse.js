class PaginatedResponse {
  constructor(
    res,
    statusCode,
    message,
    data,
    page,
    limit,
    totalDocuments
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      pagination: {
        page,
        limit,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
      data,
    });
  }
}

export default PaginatedResponse;