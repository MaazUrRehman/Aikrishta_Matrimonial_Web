import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';

export const getOppositeGenderProfiles = async (userId) => {

    const currentUser = await PersonalInformation.findOne({
        user_id: userId,
    });

    if (!currentUser) {
        toast.error("User not found.");
        return null;
    }

    const oppositeGender =
        currentUser.gender === "Male"
            ? "Female"
            : "Male";

    
    const profiles = await PersonalInformation.aggregate([
  {
    $match: {
      gender: oppositeGender,
      user_id: { $ne: currentUser.user_id }
    }
  },
  {
    $lookup: {
      from: "contactprofessionals",
      let: { userId: "$user_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$user_id", "$$userId"]
            }
          }
        }
      ],
      as: "contact"
    }
  },
  {
    $unwind: {
      path: "$contact",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      first_name: 1,
      last_name: 1,
      age: 1,
      gender: 1,
      religion: 1,
      caste: 1,
      mother_tongue: 1,
      marital_status: 1,
      profile_picture: 1,
      profile_status: 1,

      city: "$contact.city",
      country: "$contact.country",
      education: "$contact.education_level",
      profession: "$contact.occupation"
    }
  }
]);

    return profiles;
};


/**
 * Get all profiles (with filters) - For future backend implementation
 */
export const getAllProfiles = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const url = `${API.profile.profiles}?${queryParams}`;
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('Failed to fetch profiles');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    toast.error(error.message || 'Failed to fetch profiles');
    return null;
  }
};
