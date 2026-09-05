import { API } from "@/lib/api";
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api/v1';



export const adminGetAllUsers = async (params = {}) => {
  const { page = 1, limit = 100, search = '' } = params;

  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(search && { search }),
  });

  const response = await fetch(
    `${API_BASE_URL}/admin/users?${queryParams}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || "Failed to fetch users.");
    return null;
  }

  const data = await response.json();
  console.log('API Response:', data);
  
  // If verification data is not included in the response,
  // we need to fetch it separately or update the backend
  return data;
};



/*
|--------------------------------------------------------------------------
| Admin: Get User Details
|--------------------------------------------------------------------------
*/

export const adminGetUserDetails = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/users/${userId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || "Failed to fetch user details.");
    return null;
  }

  const data = await response.json();
  return data;
};

/*
|--------------------------------------------------------------------------
| Admin: Get User Profile Data - FIXED
|--------------------------------------------------------------------------
*/

export const adminGetUserProfileData = async (userId, type) => {
  try {
    // Map frontend modal types to backend routes
    const routeMap = {
      'personalInfo': `personal-information`,
      'contactProfessional': `contact-professional`,
      'familyBackground': `family-background`,
      'partnerPreference': `partner-preference`,
      'familyMembers': `family-member`,
      'basicInfo': `basic-info`,
    };

    // Get the correct route for the type
    const route = routeMap[type] || type;
    
    console.log(`Fetching ${type} for user ${userId} from route: ${route}`);

    const response = await fetch(
      `${API_BASE_URL}/admin/users/${userId}/${route}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If response is not ok, check if it's a 404 (data not found)
    if (response.status === 404) {
      console.warn(`No ${type} data found for user ${userId}`);
      return { data: null, success: false, message: `No ${type} found` };
    }

    if (!response.ok) {
      const text = await response.text();
      toast.error(text || `Failed to fetch ${type} data.`);
      return { data: null, success: false, message: text || `Failed to fetch ${type} data.` };
    }

    const data = await response.json();
    console.log(`${type} API Response:`, data);
    
    // Return the data structure
    return {
      data: data.data || null,
      success: data.success || false,
      message: data.message || ''
    };
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    return { data: null, success: false, message: error.message };
  }
};
