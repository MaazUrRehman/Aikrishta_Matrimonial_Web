import { API } from "@/lib/api";
import { z } from "zod";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const defaultValues = {
  profile_for: "",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const profileTypeSchema = z.object({
  profile_for: z
    .string()
    .min(1, "Please select profile type.")
    .refine(
      (value) => ["Myself", "Family Member"].includes(value),
      {
        message:
          "Profile type must be either 'Myself' or 'Family Member'.",
      }
    ),
});

/*
|--------------------------------------------------------------------------
| Get Profile Type
|--------------------------------------------------------------------------
*/

export const getProfileType = async () => {
  const response = await fetch(API.profile.profileType, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch profile type.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Profile Type
|--------------------------------------------------------------------------
*/

export const createProfileType = async (payload) => {
  const response = await fetch(API.profile.profileType, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create profile type.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Profile Type
|--------------------------------------------------------------------------
*/

export const updateProfileType = async (payload) => {
  const response = await fetch(API.profile.profileType, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update profile type.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Profile Type
|--------------------------------------------------------------------------
*/

export const saveProfileType = async (payload) => {
  try {
    await getProfileType();

    return await updateProfileType(payload);
  } catch (error) {
    if (
      error.message === "Profile type not found."
    ) {
      return await createProfileType(payload);
    }

    toast.error(error.message || "Failed to save profile type.");
    return null;
  }
};
