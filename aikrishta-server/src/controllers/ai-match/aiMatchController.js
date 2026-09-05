import User from "../../models/User.js";
import PersonalInformation from "../../models/profile/personalInformationModel.js";
import ContactProfessional from "../../models/profile/contactProfessionalModel.js";
import FamilyBackground from "../../models/profile/familyBackgroundModel.js";
import PartnerPreference from "../../models/profile/partnerPreferenceModel.js";
import ProfileVerification from "../../models/profile/profileVerificationModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { calculateMatchScore } from "../../services/ai-match/matchingService.js";

export const getMatches = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // 1. Fetch current user and their profile data
  const currentUser = await User.findById(userId);
  if (!currentUser) return res.status(404).json({ message: "User not found" });

  const [
    cPersonal,
    cContact,
    cFamily,
    cPartner,
  ] = await Promise.all([
    PersonalInformation.findOne({ user_id: userId }),
    ContactProfessional.findOne({ user_id: userId }),
    FamilyBackground.findOne({ user_id: userId }),
    PartnerPreference.findOne({ user_id: userId }),
  ]);

  const currentUserData = {
    ...currentUser.toObject(),
    personalInformation: cPersonal,
    contactProfessional: cContact,
    familyBackground: cFamily,
    partnerPreference: cPartner,
  };

  // 2. Fetch all other users (excluding current)
  // Assuming gender is in personalInformation
  // const allUsers = await User.find({ _id: { $ne: userId } });
  const allUsers = await User.find({
  _id: { $ne: userId },
  profileActivation: true,
});

  const matches = [];

  for (const targetUser of allUsers) {

    if (!targetUser.profileActivation) continue;
    
    const tId = targetUser._id;
    const [
      tPersonal,
      tContact,
      tFamily,
      tVerification,
    ] = await Promise.all([
      PersonalInformation.findOne({ user_id: tId }),
      ContactProfessional.findOne({ user_id: tId }),
      FamilyBackground.findOne({ user_id: tId }),
      ProfileVerification.findOne({ user_id: tId }),
    ]);

    // Skip if crucial data is missing
    if (!tPersonal || !tContact) continue;

    // Filter by opposite gender (assuming gender is stored in PersonalInformation)
    if (cPersonal?.gender === tPersonal.gender) continue;

    const targetUserData = {
      ...targetUser.toObject(),
      personalInformation: tPersonal,
      contactProfessional: tContact,
      familyBackground: tFamily,
      isVerified: tVerification?.profile_status, // "Approved", "Pending", "Rejected"
    };

    const { score, breakdown } = calculateMatchScore(currentUserData, targetUserData);
    
    let level = "Low Match";
    if (score >= 90) level = "Excellent Match";
    else if (score >= 75) level = "Very Good Match";
    else if (score >= 60) level = "Good Match";
    else if (score >= 40) level = "Average Match";

    matches.push({
      user_id: tId,
      first_name: tPersonal.first_name,
      last_name: tPersonal.last_name,
      age: tPersonal.age,
      city: tContact.city,
      education: tContact.education_level,
      profession: tContact.occupation,
      profile_picture: tPersonal.profile_picture,
      matchPercentage: score,
      matchLevel: level,
      matchBreakdown: breakdown,
    });
  }

  // Sort by matchPercentage descending
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  if (matches.length === 0) return res.status(404).json({ success: false, message: "No compatible profiles found." });

  return new ApiResponse(res, 200, "Matches fetched successfully", matches);
});
