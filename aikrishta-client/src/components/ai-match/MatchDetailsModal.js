// import { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, TRANSITION } from '../../constants/theme';
// import { X } from 'lucide-react';

// const getExplanation = (key, score) => {
//   switch (key) {
//     case 'age':
//       if (score === 100) return "✔ Candidate age lies within your preferred age range.";
//       if (score >= 80) return "✔ Candidate age is slightly outside your preferred range.";
//       if (score >= 50) return "✔ Candidate age moderately differs from your preferred range.";
//       return "✖ Candidate age is far outside your preferred range.";
//     case 'religion':
//       return score === 100 ? "✔ Same religion." : "✖ Different religion.";
//     case 'education':
//       if (score === 100) return "✔ Exact education match.";
//       if (score >= 70) return "✔ Similar education level.";
//       return "✖ Education differs significantly.";
//     case 'profession':
//       if (score === 100) return "✔ Exact profession match.";
//       if (score >= 70) return "✔ Related profession.";
//       return "✖ Different profession.";
//     case 'city':
//       return score === 100 ? "✔ Same city." : "✖ Different city.";
//     case 'country':
//       return score === 100 ? "✔ Same country." : "✖ Different country.";
//     case 'maritalStatus':
//       return score === 100 ? "✔ Exact marital status match." : "✖ Different marital status.";
//     case 'caste':
//       return score === 100 ? "✔ Same caste." : "✖ Different caste.";
//     case 'motherTongue':
//       return score === 100 ? "✔ Same mother tongue." : "✖ Different mother tongue.";
//     case 'height':
//       if (score === 100) return "✔ Height difference is very small.";
//       if (score >= 60) return "✔ Height difference is moderate.";
//       return "✖ Height difference is significant.";
//     case 'distance':
//       if (score === 100) return "✔ Same city.";
//       if (score >= 50) return "✔ Same country.";
//       return "✖ Different country.";
//     case 'verification':
//       if (score === 100) return "✔ Candidate profile has been verified.";
//       if (score >= 50) return "✔ Candidate profile verification is pending.";
//       return "✖ Candidate profile is not verified.";
//     case 'profileCompletion':
//       if (score >= 80) return "✔ Candidate profile is mostly complete.";
//       return "✖ Candidate profile is incomplete.";
//     case 'recentActivity':
//       if (score >= 90) return "✔ Candidate was active recently.";
//       if (score >= 70) return "✔ Candidate was active within a month.";
//       return "✖ Candidate has been inactive for a while.";
//     case 'financialStatus':
//       return score === 100 ? "✔ Financial status is similar." : "✖ Financial status differs.";
//     case 'socialStatus':
//       return score === 100 ? "✔ Social background closely matches." : "✖ Social background differs.";
//     default:
//       return "";
//   }
// };

// const getOverallSummary = (score) => {
//   if (score >= 90) return "This is a premium-level match. Your preferences and values align exceptionally well with the candidate.";
//   if (score >= 75) return "This is a strong match. There is great compatibility across most of your key preferences.";
//   if (score >= 60) return "This is a good match. There is significant alignment, though there may be minor differences to consider.";
//   if (score >= 40) return "This is an average match. Some preferences align, but there are notable differences.";
//   return "This is a low match. Your profiles show minimal alignment in core areas.";
// };

// export default function MatchDetailsModal({ profile, onClose, isOpen }) {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') onClose();
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   if (!isOpen || !profile) return null;

//   const breakdown = profile.matchBreakdown || {};
//   const criteria = [
//     { name: 'Age', key: 'age' },
//     { name: 'Education', key: 'education' },
//     { name: 'Profession', key: 'profession' },
//     { name: 'City', key: 'city' },
//     { name: 'Country', key: 'country' },
//     { name: 'Religion', key: 'religion' },
//     { name: 'Marital Status', key: 'maritalStatus' },
//     { name: 'Caste', key: 'caste' },
//     { name: 'Mother Tongue', key: 'motherTongue' },
//     { name: 'Height', key: 'height' },
//     { name: 'Distance', key: 'distance' },
//     { name: 'Verification', key: 'verification' },
//     { name: 'Profile Completion', key: 'profileCompletion' },
//     { name: 'Recent Activity', key: 'recentActivity' },
//     { name: 'Financial Status', key: 'financialStatus' },
//     { name: 'Social Status', key: 'socialStatus' },
//   ];

//   return (
//     <AnimatePresence>
//         {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000,
//             padding: SPACING[4],
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               background: COLORS.white,
//               borderRadius: BORDER_RADIUS.lg,
//               padding: SPACING[8],
//               width: '100%',
//               maxWidth: '500px',
//               maxHeight: '90vh',
//               overflowY: 'auto',
//               boxShadow: SHADOWS.lg,
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING[6] }}>
//               <h2 style={{ fontSize: TYPOGRAPHY.fontSize['2xl'], color: COLORS.textDark }}>Match Breakdown</h2>
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onClose();
//                 }}
//                 style={{ background: 'none', border: 'none', cursor: 'pointer', padding: SPACING[1], display: 'flex' }}
//               >
//                 <X style={{ pointerEvents: 'none' }} />
//               </button>
//             </div>

//             {/* Overall Match Summary */}
//             <div style={{ marginBottom: SPACING[8], padding: SPACING[4], background: COLORS.goldLight, borderRadius: BORDER_RADIUS.md }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING[2] }}>
//                 <span style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.textDark }}>Overall Match</span>
//                 <span style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.gold }}>{profile.matchPercentage}%</span>
//               </div>
//               <p style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, margin: '0 0 10px 0' }}>
//                   {getOverallSummary(profile.matchPercentage)}
//               </p>
//               <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
//                   Category: {profile.matchLevel}
//               </div>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
//               {criteria.map((c) => (
//                 <div key={c.key}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING[1] }}>
//                     <span style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray }}>{c.name}</span>
//                     <span style={{ fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.bold }}>{breakdown[c.key] || 0}%</span>
//                   </div>
//                   <div style={{ height: '8px', background: COLORS.borderLight, borderRadius: BORDER_RADIUS.full, overflow: 'hidden', marginBottom: SPACING[1] }}>
//                     <motion.div
//                       key={`criteria-${c.key}-${breakdown[c.key]}`}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${breakdown[c.key] || 0}%` }}
//                       transition={{ duration: TRANSITION.base }}
//                       style={{ height: '100%', background: COLORS.primary, borderRadius: BORDER_RADIUS.full }}
//                     />
//                   </div>
//                   <p style={{ fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.textGray, margin: 0 }}>
//                       {getExplanation(c.key, breakdown[c.key] || 0)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//         )}
//     </AnimatePresence>
//   );
// }


























// src/components/ai-match/MatchDetailsModal.js
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, TRANSITION } from '../../constants/theme';
import { X } from 'lucide-react';

const getExplanation = (key, score) => {
  switch (key) {
    case 'age':
      if (score === 100) return "✔ Candidate age lies within your preferred age range.";
      if (score >= 80) return "✔ Candidate age is slightly outside your preferred range.";
      if (score >= 50) return "✔ Candidate age moderately differs from your preferred range.";
      return "✖ Candidate age is far outside your preferred range.";
    case 'religion':
      return score === 100 ? "✔ Same religion." : "✖ Different religion.";
    case 'education':
      if (score === 100) return "✔ Exact education match.";
      if (score >= 70) return "✔ Similar education level.";
      return "✖ Education differs significantly.";
    case 'profession':
      if (score === 100) return "✔ Exact profession match.";
      if (score >= 70) return "✔ Related profession.";
      return "✖ Different profession.";
    case 'city':
      return score === 100 ? "✔ Same city." : "✖ Different city.";
    case 'country':
      return score === 100 ? "✔ Same country." : "✖ Different country.";
    case 'maritalStatus':
      return score === 100 ? "✔ Exact marital status match." : "✖ Different marital status.";
    case 'caste':
      return score === 100 ? "✔ Same caste." : "✖ Different caste.";
    case 'motherTongue':
      return score === 100 ? "✔ Same mother tongue." : "✖ Different mother tongue.";
    case 'height':
      if (score === 100) return "✔ Height difference is very small.";
      if (score >= 60) return "✔ Height difference is moderate.";
      return "✖ Height difference is significant.";
    case 'distance':
      if (score === 100) return "✔ Same city.";
      if (score >= 50) return "✔ Same country.";
      return "✖ Different country.";
    case 'verification':
      if (score === 100) return "✔ Candidate profile has been verified.";
      if (score >= 50) return "✔ Candidate profile verification is pending.";
      return "✖ Candidate profile is not verified.";
    case 'profileCompletion':
      if (score >= 80) return "✔ Candidate profile is mostly complete.";
      return "✖ Candidate profile is incomplete.";
    case 'recentActivity':
      if (score >= 90) return "✔ Candidate was active recently.";
      if (score >= 70) return "✔ Candidate was active within a month.";
      return "✖ Candidate has been inactive for a while.";
    case 'financialStatus':
      return score === 100 ? "✔ Financial status is similar." : "✖ Financial status differs.";
    case 'socialStatus':
      return score === 100 ? "✔ Social background closely matches." : "✖ Social background differs.";
    default:
      return "";
  }
};

const getOverallSummary = (score) => {
  if (score >= 90) return "This is a premium-level match. Your preferences and values align exceptionally well with the candidate.";
  if (score >= 75) return "This is a strong match. There is great compatibility across most of your key preferences.";
  if (score >= 60) return "This is a good match. There is significant alignment, though there may be minor differences to consider.";
  if (score >= 40) return "This is an average match. Some preferences align, but there are notable differences.";
  return "This is a low match. Your profiles show minimal alignment in core areas.";
};

export default function MatchDetailsModal({ profile, onClose, isOpen }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !profile) return null;

  const breakdown = profile.matchBreakdown || {};
  const criteria = [
    { name: 'Age', key: 'age' },
    { name: 'Education', key: 'education' },
    { name: 'Profession', key: 'profession' },
    { name: 'City', key: 'city' },
    { name: 'Country', key: 'country' },
    { name: 'Religion', key: 'religion' },
    { name: 'Marital Status', key: 'maritalStatus' },
    { name: 'Caste', key: 'caste' },
    { name: 'Mother Tongue', key: 'motherTongue' },
    { name: 'Height', key: 'height' },
    { name: 'Distance', key: 'distance' },
    { name: 'Verification', key: 'verification' },
    { name: 'Profile Completion', key: 'profileCompletion' },
    { name: 'Recent Activity', key: 'recentActivity' },
    { name: 'Financial Status', key: 'financialStatus' },
    { name: 'Social Status', key: 'socialStatus' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={styles.overlay}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={styles.modal}
          >
            {/* Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                <span style={styles.titleIcon}>🤖</span>
                Match Breakdown
              </h2>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                style={styles.closeBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Overall Match Summary */}
            <div style={styles.summaryBox}>
              <div style={styles.summaryHeader}>
                <span style={styles.summaryLabel}>Overall Match</span>
                <span style={styles.summaryScore}>{profile.matchPercentage}%</span>
              </div>
              <p style={styles.summaryText}>
                {getOverallSummary(profile.matchPercentage)}
              </p>
              <div style={styles.summaryCategory}>
                Category: <span style={styles.categoryValue}>{profile.matchLevel}</span>
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div style={styles.criteriaContainer}>
              {criteria.map((c, index) => (
                <motion.div 
                  key={c.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  style={styles.criteriaItem}
                >
                  <div style={styles.criteriaHeader}>
                    <span style={styles.criteriaName}>{c.name}</span>
                    <span style={styles.criteriaScore}>{breakdown[c.key] || 0}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${breakdown[c.key] || 0}%` }}
                      transition={{ duration: 0.8, delay: index * 0.03 }}
                      style={{
                        ...styles.progressFill,
                        background: (breakdown[c.key] || 0) >= 70 
                          ? `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`
                          : (breakdown[c.key] || 0) >= 40 
                            ? COLORS.secondary
                            : COLORS.secondaryDark,
                      }}
                    />
                  </div>
                  <p style={styles.explanationText}>
                    {getExplanation(c.key, breakdown[c.key] || 0)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: SPACING[4],
  },
  modal: {
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    width: '100%',
    maxWidth: '550px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[6],
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  titleIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    borderRadius: BORDER_RADIUS.full,
    transition: 'all 0.3s ease',
    width: '36px',
    height: '36px',
  },
  summaryBox: {
    marginBottom: SPACING[8],
    padding: SPACING[4],
    background: `rgba(201, 169, 110, 0.08)`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid ${COLORS.accent}20`,
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[2],
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
  },
  summaryScore: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },
  summaryText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 10px 0',
    lineHeight: 1.6,
  },
  summaryCategory: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.5)',
  },
  categoryValue: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  criteriaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
  },
  criteriaItem: {
    padding: SPACING[3],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
  },
  criteriaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[1],
  },
  criteriaName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  criteriaScore: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
  },
  progressBar: {
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING[1],
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
    transition: 'width 0.8s ease',
  },
  explanationText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    lineHeight: 1.4,
  },
};

// Add keyframe animation
if (typeof window !== 'undefined') {
  const pulseAnimation = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = pulseAnimation;
  document.head.appendChild(styleSheet);
}