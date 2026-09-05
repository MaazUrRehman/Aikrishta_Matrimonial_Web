import { API } from "@/lib/api";
import { z } from "zod";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const defaultValues = {
  city: "",
  country: "",
  education_level: "",
  occupation: "",
  monthly_income: "",
  additional_details: "",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const contactProfessionalSchema = z.object({
  city: z
    .string()
    .min(1, "City is required.")
    .max(100, "City must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s\-']+$/, "City can only contain letters, spaces, hyphens, and apostrophes."),

  country: z
    .string()
    .min(1, "Country is required.")
    .max(100, "Country must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s\-']+$/, "Country can only contain letters, spaces, hyphens, and apostrophes."),

  education_level: z
    .string()
    .min(1, "Education level is required.")
    .refine(
      (value) =>
        ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Doctorate", "Other"].includes(
          value
        ),
      { message: "Please select a valid education level." }
    ),

  occupation: z
    .string()
    .min(1, "Occupation is required.")
    .max(100, "Occupation must not exceed 100 characters."),

  // ✅ FIXED: Changed from string() to number()
  monthly_income: z
    .number({
      required_error: "Monthly income is required.",
      invalid_type_error: "Monthly income must be a number.",
    })
    .min(0, "Monthly income must be greater than or equal to 0."),

  additional_details: z
    .string()
    .max(1000, "Additional details must not exceed 1000 characters.")
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Get Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const getContactProfessional = async () => {
  const response = await fetch(API.profile.contactProfessional, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch contact and professional information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const createContactProfessional = async (payload) => {
  const response = await fetch(API.profile.contactProfessional, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create contact and professional information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Contact & Professional Information
|--------------------------------------------------------------------------
*/

export const updateContactProfessional = async (payload) => {
  const response = await fetch(API.profile.contactProfessional, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update contact and professional information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Contact & Professional Information (UPSERT)
|--------------------------------------------------------------------------
*/

export const saveContactProfessional = async (payload) => {
  try {
    await getContactProfessional();
    return await updateContactProfessional(payload);
  } catch (error) {
    if (error.message === "Contact and professional information not found.") {
      return await createContactProfessional(payload);
    }
    toast.error(error.message || "Failed to save contact and professional information.");
    return null;
  }
};
