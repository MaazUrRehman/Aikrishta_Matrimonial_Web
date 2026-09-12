const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const API = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: (token) => `${API_BASE_URL}/auth/reset-password/${token}`,
    verifyEmail: (token) => `${API_BASE_URL}/auth/verify-email/${token}`,
    resendVerification: `${API_BASE_URL}/auth/resend-verification`,
    toggleProfileActivation: `${API_BASE_URL}/auth/profile/activation`, 
    me: `${API_BASE_URL}/auth/me`,
  },


  otp: {
    phone: {
      send: `${API_BASE_URL}/otp/phone-otp/send-phone-otp`,
      verify: `${API_BASE_URL}/otp/phone-otp/verify-phone-otp`,
      resend: `${API_BASE_URL}/otp/phone-otp/resend-phone-otp`,
    },
    email: {
      send: `${API_BASE_URL}/otp/email-otp/send-email-otp`,
      verify: `${API_BASE_URL}/otp/email-otp/verify-email-otp`,
      resend: `${API_BASE_URL}/otp/email-otp/resend-email-otp`,
    },
  },

  profile: {
    profileType: `${API_BASE_URL}/profile/profile-type`,
    familyMember: `${API_BASE_URL}/profile/family-member`,
    personalInfo: `${API_BASE_URL}/profile/personal-information`,
    contactProfessional: `${API_BASE_URL}/profile/contact-professional`,
    familyBackground: `${API_BASE_URL}/profile/family-background`,
    partnerPreference: `${API_BASE_URL}/profile/partner-preference`,

    // ✅ THESE WERE MISSING - ADDED
    verificationStatus: `${API_BASE_URL}/profile/profile-verification/verification-status`,

    submit: `${API_BASE_URL}/profile/profile-verification/submit-profile`,
    uploadDocument: `${API_BASE_URL}/profile/profile-verification/upload-document`,
    deleteDocument: `${API_BASE_URL}/profile/profile-verification/document`,
    documents: `${API_BASE_URL}/profile/profile-verification/documents`,

    userProfiles: `${API_BASE_URL}/profile/personal-information/user-profiles`,
  },

  aiMatch: {
    getMatches: `${API_BASE_URL}/ai-match`,
  },

  chat: {
    createConversation: `${API_BASE_URL}/conversations`,
    getConversations: `${API_BASE_URL}/conversations`,
    getConversation: (id) => `${API_BASE_URL}/conversations/${id}`,
    sendMessage: `${API_BASE_URL}/messages`,
    getMessages: (conversationId) => `${API_BASE_URL}/messages/${conversationId}`,
    markSeen: (conversationId) => `${API_BASE_URL}/messages/${conversationId}/seen`,
  },

  admin: {
    dashboard: `${API_BASE_URL}/admin/dashboard`,
    verifications: `${API_BASE_URL}/admin/verifications`,
    verificationDetail: `${API_BASE_URL}/admin/verification`,
    verifyDocuments: `${API_BASE_URL}/admin/verify-documents`,
    runFraudDetection: (userId) =>
      `${API_BASE_URL}/admin/fraud-detection/${userId}`,

    getFraudDetection: (userId) =>
      `${API_BASE_URL}/admin/fraud-detection/${userId}`,
    updateStatus: `${API_BASE_URL}/admin/update-status`,
    users: `${API_BASE_URL}/admin/users`,

  },
};