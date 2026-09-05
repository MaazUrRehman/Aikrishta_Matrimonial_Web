import { API } from "@/lib/api";
import { z } from "zod";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const defaultValues = {
  father_name: "",
  mother_name: "",
  father_profession: "",
  mother_profession: "",
  brothers_count: "",
  brothers_married: "",
  sisters_count: "",
  sisters_married: "",
  social_status: "",
  family_residence: "",
  financial_status: "",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const familyBackgroundSchema = z.object({
  father_name: z
    .string()
    .min(2, "Father name must be at least 2 characters.")
    .max(100, "Father name must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s']+$/, "Father name can only contain letters, spaces, and apostrophes."),

  mother_name: z
    .string()
    .min(2, "Mother name must be at least 2 characters.")
    .max(100, "Mother name must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s']+$/, "Mother name can only contain letters, spaces, and apostrophes."),

  father_profession: z
    .string()
    .min(1, "Father profession is required.")
    .max(100, "Father profession must not exceed 100 characters."),

  mother_profession: z
    .string()
    .min(1, "Mother profession is required.")
    .max(100, "Mother profession must not exceed 100 characters."),

  // ✅ FIXED: Changed from string() to number()
  brothers_count: z
    .number({
      required_error: "Brothers count is required.",
      invalid_type_error: "Brothers count must be a number.",
    })
    .min(0, "Brothers count must be 0 or greater."),

  // ✅ FIXED: Changed from string() to number()
  brothers_married: z
    .number({
      required_error: "Married brothers count is required.",
      invalid_type_error: "Married brothers count must be a number.",
    })
    .min(0, "Married brothers count must be 0 or greater."),

  // ✅ FIXED: Changed from string() to number()
  sisters_count: z
    .number({
      required_error: "Sisters count is required.",
      invalid_type_error: "Sisters count must be a number.",
    })
    .min(0, "Sisters count must be 0 or greater."),

  // ✅ FIXED: Changed from string() to number()
  sisters_married: z
    .number({
      required_error: "Married sisters count is required.",
      invalid_type_error: "Married sisters count must be a number.",
    })
    .min(0, "Married sisters count must be 0 or greater."),

  social_status: z
    .string()
    .min(1, "Social status is required.")
    .refine(
      (value) =>
        ["Upper Class", "Upper Middle Class", "Middle Class", "Lower Middle Class", "Working Class"].includes(
          value
        ),
      { message: "Please select a valid social status." }
    ),

  family_residence: z
    .string()
    .min(1, "Family residence is required.")
    .max(255, "Family residence must not exceed 255 characters."),

  financial_status: z
    .string()
    .min(1, "Financial status is required.")
    .refine(
      (value) =>
        ["Affluent", "Upper Middle", "Middle", "Lower Middle", "Modest"].includes(
          value
        ),
      { message: "Please select a valid financial status." }
    ),
});

/*
|--------------------------------------------------------------------------
| Get Family Background
|--------------------------------------------------------------------------
*/

export const getFamilyBackground = async () => {
  const response = await fetch(API.profile.familyBackground, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch family background.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Family Background
|--------------------------------------------------------------------------
*/

export const createFamilyBackground = async (payload) => {
  const response = await fetch(API.profile.familyBackground, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create family background.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Family Background
|--------------------------------------------------------------------------
*/

export const updateFamilyBackground = async (payload) => {
  const response = await fetch(API.profile.familyBackground, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update family background.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Family Background (UPSERT)
|--------------------------------------------------------------------------
*/

export const saveFamilyBackground = async (payload) => {
  try {
    await getFamilyBackground();
    return await updateFamilyBackground(payload);
  } catch (error) {
    if (error.message === "Family background not found.") {
      return await createFamilyBackground(payload);
    }
    toast.error(error.message || "Failed to save family background.");
    return null;
  }
};
