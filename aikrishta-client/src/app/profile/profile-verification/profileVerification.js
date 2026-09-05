  // app/profile/verification/profileVerification.js
  import { API } from "@/lib/api";
  import { z } from "zod";
  import { toast } from 'react-hot-toast';
  

  /*
  |--------------------------------------------------------------------------
  | Default Values
  |--------------------------------------------------------------------------
  */

  export const defaultValues = {
    phone: "",
    phone_otp: "",
    email: "",
    email_otp: "",
    documents: [],
    document_type: "",
    document_url: "",
    phone_verified: false,
    email_verified: false,
    document_verified: false,
    profile_status: "Pending",
  };

  /*
  |--------------------------------------------------------------------------
  | Validation Schema
  |--------------------------------------------------------------------------
  */

  export const phoneVerificationSchema = z.object({
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .regex(/^\+[1-9]\d{7,14}$/, "Please enter a valid phone number with country code (e.g., +923001234567)."),
  });

  export const phoneOtpSchema = z.object({
    phone: z
      .string()
      .min(1, "Phone number is required.")
      .regex(/^\+[1-9]\d{7,14}$/, "Please enter a valid phone number."),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits.")
      .regex(/^\d+$/, "OTP must contain only numbers."),
  });

  export const emailVerificationSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
  });

  export const emailOtpSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits.")
      .regex(/^\d+$/, "OTP must contain only numbers."),
  });

  export const documentSchema = z.object({
    document_type: z
      .string()
      .min(1, "Document type is required.")
      .refine(
        (value) =>
          ["Profile Image", "ID Card Front", "ID Card Back", "Passport", "Driving License", "Other"].includes(value),
        { message: "Please select a valid document type." }
      ),
  });

  /*
  |--------------------------------------------------------------------------
  | API Functions - Phone Verification
  |--------------------------------------------------------------------------
  */

  // ✅ CORRECT - Frontend API function
  export const sendPhoneOTP = async (phone) => {
    console.log('📞 Sending phone OTP to:', phone);
    
    const response = await fetch(API.otp.phone.send, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to send phone OTP.");
      
    }

    return data;
  };

  // ✅ CORRECT - Frontend API function
  export const verifyPhoneOTP = async (phone, otp) => {
    console.log('🔐 Verifying phone OTP for:', phone);
    
    const response = await fetch(API.otp.phone.verify, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ phone, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to verify phone OTP.");
    }

    return data;
  };

  // ✅ CORRECT - Frontend API function
  export const resendPhoneOTP = async (phone) => {
    console.log('🔄 Resending phone OTP for:', phone);
    
    const response = await fetch(API.otp.phone.resend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to resend phone OTP.");
    }

    return data;
  };

  /*
  |--------------------------------------------------------------------------
  | API Functions - Email Verification
  |--------------------------------------------------------------------------
  */

  export const sendEmailOTP = async (email) => {
    const response = await fetch(API.otp.email.send, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to send email OTP.");
    }

    return data;
  };

  export const verifyEmailOTP = async (email, otp) => {
    const response = await fetch(API.otp.email.verify, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to verify email OTP.");
    }

    return data;
  };

  export const resendEmailOTP = async (email) => {
    const response = await fetch(API.otp.email.resend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to resend email OTP.");
    }

    return data;
  };

  /*
  |--------------------------------------------------------------------------
  | API Functions - Profile Verification
  |--------------------------------------------------------------------------
  */

  export const submitProfileForm = async (payload) => {
    const response = await fetch(API.profile.submit, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to submit profile form.");
    }

    return data;
  };

  // export const getVerificationStatus = async () => {
  //   const response = await fetch(API.profile.verificationStatus, {
  //     method: "GET",
  //     credentials: "include",
  //   });

  //   const data = await response.json();

  //   if (!response.ok) {
  //     toast.error("Failed to get verification status.");
  //   }

  //   return data;
  // };

  export const getVerificationStatus = async () => {
  const response = await fetch(API.profile.verificationStatus, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  // 404 means verification has not started yet
  if (response.status === 404) {
    return {
      data: null,
      notStarted: true,
    };
  }

  if (!response.ok) {
    toast.error(data?.message || "Failed to get verification status.");
    throw new Error(data?.message || "Failed to get verification status.");
  }

  return data;
};

  export const uploadDocument = async (formData) => {
    const response = await fetch(API.profile.uploadDocument, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to upload document.");
    }

    return data;
  };

  export const deleteDocument = async (documentId) => {
    const response = await fetch(`${API.profile.deleteDocument}/${documentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to delete document.");
    }

    return data;
  };

  /*
  |--------------------------------------------------------------------------
  | Helper Functions
  |--------------------------------------------------------------------------
  */

  export const isValidPhone = (phone) => {
    return /^\+[1-9]\d{7,14}$/.test(phone);
  };

  export const isValidOtp = (otp) => {
    return /^\d{6}$/.test(otp);
  };

  export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  export const getStepProgress = (status) => {
    const steps = [
      { name: "Phone", completed: status.phone_verified },
      { name: "Email", completed: status.email_verified },
      { name: "Documents", completed: status.document_verified || status.documents?.length > 0 },
    ];
    
    const completed = steps.filter(s => s.completed).length;
    return {
      steps,
      completed,
      total: steps.length,
      percentage: Math.round((completed / steps.length) * 100),
    };
  };

  export const getDocuments = async () => {
    const response = await fetch(API.profile.documents, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Failed to get documents.");
    }

    return data;
  };

  export const submitForVerification = async (payload) => {
    return await submitProfileForm(payload);
  };

  export const isFullyVerified = (status) => {
    return (
      status.phone_verified &&
      status.email_verified &&
      status.document_verified &&
      status.profile_status === "Approved"
    );
  };

  export const getVerificationStatusText = (status) => {
    if (!status) return "Not Started";
    if (status.profile_status === "Approved") return "Verified ✅";
    if (status.profile_status === "Rejected") return "Rejected ❌";
    if (status.phone_verified && status.email_verified && status.documents.length > 0) {
      return "Under Review ⏳";
    }
    if (status.phone_verified && status.email_verified) {
      return "Documents Pending 📄";
    }
    if (status.phone_verified) {
      return "Email Pending ✉️";
    }
    return "Phone Pending 📱";
  };

  export const getNextStep = (status) => {
    if (!status.phone_verified) return { step: "phone", label: "Verify Phone" };
    if (!status.email_verified) return { step: "email", label: "Verify Email" };
    if (status.documents.length === 0) return { step: "documents", label: "Upload Documents" };
    if (status.profile_status !== "Approved") return { step: "submit", label: "Submit for Review" };
    return { step: "complete", label: "Complete" };
  };