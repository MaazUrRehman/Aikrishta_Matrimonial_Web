// src/app/admin/verifications/adminVerifications.js

/*
|--------------------------------------------------------------------------
| Admin: Get All Verifications
|--------------------------------------------------------------------------
*/
import { API } from "@/lib/api";
import { toast } from 'react-hot-toast';


const API_BASE_URL = 'http://localhost:5000/api/v1';
export const adminGetAllVerifications = async (params = {}) => {
  const { page = 1, limit = 100 } = params;

  const queryParams = new URLSearchParams({
    page,
    limit,
  });

  const response = await fetch(
    `${API_BASE_URL}/admin/verifications?${queryParams}`,
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
    toast.error(text || "Failed to fetch verifications.");
    return null;
  }

  const data = await response.json();
  return data;
};

/*
|--------------------------------------------------------------------------
| Admin: Get Verification Detail
|--------------------------------------------------------------------------
| ✅ Backend route: /admin/verification/:id
| ✅ Frontend call: /admin/verification/${userId}
*/
export const adminGetVerificationDetail = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/verification/${userId}`,  // ✅ Fixed: /verification/ not /verifications/
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
    toast.error(text || "Failed to fetch verification detail.");
    return null;
  }

  const data = await response.json();
  return data;
};

/*
|--------------------------------------------------------------------------
| Admin: Verify Documents
|--------------------------------------------------------------------------
| ✅ Backend route: /admin/verify-documents
*/
export const adminVerifyDocuments = async (data) => {
  console.log('Verifying documents with data:', data);
  
  const response = await fetch(
    `${API_BASE_URL}/admin/verify-documents`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || "Failed to verify documents.");
    return null;
  }

  const result = await response.json();
  return result;
};

/*
|--------------------------------------------------------------------------
| Admin: Perform Fraud Detection
|--------------------------------------------------------------------------
| ✅ Backend route: /admin/fraud-detection
*/
export const adminPerformFraudDetection = async (payload) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/fraud-detection`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || "Failed to perform fraud detection.");
    return null;
  }

  const data = await response.json();
  return data;
};

/*
|--------------------------------------------------------------------------
| Admin: Update Profile Status
|--------------------------------------------------------------------------
| ✅ Backend route: /admin/update-status
*/
export const adminUpdateProfileStatus = async (payload) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/update-status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || "Failed to update profile status.");
    return null;
  }

  const data = await response.json();
  return data;
};

/*
|--------------------------------------------------------------------------
| Admin: Get Statistics
|--------------------------------------------------------------------------
| ✅ Backend route: /admin/dashboard
*/
export const adminGetStatistics = async () => {
  const response = await fetch(
    `${API_BASE_URL}/admin/dashboard`,
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
    toast.error(text || "Failed to fetch statistics.");
    return null;
  }

  const data = await response.json();
  return data;
};





export const adminRunFraudDetection = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/fraud-detection/${userId}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || 'Failed to run fraud detection.');
    return null;
  }

  return await response.json();
};

export const adminGetFraudDetection = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/fraud-detection/${userId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    toast.error(text || 'Failed to fetch fraud report.');
    return null;
  }

  return await response.json();
};


