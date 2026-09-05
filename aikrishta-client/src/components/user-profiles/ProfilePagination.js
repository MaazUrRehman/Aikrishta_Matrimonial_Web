// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

// export default function ProfilePagination({ 
//   currentPage, 
//   totalPages, 
//   onPageChange 
// }) {
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }
//     return pages;
//   };

//   if (totalPages <= 1) return null;

//   return (
//     <div style={styles.pagination}>
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         style={{
//           ...styles.pageBtn,
//           ...(currentPage === 1 ? styles.disabled : {}),
//         }}
//       >
//         ‹ Previous
//       </button>

//       {getPageNumbers().map((page, index) => (
//         <button
//           key={index}
//           onClick={() => typeof page === 'number' && onPageChange(page)}
//           style={{
//             ...styles.pageBtn,
//             ...(page === currentPage ? styles.active : {}),
//             ...(page === '...' ? styles.dots : {}),
//           }}
//           disabled={page === '...'}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         style={{
//           ...styles.pageBtn,
//           ...(currentPage === totalPages ? styles.disabled : {}),
//         }}
//       >
//         Next ›
//       </button>
//     </div>
//   );
// }

// const styles = {
//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: SPACING[2],
//     flexWrap: 'wrap',
//     marginTop: SPACING[8],
//     paddingTop: SPACING[6],
//     borderTop: `1px solid ${COLORS.borderLight}`,
//   },
//   pageBtn: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     border: `1px solid ${COLORS.borderLight}`,
//     borderRadius: BORDER_RADIUS.base,
//     backgroundColor: COLORS.white,
//     color: COLORS.textDark,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     ':hover': {
//       backgroundColor: COLORS.primary,
//       color: COLORS.textWhite,
//       borderColor: COLORS.primary,
//     },
//   },
//   active: {
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     borderColor: COLORS.secondary,
//   },
//   disabled: {
//     opacity: 0.5,
//     cursor: 'not-allowed',
//     ':hover': {
//       backgroundColor: COLORS.white,
//       color: COLORS.textDark,
//       borderColor: COLORS.borderLight,
//     },
//   },
//   dots: {
//     border: 'none',
//     cursor: 'default',
//     ':hover': {
//       backgroundColor: COLORS.white,
//       color: COLORS.textDark,
//     },
//   },
// };


















// src/components/profiles/ProfilePagination.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function ProfilePagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...styles.pageBtn,
          ...(currentPage === 1 ? styles.disabled : {}),
        }}
      >
        ‹ Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          style={{
            ...styles.pageBtn,
            ...(page === currentPage ? styles.active : {}),
            ...(page === '...' ? styles.dots : {}),
          }}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.pageBtn,
          ...(currentPage === totalPages ? styles.disabled : {}),
        }}
      >
        Next ›
      </button>
    </div>
  );
}

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[2],
    flexWrap: 'wrap',
    marginTop: SPACING[8],
    paddingTop: SPACING[6],
    borderTop: `1px solid rgba(255,255,255,0.06)`,
  },
  pageBtn: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderColor: COLORS.accent,
      color: COLORS.textWhite,
    },
  },
  active: {
    backgroundColor: COLORS.accent,
    color: COLORS.primary,
    borderColor: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  disabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.04)',
      color: 'rgba(255,255,255,0.6)',
      borderColor: 'rgba(255,255,255,0.06)',
    },
  },
  dots: {
    border: 'none',
    cursor: 'default',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'rgba(255,255,255,0.6)',
    },
  },
};