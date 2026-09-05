// 'use client';

// import { useState } from 'react';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

// const getPreferenceFilters = (partnerPreference = {}, personalInfo  = null) => [
//   {
//     key: 'preferredAge',
//     label: 'Preferred Age',
//     value: partnerPreference?.preferred_age_min && partnerPreference?.preferred_age_max
//       ? `${partnerPreference.preferred_age_min} - ${partnerPreference.preferred_age_max} years`
//       : '',
//   },
//   { key: 'preferredEducation', label: 'Preferred Education', value: partnerPreference?.preferred_education },
//   { key: 'preferredProfession', label: 'Preferred Profession', value: partnerPreference?.preferred_profession },
//   { key: 'preferredCaste', label: 'Preferred Caste', value: partnerPreference?.preferred_caste },
//   { key: 'preferredMaritalStatus', label: 'Preferred Marital Status', value: partnerPreference?.preferred_marital_status },
//   { key: 'preferredCity', label: 'Preferred City', value: partnerPreference?.preferred_city },
//   { key: 'preferredCountry', label: 'Preferred Country', value: partnerPreference?.preferred_country },

//   { key: 'sameReligion', label: 'Same Religion', value: personalInfo?.religion },
//   { key: 'sameCommunity', label: 'Same Community', value: personalInfo?.caste },
// ];

// export default function ProfileFilters({ filters, onFilterChange, partnerPreference, personalInfo }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const preferenceFilters = getPreferenceFilters(partnerPreference, personalInfo);
//   const hasActiveFilters = Object.values(filters).some(Boolean);

//   const handleClearAll = () => {
//     Object.keys(filters).forEach((key) => onFilterChange(key, false));
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div style={styles.headerLeft}>
//           <span style={styles.filterIcon}>⚙️</span>
//           <span style={styles.filterTitle}>Partner Preferences</span>
//           {hasActiveFilters && <span style={styles.activeBadge}>Active</span>}
//         </div>
//         <div style={styles.headerRight}>
//           {hasActiveFilters && <button type="button" onClick={handleClearAll} style={styles.clearAllBtn}>Clear All</button>}
//           <button type="button" onClick={() => setIsExpanded(!isExpanded)} style={styles.toggleBtn}>
//             {isExpanded ? 'Hide Filters ▲' : 'Show Filters ▼'}
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div style={styles.filterGrid}>
//           {preferenceFilters.map(({ key, label, value }) => (
//             <label key={key} style={styles.filterOption}>
//               <input
//                 type="checkbox"
//                 checked={Boolean(filters[key])}
//                 disabled={!value}
//                 onChange={(event) => onFilterChange(key, event.target.checked)}
//                 style={styles.checkbox}
//               />
//               <span>
//                 <span style={styles.filterLabel}>{label}</span>
//                 <span style={styles.filterValue}>{value || 'Not set'}</span>
//               </span>
//             </label>
//           ))}
//         </div>

//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     boxShadow: COLORS.shadow,
//     padding: SPACING[4],
//     marginTop: SPACING[4],
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     gap: SPACING[3],
//   },
//   headerLeft: { display: 'flex', alignItems: 'center', gap: SPACING[2] },
//   filterIcon: { fontSize: TYPOGRAPHY.fontSize.lg },
//   filterTitle: { fontFamily: TYPOGRAPHY.fontFamily.body, fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.textDark },
//   activeBadge: { fontSize: TYPOGRAPHY.fontSize.xs, fontWeight: TYPOGRAPHY.fontWeight.medium, color: COLORS.secondary, backgroundColor: COLORS.secondaryLightest, padding: `${SPACING[0.5]} ${SPACING[2]}`, borderRadius: BORDER_RADIUS.full },
//   headerRight: { display: 'flex', alignItems: 'center', gap: SPACING[3] },
//   clearAllBtn: { background: 'none', border: 'none', color: COLORS.secondary, fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.medium, cursor: 'pointer', fontFamily: TYPOGRAPHY.fontFamily.body, padding: `${SPACING[1]} ${SPACING[2]}` },
//   toggleBtn: { background: 'none', border: 'none', color: COLORS.textGray, fontSize: TYPOGRAPHY.fontSize.sm, cursor: 'pointer', fontFamily: TYPOGRAPHY.fontFamily.body, padding: `${SPACING[1]} ${SPACING[2]}` },
//   filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: SPACING[3], marginTop: SPACING[4], paddingTop: SPACING[4], borderTop: `1px solid ${COLORS.borderLight}` },
//   filterOption: { alignItems: 'flex-start', border: `1px solid ${COLORS.borderLight}`, borderRadius: BORDER_RADIUS.base, cursor: 'pointer', display: 'flex', gap: SPACING[2], padding: SPACING[3] },
//   checkbox: { marginTop: '3px' },
//   filterLabel: { color: COLORS.textDark, display: 'block', fontFamily: TYPOGRAPHY.fontFamily.body, fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.medium },
//   filterValue: { color: COLORS.textGray, display: 'block', fontFamily: TYPOGRAPHY.fontFamily.body, fontSize: TYPOGRAPHY.fontSize.xs, marginTop: SPACING[0.5] },
// };










// src/components/profiles/ProfileFilters.js
'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

const getPreferenceFilters = (partnerPreference = {}, personalInfo = null) => [
  {
    key: 'preferredAge',
    label: 'Preferred Age',
    value: partnerPreference?.preferred_age_min && partnerPreference?.preferred_age_max
      ? `${partnerPreference.preferred_age_min} - ${partnerPreference.preferred_age_max} years`
      : '',
    icon: '🎂',
  },
  { key: 'preferredEducation', label: 'Preferred Education', value: partnerPreference?.preferred_education, icon: '🎓' },
  { key: 'preferredProfession', label: 'Preferred Profession', value: partnerPreference?.preferred_profession, icon: '💼' },
  { key: 'preferredCaste', label: 'Preferred Caste', value: partnerPreference?.preferred_caste, icon: '👥' },
  { key: 'preferredMaritalStatus', label: 'Preferred Marital Status', value: partnerPreference?.preferred_marital_status, icon: '💍' },
  { key: 'preferredCity', label: 'Preferred City', value: partnerPreference?.preferred_city, icon: '📍' },
  { key: 'preferredCountry', label: 'Preferred Country', value: partnerPreference?.preferred_country, icon: '🌍' },
  { key: 'sameReligion', label: 'Same Religion', value: personalInfo?.religion, icon: '🕌' },
  { key: 'sameCommunity', label: 'Same Community', value: personalInfo?.caste, icon: '🤝' },
];

export default function ProfileFilters({ filters, onFilterChange, partnerPreference, personalInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const preferenceFilters = getPreferenceFilters(partnerPreference, personalInfo);
  const hasActiveFilters = Object.values(filters).some(Boolean);

  const handleClearAll = () => {
    Object.keys(filters).forEach((key) => onFilterChange(key, false));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.filterIcon}>⚙️</span>
          <span style={styles.filterTitle}>Partner Preferences</span>
          {hasActiveFilters && <span style={styles.activeBadge}>{Object.values(filters).filter(Boolean).length} Active</span>}
        </div>
        <div style={styles.headerRight}>
          {hasActiveFilters && (
            <button type="button" onClick={handleClearAll} style={styles.clearAllBtn}>
              Clear All
            </button>
          )}
          <button type="button" onClick={() => setIsExpanded(!isExpanded)} style={styles.toggleBtn}>
            {isExpanded ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div style={styles.filterGrid}>
          {preferenceFilters.map(({ key, label, value, icon }) => {
            const isActive = Boolean(filters[key]);
            const isDisabled = !value;
            return (
              <label 
                key={key} 
                style={{
                  ...styles.filterOption,
                  ...(isActive && styles.filterOptionActive),
                  ...(isDisabled && styles.filterOptionDisabled),
                }}
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  disabled={isDisabled}
                  onChange={(event) => onFilterChange(key, event.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.filterIconSmall}>{icon}</span>
                <span>
                  <span style={styles.filterLabel}>{label}</span>
                  <span style={styles.filterValue}>{value || 'Not set'}</span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    backdropFilter: 'blur(10px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    padding: SPACING[4],
    marginTop: SPACING[4],
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING[3],
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  filterIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  filterTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
  },
  activeBadge: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.15)`,
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
  },
  clearAllBtn: {
    background: 'none',
    border: 'none',
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    padding: `${SPACING[1]} ${SPACING[2]}`,
    transition: 'all 0.3s ease',
    ':hover': {
      color: COLORS.accent,
    },
  },
  toggleBtn: {
    background: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    padding: `${SPACING[1]} ${SPACING[3]}`,
    borderRadius: BORDER_RADIUS.full,
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: COLORS.textWhite,
    },
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: SPACING[3],
    marginTop: SPACING[4],
    paddingTop: SPACING[4],
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  filterOption: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: SPACING[3],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  filterOptionActive: {
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },
  filterOptionDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: COLORS.secondary,
    cursor: 'pointer',
    flexShrink: 0,
  },
  filterIconSmall: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  filterLabel: {
    color: 'rgba(255,255,255,0.7)',
    display: 'block',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  filterValue: {
    color: 'rgba(255,255,255,0.3)',
    display: 'block',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: SPACING[0.5],
  },
};