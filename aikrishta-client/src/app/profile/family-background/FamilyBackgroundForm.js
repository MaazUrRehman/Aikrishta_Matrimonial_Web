// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   defaultValues,
//   familyBackgroundSchema,
//   getFamilyBackground,
//   saveFamilyBackground,
// } from './familyBackground';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function FamilyBackgroundForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState(defaultValues);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   /*
//   |--------------------------------------------------------------------------
//   | Load Existing Data
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     loadFamilyBackground();
//   }, []);

//   const loadFamilyBackground = async () => {
//     try {
//       const response = await getFamilyBackground();

//       if (response?.data) {
//         setFormData({
//           father_name: response.data.father_name || '',
//           mother_name: response.data.mother_name || '',
//           father_profession: response.data.father_profession || '',
//           mother_profession: response.data.mother_profession || '',
//           brothers_count: response.data.brothers_count || '',
//           brothers_married: response.data.brothers_married || '',
//           sisters_count: response.data.sisters_count || '',
//           sisters_married: response.data.sisters_married || '',
//           social_status: response.data.social_status || '',
//           family_residence: response.data.family_residence || '',
//           financial_status: response.data.financial_status || '',
//         });
//       }
//     } catch (error) {
//       // Ignore 404
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Handle Change
//   |--------------------------------------------------------------------------
//   */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     setError('');
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Submit Handler - Common Function
//   |--------------------------------------------------------------------------
//   */

//   const submitForm = async (redirectTo) => {
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Convert number fields before validation
//       const dataToValidate = {
//         ...formData,
//         brothers_count: formData.brothers_count ? parseInt(formData.brothers_count) : undefined,
//         brothers_married: formData.brothers_married ? parseInt(formData.brothers_married) : undefined,
//         sisters_count: formData.sisters_count ? parseInt(formData.sisters_count) : undefined,
//         sisters_married: formData.sisters_married ? parseInt(formData.sisters_married) : undefined,
//       };

//       // Validate with Zod
//       familyBackgroundSchema.parse(dataToValidate);

//       // Send numbers in payload
//       const payloadToSend = {
//         ...formData,
//         brothers_count: formData.brothers_count ? parseInt(formData.brothers_count) : 0,
//         brothers_married: formData.brothers_married ? parseInt(formData.brothers_married) : 0,
//         sisters_count: formData.sisters_count ? parseInt(formData.sisters_count) : 0,
//         sisters_married: formData.sisters_married ? parseInt(formData.sisters_married) : 0,
//       };

//       await saveFamilyBackground(payloadToSend);

//       setSuccess('Family background saved successfully.');

//       // ✅ Redirect based on which button was clicked
//       setTimeout(() => {
//         router.push(redirectTo);
//       }, 700);
      
//     } catch (err) {
//       if (err?.issues?.length) {
//         setError(err.issues[0].message);
//       } else {
//         setError(err.message || 'Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Handle Save (Redirect to Profile)
//   |--------------------------------------------------------------------------
//   */

//   const handleSave = (e) => {
//     e.preventDefault();
//     submitForm('/profile');
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Handle Continue (Redirect to Next Form)
//   |--------------------------------------------------------------------------
//   */

//   const handleContinue = (e) => {
//     e.preventDefault();
//     submitForm('/profile/partner-preference');
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Loading
//   |--------------------------------------------------------------------------
//   */

//   if (pageLoading) {
//     return (
//       <div style={styles.loadingContainer}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <span style={styles.logo}>👨‍👩‍👧‍👦</span>

//           <h1 style={styles.title}>
//             Family Background
//           </h1>

//           <p style={styles.subtitle}>
//             Step 5 of 7
//           </p>
//         </div>

//         {error && (
//           <div style={styles.error}>
//             {error}
//           </div>
//         )}

//         {success && (
//           <div style={styles.success}>
//             {success}
//           </div>
//         )}

//         <form style={styles.form}>
//           {/* Father Name */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Father's Name <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="father_name"
//               placeholder="Enter father's name"
//               style={styles.input}
//               value={formData.father_name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Mother Name */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Mother's Name <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="mother_name"
//               placeholder="Enter mother's name"
//               style={styles.input}
//               value={formData.mother_name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Father Profession */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Father's Profession <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="father_profession"
//               placeholder="Enter father's profession"
//               style={styles.input}
//               value={formData.father_profession}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Mother Profession */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Mother's Profession <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="mother_profession"
//               placeholder="Enter mother's profession"
//               style={styles.input}
//               value={formData.mother_profession}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Siblings Section */}
//           <div style={styles.sectionDivider}>
//             <span style={styles.sectionTitle}>Siblings Information</span>
//           </div>

//           {/* Brothers Count */}
//           <div style={styles.row}>
//             <div style={styles.rowItem}>
//               <label style={styles.label}>
//                 Total Brothers <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="number"
//                 name="brothers_count"
//                 placeholder="0"
//                 style={styles.input}
//                 value={formData.brothers_count}
//                 onChange={handleChange}
//                 required
//                 min="0"
//               />
//             </div>

//             <div style={styles.rowItem}>
//               <label style={styles.label}>
//                 Married Brothers <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="number"
//                 name="brothers_married"
//                 placeholder="0"
//                 style={styles.input}
//                 value={formData.brothers_married}
//                 onChange={handleChange}
//                 required
//                 min="0"
//               />
//             </div>
//           </div>

//           {/* Sisters Count */}
//           <div style={styles.row}>
//             <div style={styles.rowItem}>
//               <label style={styles.label}>
//                 Total Sisters <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="number"
//                 name="sisters_count"
//                 placeholder="0"
//                 style={styles.input}
//                 value={formData.sisters_count}
//                 onChange={handleChange}
//                 required
//                 min="0"
//               />
//             </div>

//             <div style={styles.rowItem}>
//               <label style={styles.label}>
//                 Married Sisters <span style={styles.required}>*</span>
//               </label>
//               <input
//                 type="number"
//                 name="sisters_married"
//                 placeholder="0"
//                 style={styles.input}
//                 value={formData.sisters_married}
//                 onChange={handleChange}
//                 required
//                 min="0"
//               />
//             </div>
//           </div>

//           {/* Social Status */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Social Status <span style={styles.required}>*</span>
//             </label>
//             <select
//               name="social_status"
//               style={styles.select}
//               value={formData.social_status}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select social status</option>
//               <option value="Upper Class">Upper Class</option>
//               <option value="Upper Middle Class">Upper Middle Class</option>
//               <option value="Middle Class">Middle Class</option>
//               <option value="Lower Middle Class">Lower Middle Class</option>
//               <option value="Working Class">Working Class</option>
//             </select>
//           </div>

//           {/* Family Residence */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Family Residence <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="family_residence"
//               placeholder="Enter family residence address"
//               style={styles.input}
//               value={formData.family_residence}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Financial Status */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Financial Status <span style={styles.required}>*</span>
//             </label>
//             <select
//               name="financial_status"
//               style={styles.select}
//               value={formData.financial_status}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select financial status</option>
//               <option value="Affluent">Affluent</option>
//               <option value="Upper Middle">Upper Middle</option>
//               <option value="Middle">Middle</option>
//               <option value="Lower Middle">Lower Middle</option>
//               <option value="Modest">Modest</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div style={styles.buttonContainer}>
//             <button
//               type="button"
//               style={styles.btnSecondary}
//               onClick={() => router.back()}
//             >
//               Previous
//             </button>

//             {/* ✅ Save button - Profile page par le jaye */}
//             <button
//               type="button"
//               style={styles.btnTert}
//               onClick={handleSave}
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save'}
//             </button>

//             {/* ✅ Continue button - Next form par le jaye */}
//             <button
//               type="button"
//               style={styles.btnPrimary}
//               onClick={handleContinue}
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Continue'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Styles
// |--------------------------------------------------------------------------
// */

// const styles = {
//   loadingContainer: {
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: COLORS.gradients.hero,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     color: COLORS.primary,
//   },

//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: SPACING[6],
//     background: COLORS.gradients.hero,
//   },

//   card: {
//     width: '100%',
//     maxWidth: '650px',
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[10],
//     boxShadow: SHADOWS.xl,
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   header: {
//     textAlign: 'center',
//     marginBottom: SPACING[8],
//   },

//   logo: {
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     display: 'block',
//     marginBottom: SPACING[2],
//   },

//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     marginBottom: SPACING[1],
//   },

//   subtitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//   },

//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[4],
//   },

//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },

//   row: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[4],
//   },

//   rowItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },

//   sectionDivider: {
//     borderTop: `1px solid ${COLORS.border}`,
//     paddingTop: SPACING[4],
//     marginTop: SPACING[2],
//   },

//   sectionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.primary,
//   },

//   label: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//   },

//   required: {
//     color: '#DC2626',
//   },

//   input: {
//     padding: `${SPACING[3]} ${SPACING[4]}`,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     transition: 'all 0.3s ease',
//     outline: 'none',
//     color: COLORS.textDark,
//     width: '100%',
//     '&:focus': {
//       borderColor: COLORS.secondary,
//       boxShadow: `0 0 0 3px ${COLORS.secondary}25`,
//     },
//   },

//   select: {
//     padding: `${SPACING[3]} ${SPACING[4]}`,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     transition: 'all 0.3s ease',
//     outline: 'none',
//     color: COLORS.textDark,
//     width: '100%',
//     backgroundColor: COLORS.white,
//     cursor: 'pointer',
//     '&:focus': {
//       borderColor: COLORS.secondary,
//       boxShadow: `0 0 0 3px ${COLORS.secondary}25`,
//     },
//   },

//   hint: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textLight,
//   },

//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: SPACING[6],
//     gap: SPACING[3],
//   },

//   btnPrimary: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     border: 'none',
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     boxShadow: SHADOWS.pink,
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       opacity: 0.9,
//       transform: 'translateY(-2px)',
//     },
//     '&:disabled': {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//       transform: 'none',
//     },
//   },

//   btnSecondary: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     color: COLORS.primaryLight,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     border: `1px solid ${COLORS.border}`,
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       backgroundColor: COLORS.backgroundLight,
//       borderColor: COLORS.primary,
//     },
//   },

//   btnTert: {
//     flex: 1,
//     backgroundColor: COLORS.primaryLight,
//     color: COLORS.white,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     border: `1px solid ${COLORS.border}`,
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       backgroundColor: COLORS.primary,
//       borderColor: COLORS.primary,
//     },
//     '&:disabled': {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//     },
//   },

//   error: {
//     backgroundColor: '#FEE2E2',
//     color: '#DC2626',
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     marginBottom: SPACING[4],
//     textAlign: 'center',
//   },

//   success: {
//     backgroundColor: '#DCFCE7',
//     color: '#16A34A',
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     marginBottom: SPACING[4],
//     textAlign: 'center',
//   },
// };




























// src/components/profile/family-background/FamilyBackgroundForm.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  defaultValues,
  familyBackgroundSchema,
  getFamilyBackground,
  saveFamilyBackground,
} from './familyBackground';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function FamilyBackgroundForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadFamilyBackground();
  }, []);

  const loadFamilyBackground = async () => {
    try {
      const response = await getFamilyBackground();

      if (response?.data) {
        setFormData({
          father_name: response.data.father_name || '',
          mother_name: response.data.mother_name || '',
          father_profession: response.data.father_profession || '',
          mother_profession: response.data.mother_profession || '',
          brothers_count: response.data.brothers_count || '',
          brothers_married: response.data.brothers_married || '',
          sisters_count: response.data.sisters_count || '',
          sisters_married: response.data.sisters_married || '',
          social_status: response.data.social_status || '',
          family_residence: response.data.family_residence || '',
          financial_status: response.data.financial_status || '',
        });
      }
    } catch (error) {
      // Ignore 404
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError('');
  };

  const submitForm = async (redirectTo) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const dataToValidate = {
        ...formData,
        brothers_count: formData.brothers_count ? parseInt(formData.brothers_count) : undefined,
        brothers_married: formData.brothers_married ? parseInt(formData.brothers_married) : undefined,
        sisters_count: formData.sisters_count ? parseInt(formData.sisters_count) : undefined,
        sisters_married: formData.sisters_married ? parseInt(formData.sisters_married) : undefined,
      };

      familyBackgroundSchema.parse(dataToValidate);

      const payloadToSend = {
        ...formData,
        brothers_count: formData.brothers_count ? parseInt(formData.brothers_count) : 0,
        brothers_married: formData.brothers_married ? parseInt(formData.brothers_married) : 0,
        sisters_count: formData.sisters_count ? parseInt(formData.sisters_count) : 0,
        sisters_married: formData.sisters_married ? parseInt(formData.sisters_married) : 0,
      };

      await saveFamilyBackground(payloadToSend);

      setSuccess('Family background saved successfully.');

      setTimeout(() => {
        router.push(redirectTo);
      }, 700);
      
    } catch (err) {
      if (err?.issues?.length) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    submitForm('/profile');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    submitForm('/profile/partner-preference');
  };

  if (pageLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Family <span style={styles.highlight}>Background</span>
          </h1>
          <p style={styles.subtitle}>Step 5 of 7 • Tell us about your family</p>
          <div style={styles.stepIndicator}>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDot}></span>
            <span style={styles.stepDot}></span>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            <span style={styles.successIcon}>✅</span>
            {success}
          </div>
        )}

        <form style={styles.form}>
          <div className="responsive-form-grid" style={styles.fieldsGrid}>
            {/* Father Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👨</span>
                Father&apos;s Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="father_name"
                placeholder="Enter father's name"
                style={styles.input}
                value={formData.father_name}
                onChange={handleChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Mother Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👩</span>
                Mother&apos;s Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="mother_name"
                placeholder="Enter mother's name"
                style={styles.input}
                value={formData.mother_name}
                onChange={handleChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Father Profession */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💼</span>
                Father&apos;s Profession <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="father_profession"
                placeholder="Enter father's profession"
                style={styles.input}
                value={formData.father_profession}
                onChange={handleChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Mother Profession */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💼</span>
                Mother&apos;s Profession <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="mother_profession"
                placeholder="Enter mother's profession"
                style={styles.input}
                value={formData.mother_profession}
                onChange={handleChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Siblings Section */}
          <div style={styles.sectionDivider}>
            <span style={styles.sectionTitle}> Siblings Information</span>
          </div>

          <div className="responsive-form-grid" style={styles.fieldsGrid}>
            {/* Brothers Count */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👦</span>
                Total Brothers <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="brothers_count"
                placeholder="0"
                style={styles.input}
                value={formData.brothers_count}
                onChange={handleChange}
                required
                min="0"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Brothers Married */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💍</span>
                Married Brothers <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="brothers_married"
                placeholder="0"
                style={styles.input}
                value={formData.brothers_married}
                onChange={handleChange}
                required
                min="0"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Sisters Count */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👧</span>
                Total Sisters <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="sisters_count"
                placeholder="0"
                style={styles.input}
                value={formData.sisters_count}
                onChange={handleChange}
                required
                min="0"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Sisters Married */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💍</span>
                Married Sisters <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="sisters_married"
                placeholder="0"
                style={styles.input}
                value={formData.sisters_married}
                onChange={handleChange}
                required
                min="0"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div className="responsive-form-grid" style={styles.fieldsGrid}>
            {/* Social Status - Fixed Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👥</span>
                Social Status <span style={styles.required}>*</span>
              </label>
              <div style={styles.selectWrapper}>
                <select
                  name="social_status"
                  style={styles.select}
                  value={formData.social_status}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <option value="">Select social status</option>
                  <option value="Upper Class">Upper Class</option>
                  <option value="Upper Middle Class">Upper Middle Class</option>
                  <option value="Middle Class">Middle Class</option>
                  <option value="Lower Middle Class">Lower Middle Class</option>
                  <option value="Working Class">Working Class</option>
                </select>
                <span style={styles.selectArrow}>▼</span>
              </div>
            </div>

            {/* Family Residence */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🏠</span>
                Family Residence <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="family_residence"
                placeholder="Enter family residence address"
                style={styles.input}
                value={formData.family_residence}
                onChange={handleChange}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Financial Status - Fixed Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💰</span>
                Financial Status <span style={styles.required}>*</span>
              </label>
              <div style={styles.selectWrapper}>
                <select
                  name="financial_status"
                  style={styles.select}
                  value={formData.financial_status}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <option value="">Select financial status</option>
                  <option value="Affluent">Affluent</option>
                  <option value="Upper Middle">Upper Middle</option>
                  <option value="Middle">Middle</option>
                  <option value="Lower Middle">Lower Middle</option>
                  <option value="Modest">Modest</option>
                </select>
                <span style={styles.selectArrow}>▼</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={styles.btnSecondary}
              onClick={() => router.back()}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              ← Previous
            </button>

            <button
              type="button"
              style={styles.btnTert}
              onClick={handleSave}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Saving...' : '💾 Save'}
            </button>

            <button
              type="button"
              style={styles.btnPrimary}
              onClick={handleContinue}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
              }}
            >
              {loading ? 'Saving...' : 'Continue →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[4],
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  spinner: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: `4px solid rgba(255,255,255,0.05)`,
    borderTop: `4px solid ${COLORS.accent}`,
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING[6],
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  card: {
    width: '100%',
    maxWidth: '750px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[10],
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.06)`,
    boxShadow: SHADOWS.xl,
  },
  header: {
    textAlign: 'center',
    marginBottom: SPACING[8],
  },
  logo: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    display: 'block',
    marginBottom: SPACING[2],
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
  },
  highlight: {
    color: COLORS.accent,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING[1],
    marginTop: SPACING[3],
  },
  stepDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  stepDotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 10px rgba(201, 169, 110, 0.3)`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
  },
  fieldsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[4],
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },
  labelIcon: {
    visibility: 'hidden',
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  required: {
    color: COLORS.secondary,
  },
  input: {
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    outline: 'none',
    color: COLORS.textWhite,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  // ✅ Fixed - Blue background for dropdowns
  selectWrapper: {
    position: 'relative',
    width: '100%',
  },
  select: {
    padding: `${SPACING[3]} ${SPACING[4]}`,
    paddingRight: '40px',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    outline: 'none',
    color: COLORS.textWhite,
    width: '100%',
    backgroundColor: 'rgba(26, 42, 74, 0.9)', // ✅ Blue background
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    '& option': {
      backgroundColor: COLORS.primaryDark,
      color: COLORS.textWhite,
      padding: SPACING[2],
    },
    '&:hover': {
      borderColor: `${COLORS.accent}40`,
    },
  },
  selectArrow: {
    visibility: 'hidden',
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.xs,
    pointerEvents: 'none',
  },
  sectionDivider: {
    borderTop: `1px solid rgba(255,255,255,0.06)`,
    paddingTop: SPACING[4],
    marginTop: SPACING[2],
    marginBottom: SPACING[2],
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: SPACING[6],
    gap: SPACING[3],
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-3px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.5)`,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: `1px solid rgba(255,255,255,0.06)`,
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  },
  btnTert: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    border: `1px solid rgba(255,255,255,0.06)`,
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: SPACING[4],
    textAlign: 'center',
    border: `1px solid rgba(239, 68, 68, 0.2)`,
  },
  errorIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  success: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22C55E',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: SPACING[4],
    textAlign: 'center',
    border: `1px solid rgba(34, 197, 94, 0.2)`,
  },
  successIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
};

// Add keyframe animations
if (typeof document !== 'undefined') {
  const animations = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}