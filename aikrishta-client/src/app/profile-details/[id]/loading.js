'use client';

import LoadingState from '@/components/user-profiles/LoadingState';
import { COLORS, SPACING } from '@/constants/theme';

export default function ProfileDetailLoading() {
  return (
    <div style={styles.container}>
      <div style={styles.skeletonHeader}>
        <div style={styles.backSkeleton}></div>
      </div>
      <LoadingState />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${SPACING[4]} ${SPACING[4]}`,
    minHeight: '100vh',
    backgroundColor: COLORS.lightBg,
  },
  skeletonHeader: {
    marginBottom: SPACING[4],
  },
  backSkeleton: {
    width: '140px',
    height: '40px',
    backgroundColor: '#E8ECF0',
    borderRadius: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

// Add this to your global CSS or use inline styles
const pulseAnimation = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;