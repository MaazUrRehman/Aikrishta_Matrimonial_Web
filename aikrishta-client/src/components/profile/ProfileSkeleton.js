// 'use client';

// import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';

// export default function ProfileSkeleton() {
//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div style={styles.avatar} />
//         <div style={styles.headerInfo}>
//           <div style={styles.nameSkeleton} />
//           <div style={styles.detailSkeleton} />
//           <div style={styles.tagSkeleton} />
//         </div>
//       </div>

//       <div style={styles.section}>
//         <div style={styles.sectionTitle} />
//         <div style={styles.grid}>
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} style={styles.field}>
//               <div style={styles.labelSkeleton} />
//               <div style={styles.valueSkeleton} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={styles.section}>
//         <div style={styles.sectionTitle} />
//         <div style={styles.grid}>
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} style={styles.field}>
//               <div style={styles.labelSkeleton} />
//               <div style={styles.valueSkeleton} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={styles.section}>
//         <div style={styles.sectionTitle} />
//         <div style={styles.grid}>
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} style={styles.field}>
//               <div style={styles.labelSkeleton} />
//               <div style={styles.valueSkeleton} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[6],
//   },

//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[6],
//     padding: SPACING[4],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.lg,
//   },

//   avatar: {
//     width: '120px',
//     height: '120px',
//     borderRadius: '50%',
//     backgroundColor: '#E5E7EB',
//     animation: 'pulse 1.5s ease-in-out infinite',
//     flexShrink: 0,
//   },

//   headerInfo: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[2],
//   },

//   nameSkeleton: {
//     width: '60%',
//     height: '28px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.base,
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },

//   detailSkeleton: {
//     width: '40%',
//     height: '18px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.base,
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },

//   tagSkeleton: {
//     width: '30%',
//     height: '24px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.full,
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },

//   section: {
//     padding: SPACING[4],
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   sectionTitle: {
//     width: '40%',
//     height: '24px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.base,
//     marginBottom: SPACING[3],
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },

//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//     gap: SPACING[3],
//   },

//   field: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[0.5],
//   },

//   labelSkeleton: {
//     width: '60%',
//     height: '14px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.base,
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },

//   valueSkeleton: {
//     width: '80%',
//     height: '20px',
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.base,
//     animation: 'pulse 1.5s ease-in-out infinite',
//   },
// };

// // Add keyframes for pulse animation
// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = `
//     @keyframes pulse {
//       0%, 100% { opacity: 0.6; }
//       50% { opacity: 0.3; }
//     }
//   `;
//   document.head.appendChild(style);
// }












// src/components/profile/ProfileSkeleton.js
'use client';

import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function ProfileSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar} />
        <div style={styles.headerInfo}>
          <div style={styles.nameSkeleton} />
          <div style={styles.detailSkeleton} />
          <div style={styles.tagsSkeleton}>
            <div style={styles.tagSkeleton} />
            <div style={styles.tagSkeleton} />
            <div style={styles.tagSkeleton} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle} />
        <div style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.field}>
              <div style={styles.labelSkeleton} />
              <div style={styles.valueSkeleton} />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle} />
        <div style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.field}>
              <div style={styles.labelSkeleton} />
              <div style={styles.valueSkeleton} />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle} />
        <div style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.field}>
              <div style={styles.labelSkeleton} />
              <div style={styles.valueSkeleton} />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle} />
        <div style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.field}>
              <div style={styles.labelSkeleton} />
              <div style={styles.valueSkeleton} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[6],
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[6],
    padding: SPACING[6],
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
  },

  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, rgba(201, 169, 110, 0.15), rgba(139, 30, 63, 0.15))`,
    animation: 'pulse 1.5s ease-in-out infinite',
    flexShrink: 0,
    border: `3px solid rgba(201, 169, 110, 0.1)`,
  },

  headerInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },

  nameSkeleton: {
    width: '60%',
    height: '32px',
    background: `linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.lg,
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  detailSkeleton: {
    width: '40%',
    height: '20px',
    background: `linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.lg,
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  tagsSkeleton: {
    display: 'flex',
    gap: SPACING[2],
    flexWrap: 'wrap',
    marginTop: SPACING[1],
  },

  tagSkeleton: {
    width: '80px',
    height: '28px',
    background: `linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.full,
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  section: {
    padding: SPACING[6],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(5px)',
  },

  sectionTitle: {
    width: '40%',
    height: '24px',
    background: `linear-gradient(90deg, rgba(201, 169, 110, 0.15) 25%, rgba(201, 169, 110, 0.25) 50%, rgba(201, 169, 110, 0.15) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING[3],
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SPACING[3],
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[0.5],
  },

  labelSkeleton: {
    width: '60%',
    height: '14px',
    background: `linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.base,
    animation: 'shimmer 1.5s ease-in-out infinite',
  },

  valueSkeleton: {
    width: '80%',
    height: '20px',
    background: `linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%)`,
    backgroundSize: '200% 100%',
    borderRadius: BORDER_RADIUS.base,
    animation: 'shimmer 1.5s ease-in-out infinite',
  },
};

// Add keyframes for shimmer animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 0.3; }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(style);
}