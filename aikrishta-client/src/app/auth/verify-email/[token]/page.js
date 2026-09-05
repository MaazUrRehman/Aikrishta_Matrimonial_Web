// // src/app/auth/verify-email/[token]/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

// export default function VerifyEmailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const token = params.token;

//   const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/v1/auth/verify-email/${token}`, {
//           method: 'GET',
//           credentials: 'include',
//         });

//         const data = await res.text(); // Backend returns HTML

//         if (res.ok) {
//           setStatus('success');
//           setMessage('Your email has been verified successfully!');
//           // Redirect to login after 3 seconds
//           setTimeout(() => {
//             router.push('/auth/login');
//           }, 3000);
//         } else {
//           setStatus('error');
//           setMessage('Invalid or expired verification link. Please try again.');
//         }
//       } catch (error) {
//         setStatus('error');
//         setMessage('Something went wrong. Please try again.');
//       }
//     };

//     if (token) {
//       verifyEmail();
//     }
//   }, [token, router]);

//   // Loading State
//   if (status === 'verifying') {
//     return (
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <div style={styles.loader}></div>
//           <h2 style={styles.title}>Verifying Your Email</h2>
//           <p style={styles.subtitle}>Please wait while we verify your email address...</p>
//         </div>
//       </div>
//     );
//   }

//   // Success State
//   if (status === 'success') {
//     return (
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <div style={styles.successIcon}>✅</div>
//           <h2 style={styles.successTitle}>Email Verified!</h2>
//           <p style={styles.successText}>{message}</p>
//           <p style={styles.redirectText}>Redirecting to login page...</p>
//           <Link href="/auth/login" style={styles.btnPrimary}>
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.errorIcon}>❌</div>
//         <h2 style={styles.errorTitle}>Verification Failed</h2>
//         <p style={styles.errorText}>{message}</p>
//         <div style={styles.buttonGroup}>
//           <Link href="/auth/login" style={styles.btnPrimary}>
//             Go to Login
//           </Link>
//           <Link href="/auth/resend-verification" style={styles.btnSecondary}>
//             Resend Verification
//           </Link>
//         </div>
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
//     maxWidth: '480px',
//     width: '100%',
//     backgroundColor: COLORS.white,
//     padding: SPACING[12],
//     borderRadius: BORDER_RADIUS['2xl'],
//     boxShadow: SHADOWS.xl,
//     border: `1px solid ${COLORS.borderLight}`,
//     textAlign: 'center',
//   },

//   // ===== LOADING =====
//   loader: {
//     width: '48px',
//     height: '48px',
//     margin: '0 auto',
//     border: `4px solid ${COLORS.border}`,
//     borderTop: `4px solid ${COLORS.secondary}`,
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//     marginBottom: SPACING[6],
//   },

//   // ===== SUCCESS =====
//   successIcon: {
//     fontSize: TYPOGRAPHY.fontSize['6xl'],
//     display: 'block',
//     marginBottom: SPACING[4],
//   },

//   successTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: '#16A34A',
//     marginBottom: SPACING[2],
//   },

//   successText: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     marginBottom: SPACING[2],
//   },

//   // ===== ERROR =====
//   errorIcon: {
//     fontSize: TYPOGRAPHY.fontSize['6xl'],
//     display: 'block',
//     marginBottom: SPACING[4],
//   },

//   errorTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: '#DC2626',
//     marginBottom: SPACING[2],
//   },

//   errorText: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     marginBottom: SPACING[6],
//   },

//   // ===== COMMON =====
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
//   },

//   redirectText: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textLight,
//     marginBottom: SPACING[6],
//   },

//   buttonGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[3],
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

//   btnSecondary: {
//     display: 'inline-block',
//     padding: `${SPACING[3]} ${SPACING[6]}`,
//     backgroundColor: 'transparent',
//     color: COLORS.secondary,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     textDecoration: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     border: `2px solid ${COLORS.secondary}`,
//     transition: 'all 0.3s ease',
//     width: '100%',
//   },
// };

// // Add this to globals.css
// /*
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// */


























// src/app/auth/verify-email/[token]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token;

  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/auth/verify-email/${token}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.text();

        if (res.ok) {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Invalid or expired verification link. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  if (status === 'verifying') {
    return (
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
        >
          <div style={styles.loader}></div>
          <h2 style={styles.title}>Verifying Your Email</h2>
          <p style={styles.subtitle}>Please wait while we verify your email address...</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
        >
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>Email Verified!</h2>
          <p style={styles.successText}>{message}</p>
          <p style={styles.redirectText}>Redirecting to login page...</p>
          <Link href="/auth/login" style={styles.btnPrimary}>
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.errorIcon}>❌</div>
        <h2 style={styles.errorTitle}>Verification Failed</h2>
        <p style={styles.errorText}>{message}</p>
        <div style={styles.buttonGroup}>
          <Link href="/auth/login" style={styles.btnPrimary}>
            Go to Login
          </Link>
          <Link href="/auth/resend-verification" style={styles.btnSecondary}>
            Resend Verification
          </Link>
        </div>
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
    maxWidth: '480px',
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    padding: SPACING[12],
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
  },
  loader: {
    width: '48px',
    height: '48px',
    margin: '0 auto',
    border: `4px solid rgba(255,255,255,0.05)`,
    borderTop: `4px solid ${COLORS.accent}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: SPACING[6],
  },
  successIcon: {
    fontSize: TYPOGRAPHY.fontSize['6xl'],
    display: 'block',
    marginBottom: SPACING[4],
  },
  successTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: '#22C55E',
    marginBottom: SPACING[2],
  },
  successText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: SPACING[2],
  },
  errorIcon: {
    fontSize: TYPOGRAPHY.fontSize['6xl'],
    display: 'block',
    marginBottom: SPACING[4],
  },
  errorTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: '#EF4444',
    marginBottom: SPACING[2],
  },
  errorText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: SPACING[6],
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
  },
  redirectText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
    marginBottom: SPACING[6],
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[3],
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
  btnSecondary: {
    display: 'inline-block',
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: 'transparent',
    color: COLORS.accent,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.lg,
    border: `2px solid ${COLORS.accent}`,
    transition: 'all 0.3s ease',
    width: '100%',
  },
};