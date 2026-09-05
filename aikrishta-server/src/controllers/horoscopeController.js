import asyncHandler from '../utils/asyncHandler.js';
import * as horoscopeService from '../services/horoscopeService.js';
import ApiResponse from '../utils/ApiResponse.js';

export const checkHoroscopeCompatibility = asyncHandler(async (req, res) => {
  const { user, candidate } = req.body;
  
  // Basic validation
  if (!user || !candidate || !user.dob || !candidate.dob || !user.city || !candidate.city) {
    return res.status(400).json({ message: 'Missing required horoscope data' });
  }

  const result = await horoscopeService.getKundliMatch({ user, candidate });
  
  new ApiResponse(res, 200, 'Horoscope compatibility calculated successfully', result);
});
