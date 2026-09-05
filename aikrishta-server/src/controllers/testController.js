import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const testController = asyncHandler(async (req, res, next) => {
  new ApiResponse(
    res,
    200,
    "Async Handler is working successfully."
  );
});

export default testController;