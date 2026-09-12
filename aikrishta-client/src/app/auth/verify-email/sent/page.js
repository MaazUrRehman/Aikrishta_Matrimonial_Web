// // src/app/auth/verify-email/sent/page.js
// 'use client';

// import Link from 'next/link';
// import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

// export default function VerifyEmailSentPage() {
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.icon}>✉️</div>
//         <h1 style={styles.title}>Check Your Email</h1>
//         <p style={styles.subtitle}>
//           We've sent a verification link to your email address.
//           Please click the link to verify your account.
//         </p>
//         <div style={styles.infoBox}>
//           <p style={styles.infoText}>
//             📌 Didn't receive the email? Check your spam folder or
//           </p>
//           <Link href="/auth/resend-verification" style={styles.resendLink}>
//             Resend Verification Email
//           </Link>
//         </div>
//         <Link href="/auth/login" style={styles.btnPrimary}>
//           Back to Login
//         </Link>
//       </div>
//     </div>
//   );
// }

// // ==================== STYLES ====================

// const styles = {
//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: SPACING[6],
//     background: COLORS.gradients.hero,
//   },

//   card: {
//     maxWidth: '520px',
//     width: '100%',
//     backgroundColor: COLORS.white,
//     padding: SPACING[12],
//     borderRadius: BORDER_RADIUS['2xl'],
//     boxShadow: SHADOWS.xl,
//     border: `1px solid ${COLORS.borderLight}`,
//     textAlign: 'center',
//   },

//   icon: {
//     fontSize: TYPOGRAPHY.fontSize['6xl'],
//     display: 'block',
//     marginBottom: SPACING[4],
//   },

//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     marginBottom: SPACING[2],
//   },

//   subtitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     lineHeight: TYPOGRAPHY.lineHeight.relaxed,
//     marginBottom: SPACING[6],
//   },

//   infoBox: {
//     backgroundColor: COLORS.primaryLightest,
//     padding: SPACING[4],
//     borderRadius: BORDER_RADIUS.base,
//     marginBottom: SPACING[6],
//   },

//   infoText: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     marginBottom: SPACING[1],
//   },

//   resendLink: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.secondary,
//     textDecoration: 'none',
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//   },

//   btnPrimary: {
//     display: 'inline-block',
//     padding: `${SPACING[3]} ${SPACING[6]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     textDecoration: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     transition: 'all 0.3s ease',
//     boxShadow: SHADOWS.pink,
//     width: '100%',
//   },
// };

























// src/app/auth/verify-email/sent/page.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function VerifyEmailSentPage() {
  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.icon}>✉️</div>
        <h1 style={styles.title}>Check Your <span style={styles.highlight}>Email</span></h1>
        <p style={styles.subtitle}>
          We&apos;ve sent a verification link to your email address.
          Please click the link to verify your account.
        </p>
        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            📌 Didn&apos;t receive the email? Check your spam folder or
          </p>
          <Link href="/auth/resend-verification" style={styles.resendLink}>
            Resend Verification Email
          </Link>
        </div>
        <Link href="/auth/login" style={styles.btnPrimary}>
          Back to Login
        </Link>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING[6],
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  card: {
    maxWidth: '520px',
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    padding: SPACING[12],
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
  },
  icon: {
    fontSize: TYPOGRAPHY.fontSize['6xl'],
    display: 'block',
    marginBottom: SPACING[4],
    color: COLORS.accent,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
  },
  highlight: {
    color: COLORS.accent,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    marginBottom: SPACING[6],
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: SPACING[4],
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING[6],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  infoText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: SPACING[1],
  },
  resendLink: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.accent,
    textDecoration: 'none',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    transition: 'color 0.3s ease',
    ':hover': {
      color: COLORS.secondary,
    },
  },
  btnPrimary: {
    display: 'inline-block',
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.lg,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    width: '100%',
  },
};