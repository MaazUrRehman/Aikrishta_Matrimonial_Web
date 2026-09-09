// // src/app/admin/users/components/UserBasicInfoModal.js
// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

// export default function UserBasicInfoModal({ isOpen, onClose, data, userId }) {
//   if (!isOpen) return null;

//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Basic Information</h2>
//           <button onClick={onClose} style={styles.closeBtn}>✕</button>
//         </div>
//         <div style={styles.content}>
//           {data ? (
//             <div style={styles.infoGrid}>
//               <div style={styles.infoItem}>
//                 <span style={styles.label}>Full Name</span>
//                 <span style={styles.value}>{data.fullName || 'N/A'}</span>
//               </div>
//               <div style={styles.infoItem}>
//                 <span style={styles.label}>Email</span>
//                 <span style={styles.value}>{data.email || 'N/A'}</span>
//               </div>
//               <div style={styles.infoItem}>
//                 <span style={styles.label}>Phone</span>
//                 <span style={styles.value}>{data.phone || 'N/A'}</span>
//               </div>
//               <div style={styles.infoItem}>
//                 <span style={styles.label}>Role</span>
//                 <span style={styles.value}>{data.role || 'N/A'}</span>
//               </div>
//               <div style={styles.infoItem}>
//                 <span style={styles.label}>Joined Date</span>
//                 <span style={styles.value}>
//                   {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <p style={styles.noData}>No basic information found.</p>
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
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[8],
//     maxWidth: '600px',
//     width: '90%',
//     maxHeight: '80vh',
//     overflow: 'auto',
//     boxShadow: SHADOWS.xl,
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING[6],
//   },
//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     margin: 0,
//   },
//   closeBtn: {
//     background: 'none',
//     border: 'none',
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     cursor: 'pointer',
//     color: COLORS.textGray,
//   },
//   content: {
//     padding: SPACING[2],
//   },
//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[4],
//   },
//   infoItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },
//   label: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },
//   value: {
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textDark,
//   },
//   noData: {
//     textAlign: 'center',
//     color: COLORS.textGray,
//     padding: SPACING[4],
//   },
// };



















// src/app/admin/users/components/UserBasicInfoModal.js
'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function UserBasicInfoModal({ isOpen, onClose, data, userId }) {
  if (!isOpen) return null;

  const hasData = data && typeof data === 'object' && Object.keys(data).length > 0;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="responsive-modal"
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.icon}>📋</span>
            <h2 style={styles.title}>Basic Information</h2>
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
            <div className="responsive-info-grid" style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Full Name</span>
                <span style={styles.value}>{data.fullName || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{data.email || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Phone</span>
                <span style={styles.value}>{data.phone || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Role</span>
                <span style={styles.value}>{data.role || 'N/A'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Joined Date</span>
                <span style={styles.value}>
                  {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          ) : (
            <div style={styles.noDataContainer}>
              <div style={styles.noDataIcon}>📭</div>
              <p style={styles.noData}>No basic information found.</p>
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
    backgroundColor: `rgba(26, 42, 74, 0.85)`, backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
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
    padding: SPACING[2],
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[4],
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
    padding: SPACING[8],
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