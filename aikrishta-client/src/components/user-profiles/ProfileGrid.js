// 'use client';

// import ProfileCard from './ProfileCard';
// import { SPACING } from '@/constants/theme';

// export default function ProfileGrid({ profiles }) {
//   if (!profiles || profiles.length === 0) {
//     return null;
//   }

//   return (
//     <div style={styles.grid}>
//       {profiles.map((profile) => (
//         <ProfileCard key={profile._id || profile.id || Math.random()} profile={profile} />
//       ))}
//     </div>
//   );
// }

// const styles = {
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: SPACING[6],
//     marginBottom: SPACING[8],
//   },
// };

// // Add media queries using a style tag or CSS module
// const mediaStyles = `
//   @media (max-width: 1280px) {
//     .profile-grid {
//       grid-template-columns: repeat(3, 1fr);
//     }
//   }
//   @media (max-width: 1024px) {
//     .profile-grid {
//       grid-template-columns: repeat(2, 1fr);
//     }
//   }
//   @media (max-width: 640px) {
//     .profile-grid {
//       grid-template-columns: 1fr;
//     }
//   }
// `;













// src/components/profiles/ProfileGrid.js
'use client';

import ProfileCard from './ProfileCard';
import { SPACING } from '@/constants/theme';

export default function ProfileGrid({ profiles }) {
  if (!profiles || profiles.length === 0) {
    return null;
  }

  return (
    <div style={styles.grid}>
      {profiles.map((profile) => (
        <ProfileCard key={profile._id || profile.id || Math.random()} profile={profile} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: SPACING[6],
    marginBottom: SPACING[8],
  },
};

// Add media queries using style tag
if (typeof window !== 'undefined') {
  const mediaStyles = `
    @media (max-width: 1280px) {
      .profile-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
    @media (max-width: 1024px) {
      .profile-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 640px) {
      .profile-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaStyles;
  document.head.appendChild(styleSheet);
}