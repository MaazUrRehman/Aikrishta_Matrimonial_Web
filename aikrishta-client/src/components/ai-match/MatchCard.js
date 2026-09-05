// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import Link from 'next/link';
// // import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
// // import MatchDetailsModal from './MatchDetailsModal';

// // export default function MatchCard({ profile }) {
// //   const [showModal, setShowModal] = useState(false);

// //   return (
// //     <>
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         style={{
// //           background: COLORS.white,
// //           borderRadius: BORDER_RADIUS.md,
// //           padding: SPACING[6],
// //           boxShadow: SHADOWS.sm,
// //           border: `1px solid ${COLORS.borderLight}`,
// //           display: 'flex',
// //           flexDirection: 'column',
// //           gap: SPACING[3],
// //         }}
// //       >
// //         <div style={{ display: 'flex', alignItems: 'center', gap: SPACING[4] }}>
// //           <img
// //             src={profile.profile_picture || '/images/default-avatar.png'}
// //             alt={profile.first_name}
// //             style={{ width: '60px', height: '60px', borderRadius: BORDER_RADIUS.full, objectFit: 'cover' }}
// //           />
// //           <div>
// //             <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: COLORS.textDark }}>{profile.first_name} {profile.last_name}</h3>
// //             <p style={{ color: COLORS.textGray, fontSize: TYPOGRAPHY.fontSize.sm }}>{profile.age} years • {profile.city}</p>
// //           </div>
// //         </div>
        
// //         <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray }}>
// //           <p>Profession: {profile.profession}</p>
// //           <p>Education: {profile.education}</p>
// //         </div>

// //         <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <div style={{ 
// //               background: COLORS.goldLight, 
// //               color: COLORS.gold, 
// //               padding: `${SPACING[1]} ${SPACING[3]}`, 
// //               borderRadius: BORDER_RADIUS.full,
// //               fontSize: TYPOGRAPHY.fontSize.xs,
// //               fontWeight: TYPOGRAPHY.fontWeight.bold
// //           }}>
// //               {profile.matchPercentage}% Match ({profile.matchLevel})
// //           </div>
// //           <div style={{ display: 'flex', gap: SPACING[2] }}>
// //             <Link href={`/profile-details/${profile.user_id}?matchPercentage=${profile.matchPercentage}&matchCategory=${profile.matchLevel}&source=ai-match`} style={{
// //                 background: 'transparent',
// //                 color: COLORS.primary,
// //                 padding: `${SPACING[2]} ${SPACING[4]}`,
// //                 borderRadius: BORDER_RADIUS.md,
// //                 border: `1px solid ${COLORS.primary}`,
// //                 cursor: 'pointer',
// //                 textDecoration: 'none',
// //                 display: 'flex',
// //                 alignItems: 'center'
// //             }}>View Profile</Link>
// //             <button 
// //               onClick={() => setShowModal(true)}
// //               style={{
// //                 background: COLORS.primary,
// //                 color: COLORS.white,
// //                 padding: `${SPACING[2]} ${SPACING[4]}`,
// //                 borderRadius: BORDER_RADIUS.md,
// //                 border: 'none',
// //                 cursor: 'pointer'
// //             }}>View AI Match Details</button>
// //           </div>
// //         </div>
// //       </motion.div>
// //       <MatchDetailsModal profile={profile} isOpen={showModal} onClose={() => setShowModal(false)} />
// //     </>
// //   );
// // }
















// // src/components/ai-match/MatchCard.js
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
// import MatchDetailsModal from './MatchDetailsModal';

// export default function MatchCard({ profile }) {
//   const [showModal, setShowModal] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         style={{
//           ...styles.card,
//           ...(isHovered && styles.cardHover),
//         }}
//       >
//         {/* Header with Avatar */}
//         <div style={styles.header}>
//           <div style={styles.avatarWrapper}>
//             <img
//               src={profile.profile_picture || '/images/default-avatar.png'}
//               alt={profile.first_name}
//               style={{
//                 ...styles.avatar,
//                 ...(isHovered && styles.avatarHover),
//               }}
//             />
//             <div style={styles.statusDot}></div>
//           </div>
//           <div style={styles.userInfo}>
//             <h3 style={{
//               ...styles.name,
//               ...(isHovered && styles.nameHover),
//             }}>
//               {profile.first_name} {profile.last_name}
//             </h3>
//             <p style={styles.details}>{profile.age} years • {profile.city || 'Location not specified'}</p>
//           </div>
//         </div>

//         {/* Professional Details */}
//         <div style={styles.detailsGrid}>
//           {profile.profession && (
//             <div style={styles.detailItem}>
//               <span style={styles.detailIcon}>💼</span>
//               <span style={styles.detailText}>{profile.profession}</span>
//             </div>
//           )}
//           {profile.education && (
//             <div style={styles.detailItem}>
//               <span style={styles.detailIcon}>🎓</span>
//               <span style={styles.detailText}>{profile.education}</span>
//             </div>
//           )}
//         </div>

//         {/* Match Badge & Actions */}
//         <div style={styles.footer}>
//           <div style={styles.matchBadge}>
//             <span style={styles.matchPercentage}>{profile.matchPercentage}%</span>
//             <span style={styles.matchLevel}>{profile.matchLevel}</span>
//           </div>
//           <div style={styles.actionButtons}>
//             <Link 
//               href={`/profile-details/${profile.user_id}?matchPercentage=${profile.matchPercentage}&matchCategory=${profile.matchLevel}&source=ai-match`} 
//               style={{
//                 ...styles.viewBtn,
//                 ...(isHovered && styles.viewBtnHover),
//               }}
//             >
//               View Profile →
//             </Link>
//             <button 
//               onClick={() => setShowModal(true)}
//               style={{
//                 ...styles.matchBtn,
//                 ...(isHovered && styles.matchBtnHover),
//               }}
//             >
//               AI Match Details
//             </button>
//           </div>
//         </div>

//         {/* Decorative Border */}
//         <div style={{
//           ...styles.cardBorder,
//           ...(isHovered && styles.cardBorderHover),
//         }}></div>
//       </motion.div>
//       <MatchDetailsModal profile={profile} isOpen={showModal} onClose={() => setShowModal(false)} />
//     </>
//   );
// }

// const styles = {
//   card: {
//     background: 'rgba(255,255,255,0.04)',
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[6],
//     backdropFilter: 'blur(10px)',
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     borderColor: 'rgba(255,255,255,0.06)',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[4],
//     transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   cardHover: {
//     transform: 'translateY(-8px) scale(1.02)',
//     boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
//     borderWidth: '2px',
//     borderStyle: 'solid',
//     borderColor: COLORS.accent,
//     background: `rgba(201, 169, 110, 0.06)`,
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[4],
//   },
//   avatarWrapper: {
//     position: 'relative',
//     flexShrink: 0,
//   },
//   // ✅ Fixed - using separate border properties instead of shorthand
//   avatar: {
//     width: '64px',
//     height: '64px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     borderWidth: '3px',
//     borderStyle: 'solid',
//     borderColor: `${COLORS.accent}30`,
//     transition: 'all 0.4s ease',
//   },
//   avatarHover: {
//     borderColor: COLORS.accent,
//     boxShadow: `0 0 30px rgba(201, 169, 110, 0.3)`,
//     transform: 'scale(1.05)',
//   },
//   statusDot: {
//     position: 'absolute',
//     bottom: '2px',
//     right: '2px',
//     width: '14px',
//     height: '14px',
//     borderRadius: '50%',
//     backgroundColor: '#22C55E',
//     borderWidth: '2px',
//     borderStyle: 'solid',
//     borderColor: COLORS.primary,
//     animation: 'pulse 2s infinite',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.textWhite,
//     margin: 0,
//     marginBottom: SPACING[1],
//     transition: 'color 0.3s ease',
//   },
//   nameHover: {
//     color: COLORS.accent,
//   },
//   details: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: 'rgba(255,255,255,0.5)',
//     margin: 0,
//   },
//   detailsGrid: {
//     display: 'flex',
//     gap: SPACING[4],
//     flexWrap: 'wrap',
//     padding: `${SPACING[2]} 0`,
//   },
//   detailItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[2],
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   detailIcon: {
//     fontSize: TYPOGRAPHY.fontSize.base,
//   },
//   detailText: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },
//   footer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     gap: SPACING[3],
//     marginTop: 'auto',
//   },
//   matchBadge: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[2],
//     padding: `${SPACING[1]} ${SPACING[3]}`,
//     background: `rgba(201, 169, 110, 0.12)`,
//     borderRadius: BORDER_RADIUS.full,
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     borderColor: `${COLORS.accent}20`,
//   },
//   matchPercentage: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.accent,
//   },
//   matchLevel: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: 'rgba(255,255,255,0.5)',
//     paddingLeft: SPACING[2],
//     borderLeftWidth: '1px',
//     borderLeftStyle: 'solid',
//     borderLeftColor: 'rgba(255,255,255,0.1)',
//   },
//   actionButtons: {
//     display: 'flex',
//     gap: SPACING[2],
//   },
//   viewBtn: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     borderRadius: BORDER_RADIUS.lg,
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     borderColor: `${COLORS.accent}30`,
//     cursor: 'pointer',
//     textDecoration: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[1],
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.accent,
//     transition: 'all 0.3s ease',
//     background: 'transparent',
//   },
//   viewBtnHover: {
//     borderColor: COLORS.accent,
//     background: `rgba(201, 169, 110, 0.1)`,
//     transform: 'translateX(4px)',
//     boxShadow: `0 4px 15px rgba(201, 169, 110, 0.2)`,
//   },
//   matchBtn: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     borderRadius: BORDER_RADIUS.lg,
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textWhite,
//     background: COLORS.secondary,
//     transition: 'all 0.3s ease',
//     boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
//   },
//   matchBtnHover: {
//     transform: 'translateY(-2px) scale(1.02)',
//     boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
//   },
//   cardBorder: {
//     position: 'absolute',
//     bottom: 0,
//     left: '50%',
//     transform: 'translateX(-50%)',
//     width: '40px',
//     height: '3px',
//     borderRadius: BORDER_RADIUS.full,
//     background: `rgba(139, 30, 63, 0.3)`,
//     transition: 'all 0.4s ease',
//   },
//   cardBorderHover: {
//     width: '80px',
//     background: COLORS.accent,
//     boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
//   },
// };












// src/components/ai-match/MatchCard.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import MatchDetailsModal from './MatchDetailsModal';

export default function MatchCard({ profile }) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Use avatar instead of profile picture for privacy
  const getAvatarUrl = (gender) => {
    if (gender?.toLowerCase() === 'female') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmK1zI-O5t55MuIQsbggPX1COZ3rcdwqkUcUWN0DhXw&s=10';
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT872-NZ6cbftxpfmL1holrOEaJBC3A4khv_mO7QdxoAA&s=10';
  };

  const avatarUrl = getAvatarUrl(profile.gender);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...styles.card,
          ...(isHovered && styles.cardHover),
        }}
      >
        {/* Header with Avatar */}
        <div style={styles.header}>
          <div style={styles.avatarWrapper}>
            <img
              src={avatarUrl} // ✅ Using avatar instead of profile picture
              alt={profile.first_name}
              style={{
                ...styles.avatar,
                ...(isHovered && styles.avatarHover),
              }}
            />
            <div style={styles.statusDot}></div>
          </div>
          <div style={styles.userInfo}>
            <h3 style={{
              ...styles.name,
              ...(isHovered && styles.nameHover),
            }}>
              {profile.first_name} {profile.last_name}
            </h3>
            <p style={styles.details}>{profile.age} years • {profile.city || 'Location not specified'}</p>
          </div>
        </div>

        {/* Professional Details */}
        <div style={styles.detailsGrid}>
          {profile.profession && (
            <div style={styles.detailItem}>
              <span style={styles.detailIcon}>💼</span>
              <span style={styles.detailText}>{profile.profession}</span>
            </div>
          )}
          {profile.education && (
            <div style={styles.detailItem}>
              <span style={styles.detailIcon}>🎓</span>
              <span style={styles.detailText}>{profile.education}</span>
            </div>
          )}
        </div>

        {/* Match Badge & Actions */}
        <div style={styles.footer}>
          <div style={styles.matchBadge}>
            <span style={styles.matchPercentage}>{profile.matchPercentage}%</span>
            <span style={styles.matchLevel}>{profile.matchLevel}</span>
          </div>
          <div style={styles.actionButtons}>
            <Link 
              href={`/profile-details/${profile.user_id}?matchPercentage=${profile.matchPercentage}&matchCategory=${profile.matchLevel}&source=ai-match`} 
              style={{
                ...styles.viewBtn,
                ...(isHovered && styles.viewBtnHover),
              }}
            >
              View Profile →
            </Link>
            <button 
              onClick={() => setShowModal(true)}
              style={{
                ...styles.matchBtn,
                ...(isHovered && styles.matchBtnHover),
              }}
            >
              AI Match Details
            </button>
          </div>
        </div>

        {/* Decorative Border */}
        <div style={{
          ...styles.cardBorder,
          ...(isHovered && styles.cardBorderHover),
        }}></div>
      </motion.div>
      <MatchDetailsModal profile={profile} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

const styles = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[6],
    backdropFilter: 'blur(10px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    background: `rgba(201, 169, 110, 0.06)`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[4],
  },
  avatarWrapper: {
    position: 'relative',
    flexShrink: 0,
  },
  // ✅ Avatar with gold border
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
    transition: 'all 0.4s ease',
  },
  avatarHover: {
    borderColor: COLORS.accent,
    boxShadow: `0 0 30px rgba(201, 169, 110, 0.3)`,
    transform: 'scale(1.05)',
  },
  statusDot: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.primary,
    animation: 'pulse 2s infinite',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
    marginBottom: SPACING[1],
    transition: 'color 0.3s ease',
  },
  nameHover: {
    color: COLORS.accent,
  },
  details: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  detailsGrid: {
    display: 'flex',
    gap: SPACING[4],
    flexWrap: 'wrap',
    padding: `${SPACING[2]} 0`,
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  detailIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  detailText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING[3],
    marginTop: 'auto',
  },
  matchBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[1]} ${SPACING[3]}`,
    background: `rgba(201, 169, 110, 0.12)`,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
  },
  matchPercentage: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },
  matchLevel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    paddingLeft: SPACING[2],
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'rgba(255,255,255,0.1)',
  },
  actionButtons: {
    display: 'flex',
    gap: SPACING[2],
  },
  viewBtn: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.accent,
    transition: 'all 0.3s ease',
    background: 'transparent',
  },
  viewBtnHover: {
    borderColor: COLORS.accent,
    background: `rgba(201, 169, 110, 0.1)`,
    transform: 'translateX(4px)',
    boxShadow: `0 4px 15px rgba(201, 169, 110, 0.2)`,
  },
  matchBtn: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
    background: COLORS.secondary,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
  },
  matchBtnHover: {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
  },
  cardBorder: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '3px',
    borderRadius: BORDER_RADIUS.full,
    background: `rgba(139, 30, 63, 0.3)`,
    transition: 'all 0.4s ease',
  },
  cardBorderHover: {
    width: '80px',
    background: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },
};