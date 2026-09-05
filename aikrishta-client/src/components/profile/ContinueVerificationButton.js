'use client';

import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function ContinueVerificationButton({ verification }) {
  const router = useRouter();

  const isComplete = verification?.profile_status === 'Approved';

  if (isComplete) {
    return null;
  }

  const handleClick = () => {
    router.push('/profile/profile-verification');
  };

  return (
    <button style={styles.btn} onClick={handleClick}>
      🔄 Continue Verification
    </button>
  );
}

const styles = {
  btn: {
    flex: 1,
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    border: 'none',
    borderRadius: BORDER_RADIUS.base,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: SHADOWS.pink,
    minWidth: '200px',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-2px)',
    },
  },
};