import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';

/**
 * Fetch all profiles with opposite gender
 * This is a temporary solution until backend API is ready
 */
export const getOppositeGenderProfiles = async () => {
  try {
    const response = await fetch(API.profile.userProfiles, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Failed to fetch profiles");
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    toast.error(error.message || "Failed to fetch profiles");
    return null;
  }
};

/**
 * AI Matching Service - UI Only
 * Will be implemented in Phase 3
 */
export const getAIMatches = async (profileId) => {
  console.log('[UI Only] AI Match requested for profile:', profileId);
  return {
    success: true,
    message: 'AI Match feature coming soon',
  };
};

export const getMatchScore = async (profileId1, profileId2) => {
  console.log('[UI Only] Match score requested for:', profileId1, profileId2);
  return {
    success: true,
    score: 85,
    message: 'Match score feature coming soon',
  };
};
