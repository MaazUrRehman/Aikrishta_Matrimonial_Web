/**
 * Call Service - UI Only
 * Will be implemented in Phase 3
 */
export const initiateVoiceCall = async (profileId) => {
  console.log('[UI Only] Voice call initiated with profile:', profileId);
  return {
    success: true,
    message: 'Voice call feature coming soon',
  };
};

export const initiateVideoCall = async (profileId) => {
  console.log('[UI Only] Video call initiated with profile:', profileId);
  return {
    success: true,
    message: 'Video call feature coming soon',
  };
};

export const getCallHistory = async () => {
  console.log('[UI Only] Call history fetched');
  return {
    success: true,
    calls: [],
    message: 'Call history feature coming soon',
  };
};