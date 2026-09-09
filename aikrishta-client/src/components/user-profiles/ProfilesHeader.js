// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

// export default function ProfilesHeader({ totalCount }) {
//   return (
//     <div style={styles.header}>
//       <div style={styles.headerContent}>
//         <div>
//           <h1 style={styles.title}>Profiles</h1>
//           <p style={styles.subtitle}>
//             Find your perfect match from our verified community
//           </p>
//         </div>
//         <div style={styles.countBadge}>
//           <span style={styles.countNumber}>{totalCount}</span>
//           <span style={styles.countLabel}>Profiles Available</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   header: {
//     marginBottom: SPACING[8],
//     padding: `${SPACING[6]} ${SPACING[8]}`,
//     background: COLORS.primaryGradient,
//     borderRadius: '16px',
//     boxShadow: COLORS.shadowDark,
//   },
//   headerContent: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     gap: SPACING[4],
//   },
//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.textWhite,
//     margin: 0,
//   },
//   subtitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textLight,
//     margin: `${SPACING[1]} 0 0 0`,
//   },
//   countBadge: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: `${SPACING[3]} ${SPACING[6]}`,
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: '12px',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//   },
//   countNumber: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['3xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.accent,
//   },
//   countLabel: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textLight,
//     marginTop: SPACING[1],
//   },
// };










// src/components/profiles/ProfilesHeader.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function ProfilesHeader({ totalCount }) {
  return (
    <div style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>
          Available <span style={styles.highlight}>Profiles</span>
        </h1>
        <p style={styles.subtitle}>
          Discover your perfect match from our verified members
        </p>
      </div>
      <div style={styles.right}>
        <div style={styles.countBadge}>
          <span style={styles.countNumber}>{totalCount}</span>
          <span style={styles.countLabel}>Profiles Available</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${SPACING[8]} 0`,
    marginBottom: SPACING[8],
    borderBottom: `2px solid ${COLORS.secondary}20`,
    flexWrap: 'wrap',
    gap: SPACING[4],
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  badge: {
    display: 'inline-block',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid ${COLORS.accent}30`,
    borderRadius: '9999px',
    width: 'fit-content',
    backgroundColor: `rgba(201, 169, 110, 0.08)`,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },
  highlight: {
    color: COLORS.accent,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  countBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${SPACING[4]} ${SPACING[6]}`,
    backgroundColor: `rgba(139, 30, 63, 0.1)`,
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid ${COLORS.secondary}20`,
    minWidth: '120px',
  },
  countNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },
  countLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};