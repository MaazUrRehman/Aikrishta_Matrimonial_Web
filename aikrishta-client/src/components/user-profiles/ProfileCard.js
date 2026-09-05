// 'use client';

// import Link from 'next/link';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

// export default function ProfileCard({ profile }) {
//   const {
//     _id,
//     first_name,
//     last_name,
//     age,
//     city,
//     country,
//     profession,
//     education,
//     gender,
//   } = profile;

//   const fullName = `${first_name || ''} ${last_name || ''}`.trim();
//   const location = [city, country].filter(Boolean).join(', ');
  
//   const avatarUrl = gender?.toLowerCase() === 'female' 
//     ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmK1zI-O5t55MuIQsbggPX1COZ3rcdwqkUcUWN0DhXw&s=10' 
//     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT872-NZ6cbftxpfmL1holrOEaJBC3A4khv_mO7QdxoAA&s=10';

//   return (
//     <div style={styles.card}>
//       <div style={styles.imageWrapper}>
//         <img
//           src={avatarUrl}
//           alt={fullName || 'Profile'}
//           style={styles.image}
//         />
//         <div style={styles.statusBadge}>
//           <span style={styles.statusDot}></span>
//           Active
//         </div>
//         {gender && (
//           <div style={styles.genderBadge}>
//             {gender === 'female' ? '♀' : '♂'}
//           </div>
//         )}
//       </div>
      
//       <div style={styles.content}>
//         <h3 style={styles.name}>{fullName || 'Anonymous'}</h3>
//         {age && <p style={styles.age}>🎂 {age} years</p>}
//         {location && <p style={styles.location}>📍 {location}</p>}
//         {profession && <p style={styles.profession}>💼 {profession}</p>}
//         {education && <p style={styles.education}>🎓 {education}</p>}
        
//         <Link href={`/profile-details/${_id}`} style={styles.viewBtn}>
//           View Profile →
//         </Link>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     overflow: 'hidden',
//     boxShadow: SHADOWS.md,
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     border: `1px solid ${COLORS.borderLight}`,
//     ':hover': {
//       transform: 'translateY(-6px)',
//       boxShadow: SHADOWS.lg,
//       borderColor: COLORS.secondary,
//     },
//   },
//   imageWrapper: {
//     position: 'relative',
//     width: '100%',
//     height: '320px',
//     backgroundColor: COLORS.primaryLightest,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   statusBadge: {
//     position: 'absolute',
//     top: SPACING[3],
//     right: SPACING[3],
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[1],
//     padding: `${SPACING[1]} ${SPACING[3]}`,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textWhite,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//   },
//   statusDot: {
//     width: '6px',
//     height: '6px',
//     borderRadius: '50%',
//     backgroundColor: COLORS.success,
//     display: 'inline-block',
//     animation: 'pulse 2s infinite',
//   },
//   genderBadge: {
//     position: 'absolute',
//     bottom: SPACING[3],
//     left: SPACING[3],
//     width: '32px',
//     height: '32px',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     backdropFilter: 'blur(10px)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: COLORS.textWhite,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//   },
//   content: {
//     padding: SPACING[4],
//   },
//   name: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     margin: 0,
//     marginBottom: SPACING[1],
//   },
//   age: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     margin: 0,
//     marginBottom: SPACING[1],
//   },
//   location: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     margin: 0,
//     marginBottom: SPACING[1],
//   },
//   profession: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     margin: 0,
//     marginBottom: SPACING[0.5],
//   },
//   education: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     margin: 0,
//     marginBottom: SPACING[3],
//   },
//   viewBtn: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     textDecoration: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     transition: 'all 0.3s ease',
//     textAlign: 'center',
//     width: '100%',
//     gap: SPACING[2],
//     ':hover': {
//       opacity: 0.9,
//       transform: 'translateY(-2px)',
//       boxShadow: SHADOWS.pink,
//     },
//   },
// };

// // Add to global CSS
// const pulseAnimation = `
//   @keyframes pulse {
//     0%, 100% {
//       opacity: 1;
//     }
//     50% {
//       opacity: 0.5;
//     }
//   }
// `;






















// src/components/profiles/ProfileCard.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function ProfileCard({ profile }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    _id,
    first_name,
    last_name,
    age,
    city,
    country,
    profession,
    education,
    gender,
  } = profile;

  const fullName = `${first_name || ''} ${last_name || ''}`.trim();
  const location = [city, country].filter(Boolean).join(', ');
  
  // ✅ Avatar instead of profile image for security
  const avatarUrl = gender?.toLowerCase() === 'female' 
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmK1zI-O5t55MuIQsbggPX1COZ3rcdwqkUcUWN0DhXw&s=10' 
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT872-NZ6cbftxpfmL1holrOEaJBC3A4khv_mO7QdxoAA&s=10';

  return (
    <div 
      style={styles.cardWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        ...styles.card,
        ...(isHovered && styles.cardHover),
      }}>
        <div style={styles.imageWrapper}>
          <img
            src={avatarUrl}
            alt={fullName || 'Profile'}
            style={{
              ...styles.image,
              ...(isHovered && styles.imageHover),
            }}
          />
          <div style={styles.statusBadge}>
            <span style={styles.statusDot}></span>
            Active
          </div>
          {gender && (
            <div style={styles.genderBadge}>
              {gender === 'female' ? '♀' : '♂'}
            </div>
          )}
          <div style={styles.ageBadge}>
            {age || 'N/A'}
          </div>
        </div>
        
        <div style={styles.content}>
          <h3 style={{
            ...styles.name,
            ...(isHovered && styles.nameHover),
          }}>
            {fullName || 'Anonymous'}
          </h3>
          {location && (
            <p style={styles.location}>
              <span style={styles.locationIcon}>📍</span>
              {location}
            </p>
          )}
          {profession && (
            <p style={styles.profession}>
              <span style={styles.detailIcon}>💼</span>
              {profession}
            </p>
          )}
          {education && (
            <p style={styles.education}>
              <span style={styles.detailIcon}>🎓</span>
              {education}
            </p>
          )}
          
          <div style={styles.divider}></div>
          
          <div style={styles.cardFooter}>
            <Link href={`/profile-details/${_id}`} style={{
              ...styles.viewBtn,
              ...(isHovered && styles.viewBtnHover),
            }}>
              View Profile →
            </Link>
            <span style={{
              ...styles.footerBorder,
              ...(isHovered && styles.footerBorderHover),
            }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardWrapper: {
    perspective: '1000px',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHover: {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '280px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ✅ Fixed - using separate border properties instead of shorthand
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
  },
  imageHover: {
    transform: 'scale(1.1)',
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
  },
  statusBadge: {
    position: 'absolute',
    top: SPACING[3],
    right: SPACING[3],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[1]} ${SPACING[3]}`,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  genderBadge: {
    position: 'absolute',
    bottom: SPACING[3],
    left: SPACING[3],
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  ageBadge: {
    position: 'absolute',
    bottom: SPACING[3],
    right: SPACING[3],
    padding: `${SPACING[1]} ${SPACING[3]}`,
    backgroundColor: `rgba(201, 169, 110, 0.9)`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    backdropFilter: 'blur(10px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `rgba(201, 169, 110, 0.3)`,
  },
  content: {
    padding: SPACING[4],
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    margin: 0,
    marginBottom: SPACING[2],
    transition: 'color 0.3s ease',
  },
  nameHover: {
    color: COLORS.accent,
  },
  location: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
    marginBottom: SPACING[1],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },
  profession: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
    marginBottom: SPACING[1],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },
  education: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
    marginBottom: SPACING[3],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },
  locationIcon: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  detailIcon: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: SPACING[3],
    marginTop: 'auto',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING[2]} ${SPACING[4]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    textAlign: 'center',
    flex: 1,
    gap: SPACING[2],
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
    border: 'none',
  },
  viewBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
  },
  footerBorder: {
    height: '2px',
    width: '30px',
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    transition: 'all 0.4s ease',
    flexShrink: 0,
  },
  footerBorderHover: {
    width: '60px',
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },
};

// Add to global CSS
if (typeof window !== 'undefined') {
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
  const styleSheet = document.createElement('style');
  styleSheet.textContent = pulseAnimation;
  document.head.appendChild(styleSheet);
}