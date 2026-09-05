import { API } from "@/lib/api";
import { toast } from 'react-hot-toast';

/*
|--------------------------------------------------------------------------
| Get Verification Status
|--------------------------------------------------------------------------
*/

export const getVerificationStatus = async () => {
  const response = await fetch(API.profile.verificationStatus, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error("Failed to get verification status.");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Get Verification Progress
|--------------------------------------------------------------------------
*/

export const getVerificationProgress = (status) => {
  const steps = [
    { 
      name: "Phone Verification", 
      completed: status?.phone_verified || false,
      icon: "📱"
    },
    { 
      name: "Email Verification", 
      completed: status?.email_verified || false,
      icon: "✉️"
    },
    { 
      name: "Document Upload", 
      completed: status?.documents?.length > 0 || false,
      icon: "📄"
    },
    { 
      name: "Admin Review", 
      completed: status?.profile_status === "Approved",
      icon: "👤"
    },
  ];

  const completed = steps.filter(s => s.completed).length;
  const total = steps.length;

  return {
    steps,
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
    isComplete: completed === total,
    isRejected: status?.profile_status === "Rejected",
    isPending: status?.profile_status === "Pending" || 
               status?.profile_status === "Under Review" ||
               status?.profile_status === "Fraud Check",
  };
};

/*
|--------------------------------------------------------------------------
| Get Status Badge Color
|--------------------------------------------------------------------------
*/

export const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Approved":
      return { bg: "#DCFCE7", color: "#16A34A", label: "✅ Approved" };
    case "Rejected":
      return { bg: "#FEE2E2", color: "#DC2626", label: "❌ Rejected" };
    case "Under Review":
      return { bg: "#FEF3C7", color: "#D97706", label: "⏳ Under Review" };
    case "Fraud Check":
      return { bg: "#FEF3C7", color: "#D97706", label: "🔍 Fraud Check" };
    case "Phone Pending":
      return { bg: "#FEF3C7", color: "#D97706", label: "📱 Phone Pending" };
    case "Email Pending":
      return { bg: "#FEF3C7", color: "#D97706", label: "✉️ Email Pending" };
    case "Documents Pending":
      return { bg: "#FEF3C7", color: "#D97706", label: "📄 Documents Pending" };
    default:
      return { bg: "#E5E7EB", color: "#6B7280", label: "⏳ Pending" };
  }
};