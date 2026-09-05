// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';
// import './styles.css';

// export default function PersonalInformation({ data }) {
//   if (!data) {
//     return <InfoCard title="Personal Information" data={null} />;
//   }

//   const fields = [
//     { label: 'First Name', value: data.first_name },
//     { label: 'Last Name', value: data.last_name },
//     { label: 'Age', value: data.age },
//     { label: 'Date of Birth', value: data.date_of_birth && new Date(data.date_of_birth).toLocaleDateString() },
//     { label: 'Gender', value: data.gender },
//     { label: 'Religion', value: data.religion },
//     { label: 'Caste', value: data.caste },
//     { label: 'Mother Tongue', value: data.mother_tongue },
//     { label: 'Marital Status', value: data.marital_status },
//     { label: 'Height', value: data.height },
//     { label: 'Weight', value: data.weight },
//     { label: 'Profile Status', value: data.profile_status },
//   ];

//   return <InfoCard title="Personal Information" fields={fields} />;
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



















// src/components/profile-detail/PersonalInformation.js
'use client';

import InfoCard from './InfoCard';

export default function PersonalInformation({ data }) {
  if (!data) {
    return <InfoCard title="Personal Information" fields={[]} />;
  }

  const fields = [
    { label: 'First Name', value: data.first_name },
    { label: 'Last Name', value: data.last_name },
    { label: 'Age', value: data.age },
    { label: 'Date of Birth', value: data.date_of_birth && new Date(data.date_of_birth).toLocaleDateString() },
    { label: 'Gender', value: data.gender },
    { label: 'Religion', value: data.religion },
    { label: 'Caste', value: data.caste },
    { label: 'Mother Tongue', value: data.mother_tongue },
    { label: 'Marital Status', value: data.marital_status },
    { label: 'Height', value: data.height },
    { label: 'Weight', value: data.weight },
    { label: 'Profile Status', value: data.profile_status },
  ];

  return <InfoCard title="Personal Information" fields={fields} />;
}