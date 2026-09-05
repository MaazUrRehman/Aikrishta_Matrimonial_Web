/**
 * Chat Service - UI Only
 * Will be implemented in Phase 3
 */
export const initiateChat = async (profileId) => {
  console.log('[UI Only] Chat initiated with profile:', profileId);
  return {
    success: true,
    message: 'Chat feature coming soon',
  };
};

export const getChatHistory = async (profileId) => {
  console.log('[UI Only] Chat history requested for:', profileId);
  return {
    success: true,
    messages: [],
    message: 'Chat history feature coming soon',
  };
};