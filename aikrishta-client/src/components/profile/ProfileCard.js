// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

// export default function ProfileCard({ personalInfo, profileType, verification, contactProfessional }) {
//   if (!personalInfo) {
//     return null;
//   }

//   const { 
//     first_name, 
//     last_name, 
//     age, 
//     gender, 
//     religion, 
//     caste, 
//     marital_status,
//     profile_picture,
//   } = personalInfo;

//   const fullName = `${first_name || ''} ${last_name || ''}`.trim();
//   const location = contactProfessional?.city || 'Not specified';

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         {/* Profile Picture - Center */}
//         <div style={styles.imageContainer}>
//           {profile_picture ? (
//             <img
//               src={profile_picture}
//               alt={fullName}
//               style={styles.image}
//             />
//           ) : (
//             <div style={styles.placeholder}>
//               <span style={styles.placeholderText}>{first_name?.[0] || '?'}</span>
//             </div>
//           )}
//         </div>

//         {/* Profile Info - Center */}
//         <div style={styles.info}>
//           <h2 style={styles.name}>{fullName || 'User'}</h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     marginBottom: SPACING[4],
//   },

//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: SPACING[8],
//     backgroundColor: '#FFF5F7',
//     borderRadius: BORDER_RADIUS.lg,
//     border: `1px solid #FCE4EC`,
//     boxShadow: SHADOWS.sm,
//     textAlign: 'center',
//   },

//   imageContainer: {
//     flexShrink: 0,
//     marginBottom: SPACING[0],
//   },

//   image: {
//     width: '180px',
//     height: '180px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: `4px solid ${COLORS.secondary}`,
//   },

//   placeholder: {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     backgroundColor: COLORS.secondary,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     border: `4px solid ${COLORS.secondary}`,
//   },

//   placeholderText: {
//     fontSize: TYPOGRAPHY.fontSize['5xl'],
//     color: COLORS.textWhite,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//   },

//   info: {
//     width: '100%',
//   },

//   name: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     marginBottom: SPACING[1],
//   },

//   details: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: SPACING[4],
//     flexWrap: 'wrap',
//     marginBottom: SPACING[3],
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     color: COLORS.textGray,
//   },

//   detailItem: {
//     position: 'relative',
//     '&:not(:last-child)::after': {
//       content: '"·"',
//       marginLeft: SPACING[4],
//       color: COLORS.textGray,
//     },
//   },

//   tags: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: SPACING[2],
//     flexWrap: 'wrap',
//   },

//   tag: {
//     padding: `${SPACING[1]} ${SPACING[4]}`,
//     backgroundColor: '#FCE4EC',
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.primary,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },
// };



















// src/components/profile/ProfileCard.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function ProfileCard({ personalInfo, profileType, verification, contactProfessional }) {
  if (!personalInfo) {
    return null;
  }

  const { 
    first_name, 
    last_name, 
    age, 
    gender, 
    religion, 
    caste, 
    marital_status,
    profile_picture,
  } = personalInfo;

  const fullName = `${first_name || ''} ${last_name || ''}`.trim();
  const location = contactProfessional?.city || 'Not specified';
  const isVerified = verification?.profile_status === 'Approved';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Profile Picture - Center with glowing ring */}
        <div style={styles.imageContainer}>
          <div style={styles.imageWrapper}>
            {profile_picture ? (
              <img
                src={profile_picture}
                alt={fullName}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholder}>
                <span style={styles.placeholderText}>{first_name?.[0] || '?'}</span>
              </div>
            )}
            {/* Verified Badge Overlay */}
            {isVerified && (
              <div style={styles.verifiedBadge}>
                <span style={styles.verifiedIcon}>✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info - Center */}
        <div style={styles.info}>
          <h2 style={styles.name}>{fullName || 'User'}</h2>
          
          {/* Details Row */}
          <div style={styles.details}>
            {age && (
              <span style={styles.detailItem}>
                {age} years
              </span>
            )}
            {location && (
              <span style={styles.detailItem}>
                {location}
              </span>
            )}
            {gender && (
              <span style={styles.detailItem}>
                {gender}
              </span>
            )}
          </div>

          {/* Tags */}
          <div style={styles.tags}>
            {religion && (
              <span style={styles.tag}>
                {religion}
              </span>
            )}
            {caste && (
              <span style={styles.tag}>
                {caste}
              </span>
            )}
            {marital_status && (
              <span style={styles.tag}>
                {marital_status}
              </span>
            )}
            {isVerified && (
              <span style={{...styles.tag, ...styles.tagVerified}}>
                Verified
              </span>
            )}
            {profileType?.profile_for && (
              <span style={styles.tag}>
                {profileType.profile_for}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: SPACING[3],
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: SPACING[6],
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.06)`,
    backdropFilter: 'blur(10px)',
    boxShadow: SHADOWS.sm,
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

  imageContainer: {
    flexShrink: 0,
    marginBottom: SPACING[3],
    position: 'relative',
  },

  imageWrapper: {
    position: 'relative',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    padding: '4px',
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.15)`,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `4px solid ${COLORS.primary}`,
  },

  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: `rgba(139, 30, 63, 0.2)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `4px solid ${COLORS.primary}`,
  },

  placeholderText: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },

  verifiedBadge: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${COLORS.primary}`,
    boxShadow: `0 0 20px rgba(34, 197, 94, 0.3)`,
  },

  verifiedIcon: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },

  info: {
    width: '100%',
  },

  name: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
  },

  details: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING[2],
    flexWrap: 'wrap',
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
  },

  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },

  detailIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },

  tags: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING[1],
    flexWrap: 'wrap',
  },

  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: `${SPACING[1]} ${SPACING[3]}`,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    border: `1px solid rgba(255,255,255,0.06)`,
    transition: 'all 0.3s ease',
  },

  tagVerified: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
    color: '#22C55E',
  },

  tagIcon: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
};

// Add keyframe animations
if (typeof window !== 'undefined') {
  const animations = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}