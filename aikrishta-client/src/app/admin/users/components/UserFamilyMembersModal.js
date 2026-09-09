// // src/app/admin/users/components/UserFamilyMembersModal.js
// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

// export default function UserFamilyMembersModal({ isOpen, onClose, data, userId }) {
//   if (!isOpen) return null;

//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>👨‍👩‍👧‍👦 Family Members</h2>
//           <button onClick={onClose} style={styles.closeBtn}>✕</button>
//         </div>

//         <div style={styles.content}>
//           {data && data.length > 0 ? (
//             <div style={styles.membersList}>
//               {data.map((member, index) => (
//                 <div key={member._id || index} style={styles.memberCard}>
//                   <div style={styles.memberHeader}>
//                     <div>
//                       <span style={styles.memberName}>
//                         {member.first_name} {member.last_name}
//                       </span>
//                       <span style={styles.memberRelation}>{member.relation}</span>
//                     </div>
//                     <span style={styles.memberBadge}>
//                       #{index + 1}
//                     </span>
//                   </div>

//                   <div style={styles.memberDetails}>
//                     <div style={styles.detailRow}>
//                       <span style={styles.detailLabel}>Phone:</span>
//                       <span style={styles.detailValue}>{member.phone || 'N/A'}</span>
//                     </div>
//                     <div style={styles.detailRow}>
//                       <span style={styles.detailLabel}>User ID:</span>
//                       <span style={styles.detailValue}>{member.user_id || 'N/A'}</span>
//                     </div>
//                     <div style={styles.detailRow}>
//                       <span style={styles.detailLabel}>Added:</span>
//                       <span style={styles.detailValue}>
//                         {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div style={styles.emptyState}>
//               <span style={styles.emptyIcon}>👤</span>
//               <p style={styles.emptyText}>No family members found for this user.</p>
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
//     maxWidth: '700px',
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
//     padding: SPACING[2],
//     borderRadius: BORDER_RADIUS.base,
//     '&:hover': {
//       backgroundColor: COLORS.backgroundLight,
//     },
//   },
//   content: {
//     padding: SPACING[2],
//   },
//   membersList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[4],
//   },
//   memberCard: {
//     padding: SPACING[4],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid ${COLORS.borderLight}`,
//   },
//   memberHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING[3],
//   },
//   memberName: {
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//   },
//   memberRelation: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.secondary,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     marginLeft: SPACING[2],
//   },
//   memberBadge: {
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     padding: `${SPACING[1]} ${SPACING[2]}`,
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//   },
//   memberDetails: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },
//   detailRow: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[2],
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },
//   detailLabel: {
//     color: COLORS.textGray,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     minWidth: '70px',
//   },
//   detailValue: {
//     color: COLORS.textDark,
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: SPACING[8],
//   },
//   emptyIcon: {
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     display: 'block',
//     marginBottom: SPACING[4],
//   },
//   emptyText: {
//     color: COLORS.textGray,
//     fontSize: TYPOGRAPHY.fontSize.base,
//   },
// };




















// src/app/admin/users/components/UserFamilyMembersModal.js
'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function UserFamilyMembersModal({ isOpen, onClose, data, userId }) {
  if (!isOpen) return null;

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
            <span style={styles.icon}>👨‍👩‍👧‍👦</span>
            <h2 style={styles.title}>Family Members</h2>
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
          {data && data.length > 0 ? (
            <div style={styles.membersList}>
              {data.map((member, index) => (
                <div key={member._id || index} style={styles.memberCard}>
                  <div style={styles.memberHeader}>
                    <div>
                      <span style={styles.memberName}>
                        {member.first_name} {member.last_name}
                      </span>
                      <span style={styles.memberRelation}>{member.relation}</span>
                    </div>
                    <span style={styles.memberBadge}>
                      #{index + 1}
                    </span>
                  </div>

                  <div style={styles.memberDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Phone:</span>
                      <span style={styles.detailValue}>{member.phone || 'N/A'}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>User ID:</span>
                      <span style={styles.detailValue}>{member.user_id || 'N/A'}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Added:</span>
                      <span style={styles.detailValue}>
                        {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>👤</span>
              <p style={styles.emptyText}>No family members found for this user.</p>
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
    maxWidth: '700px',
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
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
  },
  memberCard: {
    padding: SPACING[4],
    backgroundColor: `rgba(26, 42, 74, 0.5)`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: `${COLORS.accent}20`,
    },
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[3],
  },
  memberName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
  },
  memberRelation: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: SPACING[2],
  },
  memberBadge: {
    backgroundColor: `rgba(201, 169, 110, 0.15)`,
    color: COLORS.accent,
    padding: `${SPACING[1]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    border: `1px solid ${COLORS.accent}20`,
  },
  memberDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    minWidth: '70px',
  },
  detailValue: {
    color: 'rgba(255,255,255,0.7)',
  },
  emptyState: {
    textAlign: 'center',
    padding: SPACING[8],
  },
  emptyIcon: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    display: 'block',
    marginBottom: SPACING[4],
  },
  emptyText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.base,
  },
};