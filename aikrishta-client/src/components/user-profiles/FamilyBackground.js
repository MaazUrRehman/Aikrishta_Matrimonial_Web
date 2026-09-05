// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';
// import './styles.css';

// export default function FamilyBackground({ data }) {
//   if (!data) {
//     return <InfoCard title="Family Background" data={null} />;
//   }

//   const fields = [
//     { label: 'Father Name', value: data.father_name },
//     { label: 'Mother Name', value: data.mother_name },
//     { label: 'Father Profession', value: data.father_profession },
//     { label: 'Mother Profession', value: data.mother_profession },
//     { label: 'Brothers', value: data.brothers_count },
//     { label: 'Brothers Married', value: data.brothers_married },
//     { label: 'Sisters', value: data.sisters_count },
//     { label: 'Sisters Married', value: data.sisters_married },
//     { label: 'Social Status', value: data.social_status },
//     { label: 'Family Residence', value: data.family_residence },
//     { label: 'Financial Status', value: data.financial_status },
//   ];

//   return <InfoCard title="Family Background" fields={fields} />;
// }

// function InfoCard({ title, fields }) {
//   if (!fields || fields.length === 0) {
//     return (
//       <div style={styles.card}>
//         <h3 style={styles.title}>{title}</h3>
//         <p style={styles.empty}>No information available</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.card}>
//       <h3 style={styles.title}>{title}</h3>
//       <div className="info-grid" style={styles.grid}>
//         {fields.map((field, index) => (
//           field.value && (
//             <div key={index} style={styles.field}>
//               <label style={styles.label}>{field.label}</label>
//               <p style={styles.value}>{field.value}</p>
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     padding: SPACING[6],
//     boxShadow: COLORS.shadow,
//   },
//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize.xl,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     margin: 0,
//     marginBottom: SPACING[4],
//     paddingBottom: SPACING[3],
//     borderBottom: `2px solid ${COLORS.borderLight}`,
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[3],
//   },
//   field: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },
//   label: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textGray,
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//   },
//   value: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textDark,
//     margin: 0,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },
//   empty: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     textAlign: 'center',
//     padding: SPACING[4],
//   },
// };










// src/components/profile-detail/FamilyBackground.js
'use client';

import InfoCard from './InfoCard';

export default function FamilyBackground({ data }) {
  if (!data) {
    return <InfoCard title="Family Background" fields={[]} />;
  }

  const fields = [
    { label: 'Father Name', value: data.father_name },
    { label: 'Mother Name', value: data.mother_name },
    { label: 'Father Profession', value: data.father_profession },
    { label: 'Mother Profession', value: data.mother_profession },
    { label: 'Brothers', value: data.brothers_count },
    { label: 'Brothers Married', value: data.brothers_married },
    { label: 'Sisters', value: data.sisters_count },
    { label: 'Sisters Married', value: data.sisters_married },
    { label: 'Social Status', value: data.social_status },
    { label: 'Family Residence', value: data.family_residence },
    { label: 'Financial Status', value: data.financial_status },
  ];

  return <InfoCard title="Family Background" fields={fields} />;
}