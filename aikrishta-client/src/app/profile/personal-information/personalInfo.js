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
  date_of_birth: "",
  age: "", // ✅ ADDED
  gender: "",
  religion: "",
  caste: "",
  mother_tongue: "",
  marital_status: "",
  height: "",
  weight: "",
  profile_status: "Active",
};

/*
|--------------------------------------------------------------------------
| Validation Schema
|--------------------------------------------------------------------------
*/

export const personalInfoSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(100, "First name must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces."),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(100, "Last name must not exceed 100 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces."),

  // ✅ ADDED: Age field validation
  age: z
    .number({
      required_error: "Age is required.",
      invalid_type_error: "Age must be a number.",
    })
    .min(18, "Age must be between 18 and 100 years.")
    .max(100, "Age must be between 18 and 100 years."),

  date_of_birth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18;
    }, "You must be at least 18 years old."),

  gender: z
    .string()
    .min(1, "Gender is required.")
    .refine(
      (value) => ["Male", "Female"].includes(value),
      { message: "Gender must be either 'Male' or 'Female'." }
    ),

  religion: z
    .string()
    .min(1, "Religion is required.")
    .max(50, "Religion must not exceed 50 characters."),

  caste: z
    .string()
    .min(1, "Caste is required.")
    .max(100, "Caste must not exceed 100 characters."),

  mother_tongue: z
    .string()
    .min(1, "Mother tongue is required.")
    .max(50, "Mother tongue must not exceed 50 characters."),

  marital_status: z
    .string()
    .min(1, "Marital status is required.")
    .refine(
      (value) =>
        ["Never Married", "Divorced", "Widowed", "Separated"].includes(value),
      { message: "Please select a valid marital status." }
    ),

  height: z
    .number({
      required_error: "Height is required.",
      invalid_type_error: "Height must be a number.",
    })
    .min(2, "Height must be between 2 and 8 feet.")
    .max(8, "Height must be between 2 and 8 feet."),

  weight: z
    .number({
      required_error: "Weight is required.",
      invalid_type_error: "Weight must be a number.",
    })
    .min(20, "Weight must be between 20 and 300 kg.")
    .max(300, "Weight must be between 20 and 300 kg."),

  profile_status: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || ["Active", "Inactive"].includes(value),
      { message: "Profile status must be either 'Active' or 'Inactive'." }
    ),
});

/*
|--------------------------------------------------------------------------
| Get Personal Information
|--------------------------------------------------------------------------
*/

export const getPersonalInformation = async () => {
  const response = await fetch(API.profile.personalInfo, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to fetch personal information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Personal Information
|--------------------------------------------------------------------------
*/

export const createPersonalInformation = async (payload) => {
  const response = await fetch(API.profile.personalInfo, {
    method: "POST",
    credentials: "include",
    body: payload, // FormData
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to create personal information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update Personal Information
|--------------------------------------------------------------------------
*/

export const updatePersonalInformation = async (payload) => {
  const response = await fetch(API.profile.personalInfo, {
    method: "PUT",
    credentials: "include",
    body: payload, // FormData
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Failed to update personal information.");
    return null;
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Save Personal Information (UPSERT)
|--------------------------------------------------------------------------
*/

export const savePersonalInformation = async (payload) => {
  try {
    await getPersonalInformation();
    return await updatePersonalInformation(payload);
  } catch (error) {
    if (error.message === "Personal information not found.") {
      return await createPersonalInformation(payload);
    }
    toast.error(error.message || "Failed to save personal information.");
    return null;
  }
};
