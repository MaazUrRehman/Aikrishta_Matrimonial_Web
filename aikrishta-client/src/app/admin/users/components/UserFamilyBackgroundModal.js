// // src/app/admin/users/components/UserFamilyBackgroundModal.js
// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

// export default function UserFamilyBackgroundModal({ isOpen, onClose, data, userId }) {
//   if (!isOpen) return null;

//   const hasData = data && typeof data === 'object' && Object.keys(data).length > 0;

//   // Group fields
//   const parentsFields = [
//     { label: "Father's Name", value: data?.father_name },
//     { label: "Father's Profession", value: data?.father_profession },
//     { label: "Mother's Name", value: data?.mother_name },
//     { label: "Mother's Profession", value: data?.mother_profession },
//   ];

//   const siblingsFields = [
//     { label: 'Brothers (Total)', value: data?.brothers_count },
//     { label: 'Brothers (Married)', value: data?.brothers_married },
//     { label: 'Sisters (Total)', value: data?.sisters_count },
//     { label: 'Sisters (Married)', value: data?.sisters_married },
//   ];

//   const familyStatusFields = [
//     { label: 'Social Status', value: data?.social_status },
//     { label: 'Family Residence', value: data?.family_residence },
//     { label: 'Financial Status', value: data?.financial_status },
//   ];

//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <span style={styles.icon}>👨‍👩‍👧‍👦</span>
//             <h2 style={styles.title}>Family Background</h2>
//           </div>
//           <button onClick={onClose} style={styles.closeBtn}>✕</button>
//         </div>

//         <div style={styles.content}>
//           {hasData ? (
//             <>
//               {/* Parents Section */}
//               <div style={styles.section}>
//                 <h3 style={styles.sectionTitle}>👨‍👩‍👦 Parents</h3>
//                 <div style={styles.infoGrid}>
//                   {parentsFields.map((field, index) => (
//                     <div key={index} style={styles.infoItem}>
//                       <span style={styles.label}>{field.label}</span>
//                       <span style={styles.value}>{field.value || 'N/A'}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Siblings Section */}
//               <div style={styles.section}>
//                 <h3 style={styles.sectionTitle}>👫 Siblings</h3>
//                 <div style={styles.infoGrid}>
//                   {siblingsFields.map((field, index) => (
//                     <div key={index} style={styles.infoItem}>
//                       <span style={styles.label}>{field.label}</span>
//                       <span style={styles.value}>{field.value || 'N/A'}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Family Status Section */}
//               <div style={styles.section}>
//                 <h3 style={styles.sectionTitle}>🏠 Family Status</h3>
//                 <div style={styles.infoGrid}>
//                   {familyStatusFields.map((field, index) => (
//                     <div key={index} style={styles.infoItem}>
//                       <span style={styles.label}>{field.label}</span>
//                       <span style={styles.value}>{field.value || 'N/A'}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div style={styles.noDataContainer}>
//               <div style={styles.noDataIcon}>📭</div>
//               <p style={styles.noData}>No family background information found.</p>
//               <p style={styles.noDataSubtext}>User ID: {userId}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     backdropFilter: 'blur(4px)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//     animation: 'fadeIn 0.3s ease',
//   },
//   modal: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[8],
//     maxWidth: '750px',
//     width: '92%',
//     maxHeight: '85vh',
//     overflow: 'auto',
//     boxShadow: SHADOWS.xl,
//     animation: 'slideUp 0.3s ease',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING[6],
//     borderBottom: `2px solid ${COLORS.primary}10`,
//     paddingBottom: SPACING[4],
//   },
//   headerLeft: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[3],
//   },
//   icon: {
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//   },
//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     margin: 0,
//   },
//   closeBtn: {
//     background: COLORS.backgroundLight,
//     border: 'none',
//     fontSize: TYPOGRAPHY.fontSize['xl'],
//     cursor: 'pointer',
//     color: COLORS.textGray,
//     padding: SPACING[2],
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: COLORS.error + '20',
//       color: COLORS.error,
//       transform: 'rotate(90deg)',
//     },
//   },
//   content: {
//     padding: SPACING[1],
//   },
//   section: {
//     marginBottom: SPACING[6],
//     '&:last-child': {
//       marginBottom: 0,
//     },
//   },
//   sectionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     marginBottom: SPACING[3],
//     paddingBottom: SPACING[2],
//     borderBottom: `1px solid ${COLORS.border}`,
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[3],
//   },
//   infoItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//     padding: SPACING[3],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid ${COLORS.border}40`,
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       borderColor: COLORS.primary + '40',
//       boxShadow: SHADOWS.sm,
//     },
//   },
//   label: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     textTransform: 'uppercase',
//     letterSpacing: '0.7px',
//   },
//   value: {
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textDark,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },
//   noDataContainer: {
//     textAlign: 'center',
//     padding: SPACING[12],
//   },
//   noDataIcon: {
//     fontSize: TYPOGRAPHY.fontSize['5xl'],
//     marginBottom: SPACING[4],
//   },
//   noData: {
//     color: COLORS.textGray,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     marginBottom: SPACING[2],
//   },
//   noDataSubtext: {
//     color: COLORS.textGray,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     opacity: 0.7,
//   },
// };

// // Add animations
// if (typeof document !== 'undefined') {
//   const styleSheet = document.createElement('style');
//   styleSheet.textContent = `
//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to { opacity: 1; }
//     }
//     @keyframes slideUp {
//       from { 
//         opacity: 0;
//         transform: translateY(30px) scale(0.98);
//       }
//       to { 
//         opacity: 1;
//         transform: translateY(0) scale(1);
//       }
//     }
//   `;
//   document.head.appendChild(styleSheet);
// }






















// src/app/admin/users/components/UserFamilyBackgroundModal.js
'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function UserFamilyBackgroundModal({ isOpen, onClose, data, userId }) {
  if (!isOpen) return null;

  const hasData = data && typeof data === 'object' && Object.keys(data).length > 0;

  const parentsFields = [
    { label: "Father's Name", value: data?.father_name },
    { label: "Father's Profession", value: data?.father_profession },
    { label: "Mother's Name", value: data?.mother_name },
    { label: "Mother's Profession", value: data?.mother_profession },
  ];

  const siblingsFields = [
    { label: 'Brothers (Total)', value: data?.brothers_count },
    { label: 'Brothers (Married)', value: data?.brothers_married },
    { label: 'Sisters (Total)', value: data?.sisters_count },
    { label: 'Sisters (Married)', value: data?.sisters_married },
  ];

  const familyStatusFields = [
    { label: 'Social Status', value: data?.social_status },
    { label: 'Family Residence', value: data?.family_residence },
    { label: 'Financial Status', value: data?.financial_status },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.icon}>👨‍👩‍👧‍👦</span>
            <h2 style={styles.title}>Family Background</h2>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.color = '#EF4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={styles.content}>
          {hasData ? (
            <>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                  <span style={styles.sectionIcon}>👨‍👩‍👦</span>
                  Parents
                </h3>
                <div style={styles.infoGrid}>
                  {parentsFields.map((field, index) => (
                    <div key={index} style={styles.infoItem}>
                      <span style={styles.label}>{field.label}</span>
                      <span style={styles.value}>{field.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                  <span style={styles.sectionIcon}>👫</span>
                  Siblings
                </h3>
                <div style={styles.infoGrid}>
                  {siblingsFields.map((field, index) => (
                    <div key={index} style={styles.infoItem}>
                      <span style={styles.label}>{field.label}</span>
                      <span style={styles.value}>{field.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                  <span style={styles.sectionIcon}>🏠</span>
                  Family Status
                </h3>
                <div style={styles.infoGrid}>
                  {familyStatusFields.map((field, index) => (
                    <div key={index} style={styles.infoItem}>
                      <span style={styles.label}>{field.label}</span>
                      <span style={styles.value}>{field.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={styles.noDataContainer}>
              <div style={styles.noDataIcon}>📭</div>
              <p style={styles.noData}>No family background information found.</p>
              <p style={styles.noDataSubtext}>User ID: {userId}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(26, 42, 74, 0.85)`,
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    maxWidth: '750px',
    width: '92%',
    maxHeight: '85vh',
    overflow: 'auto',
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
    backdropFilter: 'blur(10px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[6],
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
    paddingBottom: SPACING[4],
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
  },
  icon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid rgba(255,255,255,0.06)`,
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.4)',
    padding: SPACING[2],
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  content: {
    padding: SPACING[1],
  },
  section: {
    marginBottom: SPACING[6],
    '&:last-child': {
      marginBottom: 0,
    },
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    marginBottom: SPACING[3],
    paddingBottom: SPACING[2],
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
  },
  sectionIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[3],
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
    padding: SPACING[3],
    backgroundColor: `rgba(26, 42, 74, 0.5)`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: `${COLORS.accent}20`,
    },
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
  },
  value: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  noDataContainer: {
    textAlign: 'center',
    padding: SPACING[12],
  },
  noDataIcon: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    display: 'block',
    marginBottom: SPACING[4],
  },
  noData: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING[2],
  },
  noDataSubtext: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
};