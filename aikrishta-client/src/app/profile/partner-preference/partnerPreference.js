import { API } from "@/lib/api";
import { z } from "zod";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const defaultValues = {
  preferred_age_min: "",
  preferred_age_max: "",
  preferred_education: "",
  preferred_profession: "",
  preferred_caste: "",
  preferred_marital_status: "",
  preferred_city: "",
  preferred_country: "",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const partnerPreferenceSchema = z.object({
  // ✅ FIXED: Changed from string() to number()
  preferred_age_min: z
    .number({
      required_error: "Minimum preferred age is required.",
      invalid_type_error: "Minimum preferred age must be a number.",
    })
    .min(18, "Minimum preferred age must be between 18 and 100 years.")
    .max(100, "Minimum preferred age must be between 18 and 100 years."),

  // ✅ FIXED: Changed from string() to number()
  preferred_age_max: z
    .number({
      required_error: "Maximum preferred age is required.",
      invalid_type_error: "Maximum preferred age must be a number.",
    })
    .min(18, "Maximum preferred age must be between 18 and 100 years.")
    .max(100, "Maximum preferred age must be between 18 and 100 years."),

  preferred_education: z
    .string()
    .min(1, "Preferred education is required.")
    .max(100, "Preferred education must not exceed 100 characters.")
    .refine(
      (value) =>
        ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Doctorate", "Other"].includes(
          value
        ),
      { message: "Please select a valid education level." }
    ),

  preferred_profession: z
    .string()
    .min(1, "Preferred profession is required.")
    .max(100, "Preferred profession must not exceed 100 characters."),

  preferred_caste: z
    .string()
    .min(1, "Preferred caste is required.")
    .max(100, "Preferred caste must not exceed 100 characters."),

  preferred_marital_status: z
    .string()
    .min(1, "Preferred marital status is required.")
    .refine(
      (value) =>
        ["Never Married", "Divorced", "Widowed", "Separated"].includes(value),
      { message: "Please select a valid marital status." }
    ),

  preferred_city: z
    .string()
    .min(1, "Preferred city is required.")
    .max(100, "Preferred city must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s\-']+$/, "City can only contain letters, spaces, hyphens, and apostrophes."),

  preferred_country: z
    .string()
    .min(1, "Preferred country is required.")
    .max(100, "Preferred country must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s\-']+$/, "Country can only contain letters, spaces, hyphens, and apostrophes."),
});

/*
|--------------------------------------------------------------------------
| Get Partner Preference
|--------------------------------------------------------------------------
*/

export const getPartnerPreference = async () => {
  const response = await fetch(API.profile.partnerPreference, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch partner preference.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Partner Preference
|--------------------------------------------------------------------------
*/

export const createPartnerPreference = async (payload) => {
  const response = await fetch(API.profile.partnerPreference, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create partner preference.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Partner Preference
|--------------------------------------------------------------------------
*/

export const updatePartnerPreference = async (payload) => {
  const response = await fetch(API.profile.partnerPreference, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update partner preference.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Partner Preference (UPSERT)
|--------------------------------------------------------------------------
*/

export const savePartnerPreference = async (payload) => {
  try {
    await getPartnerPreference();
    return await updatePartnerPreference(payload);
  } catch (error) {
    if (error.message === "Partner preference not found.") {
      return await createPartnerPreference(payload);
    }
    toast.error(error.message || "Failed to save partner preference.");
    return null;
  }
};
