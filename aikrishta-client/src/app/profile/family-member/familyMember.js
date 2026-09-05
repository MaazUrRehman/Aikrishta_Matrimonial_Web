import { API } from "@/lib/api";
import { z } from "zod";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const defaultValues = {
  first_name: "",
  last_name: "",
  relation: "",
  phone: "",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const familyMemberSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must not exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces."),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must not exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces."),

  relation: z
    .string()
    .min(1, "Please select a relation.")
    .refine(
      (value) =>
        ["Father", "Mother", "Brother", "Sister", "Friend", "Other Relative"].includes(
          value
        ),
      {
        message:
          "Relation must be Father, Mother, Brother, Sister, Friend or Other Relative.",
      }
    ),

  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Please enter a valid phone number with country code (e.g., +923001234567)"
    ),
});

/*
|--------------------------------------------------------------------------
| Get Family Member
|--------------------------------------------------------------------------
*/

export const getFamilyMember = async () => {
  const response = await fetch(API.profile.familyMember, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch family member information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Family Member
|--------------------------------------------------------------------------
*/

export const createFamilyMember = async (payload) => {
  const response = await fetch(API.profile.familyMember, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create family member information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Family Member
|--------------------------------------------------------------------------
*/

export const updateFamilyMember = async (payload) => {
  const response = await fetch(API.profile.familyMember, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update family member information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Family Member (UPSERT)
|--------------------------------------------------------------------------
*/

export const saveFamilyMember = async (payload) => {
  try {
    await getFamilyMember();
    return await updateFamilyMember(payload);
  } catch (error) {
    if (error.message === "Family member information not found.") {
      return await createFamilyMember(payload);
    }
    toast.error(error.message || "Failed to save family member information.");
    return null;
  }
};
