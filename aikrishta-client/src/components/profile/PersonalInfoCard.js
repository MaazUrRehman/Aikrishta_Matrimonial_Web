// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

// export default function PersonalInfoCard({ data }) {
//   if (!data) return null;

//   const fields = [
//     { label: 'Religion', value: data.religion },
//     { label: 'Caste', value: data.caste },
//     { label: 'Height', value: data.height ? `${data.height}'` : '-' },
//     { label: 'Age', value: data.age },
//     { label: 'Gender', value: data.gender },
//     { label: 'Marital Status', value: data.marital_status },
//     { label: 'Mother Tongue', value: data.mother_tongue },
//   ];

//   return (
//     <div style={styles.container}>
      
//       <div style={styles.grid}>
//         {fields.map((field, index) => (
//           field.value && field.value !== '-' && (
//             <div key={index} style={styles.item}>
//               <span style={styles.label}>{field.label}</span>
//               <span style={styles.value}>{field.value}</span>
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: SPACING[4],
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.primary,
//     marginBottom: SPACING[3],
//     paddingBottom: SPACING[2],
//     borderBottom: `2px solid ${COLORS.secondary}`,
//   },

//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//     gap: SPACING[2],
//   },

//   item: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[0.5],
//     padding: SPACING[2],
//     backgroundColor: '#FFF8FA',
//     borderRadius: BORDER_RADIUS.base,
//   },

//   label: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//   },

//   value: {
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textDark,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },
// };









// src/components/profile/PersonalInfoCard.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function PersonalInfoCard({ data }) {
  if (!data) return null;

  const fields = [
    { label: 'Religion', value: data.religion },
    { label: 'Caste', value: data.caste },
    { label: 'Height', value: data.height ? `${data.height}'` : '-' },
    { label: 'Age', value: data.age },
    { label: 'Gender', value: data.gender },
    { label: 'Marital Status', value: data.marital_status },
    { label: 'Mother Tongue', value: data.mother_tongue },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {fields.map((field, index) => (
          field.value && field.value !== '-' && (
            <div key={index} style={styles.item}>
              <span style={styles.label}>{field.label}</span>
              <span style={styles.value}>{field.value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: SPACING[3],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SPACING[1],
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[0.5],
    padding: SPACING[2],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: `${COLORS.accent}20`,
      backgroundColor: 'rgba(255,255,255,0.04)',
    },
  },

  icon: {
    fontSize: TYPOGRAPHY.fontSize.base,
    marginBottom: SPACING[0.5],
  },

  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },

  value: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
};