// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

// export default function EmptyState({ message, icon }) {
//   return (
//     <div style={styles.container}>
//       <div style={styles.iconWrapper}>
//         <span style={styles.icon}>{icon || '🔍'}</span>
//       </div>
//       <h3 style={styles.title}>No Profiles Found</h3>
//       <p style={styles.message}>
//         {message || 'Try adjusting your filters or search criteria'}
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '400px',
//     padding: SPACING[8],
//     backgroundColor: COLORS.white,
//     borderRadius: '16px',
//     boxShadow: COLORS.shadow,
//   },
//   iconWrapper: {
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     backgroundColor: COLORS.primaryLightest,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: SPACING[4],
//   },
//   icon: {
//     fontSize: TYPOGRAPHY.fontSize['5xl'],
//   },
//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     color: COLORS.textDark,
//     margin: 0,
//     marginBottom: SPACING[2],
//   },
//   message: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     textAlign: 'center',
//     maxWidth: '400px',
//     margin: 0,
//   },
// };










// src/components/profiles/EmptyState.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

export default function EmptyState({ message, icon = '🔍' }) {
  return (
    <div style={styles.container}>
      <span style={styles.icon}>{icon}</span>
      <h3 style={styles.title}>No Profiles Found</h3>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
    gap: SPACING[3],
    textAlign: 'center',
  },
  icon: {
    fontSize: TYPOGRAPHY.fontSize['6xl'],
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },
  message: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '400px',
    margin: 0,
  },
};