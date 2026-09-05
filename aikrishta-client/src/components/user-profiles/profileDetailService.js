import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';

/**
 * Fetch complete profile by ID
 * Combines data from multiple endpoints
 */
export const getProfileById = async (profileId) => {
  try {
    // Fetch all profile data for the specified user ID
    // We assume the backend supports querying by userId/profileId
    const [
      personalInfoRes,
      contactProfessionalRes,
      familyBackgroundRes,
      partnerPreferenceRes,
    ] = await Promise.all([
      fetch(`${API.profile.personalInfo}/${profileId}`, { credentials: 'include' }),
      fetch(`${API.profile.contactProfessional}/${profileId}`, { credentials: 'include' }),
      fetch(`${API.profile.familyBackground}/${profileId}`, { credentials: 'include' }),
      fetch(`${API.profile.partnerPreference}/${profileId}`, { credentials: 'include' }),
    ]);

    const personalInfo = personalInfoRes.ok ? await personalInfoRes.json() : null;
    const contactProfessional = contactProfessionalRes.ok ? await contactProfessionalRes.json() : null;
    const familyBackground = familyBackgroundRes.ok ? await familyBackgroundRes.json() : null;
    const partnerPreference = partnerPreferenceRes.ok ? await partnerPreferenceRes.json() : null;

    return {
      id: profileId,
      personalInfo: personalInfo?.data || null,
      contactProfessional: contactProfessional?.data || null,
      familyBackground: familyBackground?.data || null,
      partnerPreference: partnerPreference?.data || null,
    };
  } catch (error) {
    console.error('Error fetching profile detail:', error);
    toast.error(error.message || 'Failed to fetch profile detail');
    return null;
  }
};

/**
 * Get specific profile detail by ID (for future backend implementation)
 */
export const getProfileDetailById = async (profileId) => {
  try {
    const response = await fetch(`${API.profile.profileDetail}/${profileId}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('Failed to fetch profile detail');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile detail:', error);
    toast.error(error.message || 'Failed to fetch profile detail');
    return null;
  }
};
