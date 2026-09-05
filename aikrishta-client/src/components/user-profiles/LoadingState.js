// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

// export default function LoadingState() {
//   return (
//     <div style={styles.container}>
//       <div style={styles.loader}></div>
//       <p style={styles.text}>Loading profiles...</p>
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
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
//   },
//   loader: {
//     width: '60px',
//     height: '60px',
//     borderRadius: '50%',
//     border: `4px solid ${COLORS.borderLight}`,
//     borderTop: `4px solid ${COLORS.secondary}`,
//     animation: 'spin 0.8s linear infinite',
//   },
//   text: {
//     marginTop: SPACING[4],
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//   },
// };








// src/components/profiles/LoadingState.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

export default function LoadingState() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading profiles...</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: SPACING[4],
  },
  spinner: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: `4px solid rgba(255,255,255,0.05)`,
    borderTop: `4px solid ${COLORS.accent}`,
    animation: 'spin 1s linear infinite',
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
  },
};

// Add keyframe animation
if (typeof window !== 'undefined') {
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}