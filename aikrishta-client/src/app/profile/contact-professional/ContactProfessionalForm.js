

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   defaultValues,
//   contactProfessionalSchema,
//   getContactProfessional,
//   saveContactProfessional,
// } from './contactProfessional';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function ContactProfessionalForm() {
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
//     loadContactProfessional();
//   }, []);

//   const loadContactProfessional = async () => {
//     try {
//       const response = await getContactProfessional();

//       if (response?.data) {
//         setFormData({
//           city: response.data.city || '',
//           country: response.data.country || '',
//           education_level: response.data.education_level || '',
//           occupation: response.data.occupation || '',
//           monthly_income: response.data.monthly_income || '',
//           additional_details: response.data.additional_details || '',
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
//       // Convert monthly_income to number before validation
//       const dataToValidate = {
//         ...formData,
//         monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : undefined,
//       };

//       // Validate with Zod
//       contactProfessionalSchema.parse(dataToValidate);

//       // Send monthly_income as number in payload
//       const payloadToSend = {
//         ...formData,
//         monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : 0,
//       };

//       await saveContactProfessional(payloadToSend);

//       setSuccess('Contact and professional information saved successfully.');

//       // ✅ Redirect based on which button was clicked
//       setTimeout(() => {
//         router.push(redirectTo);
//       }, 500);
      
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
//     submitForm('/profile/family-background');
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
//           <span style={styles.logo}>💼</span>

//           <h1 style={styles.title}>
//             Contact & Professional
//           </h1>

//           <p style={styles.subtitle}>
//             Step 4 of 7
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
//           {/* City */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               City <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="city"
//               placeholder="Enter your city"
//               style={styles.input}
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Country */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Country <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="country"
//               placeholder="Enter your country"
//               style={styles.input}
//               value={formData.country}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Education Level */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Education Level <span style={styles.required}>*</span>
//             </label>
//             <select
//               name="education_level"
//               style={styles.select}
//               value={formData.education_level}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select education level</option>
//               <option value="High School">High School</option>
//               <option value="Bachelor's Degree">Bachelor's Degree</option>
//               <option value="Master's Degree">Master's Degree</option>
//               <option value="PhD">PhD</option>
//               <option value="Doctorate">Doctorate</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Occupation */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Occupation <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="occupation"
//               placeholder="Enter your occupation (e.g., Software Engineer)"
//               style={styles.input}
//               value={formData.occupation}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Monthly Income */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Monthly Income (USD) <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="number"
//               name="monthly_income"
//               placeholder="Enter monthly income in USD"
//               style={styles.input}
//               value={formData.monthly_income}
//               onChange={handleChange}
//               required
//               min="0"
//               step="100"
//             />
//             <span style={styles.hint}>
//               Enter your monthly income in USD (minimum $0)
//             </span>
//           </div>

//           {/* Additional Details */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Additional Details (Optional)
//             </label>
//             <textarea
//               name="additional_details"
//               placeholder="Share any additional details about your profession or contact preferences"
//               style={styles.textarea}
//               value={formData.additional_details}
//               onChange={handleChange}
//               rows="4"
//               maxLength="1000"
//             />
//             <span style={styles.hint}>
//               {formData.additional_details?.length || 0}/1000 characters
//             </span>
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

//   textarea: {
//     padding: `${SPACING[3]} ${SPACING[4]}`,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     transition: 'all 0.3s ease',
//     outline: 'none',
//     color: COLORS.textDark,
//     width: '100%',
//     resize: 'vertical',
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


























// src/components/profile/contact-professional/ContactProfessionalForm.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  defaultValues,
  contactProfessionalSchema,
  getContactProfessional,
  saveContactProfessional,
} from './contactProfessional';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function ContactProfessionalForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadContactProfessional();
  }, []);

  const loadContactProfessional = async () => {
    try {
      const response = await getContactProfessional();

      if (response?.data) {
        setFormData({
          city: response.data.city || '',
          country: response.data.country || '',
          education_level: response.data.education_level || '',
          occupation: response.data.occupation || '',
          monthly_income: response.data.monthly_income || '',
          additional_details: response.data.additional_details || '',
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
        monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : undefined,
      };

      contactProfessionalSchema.parse(dataToValidate);

      const payloadToSend = {
        ...formData,
        monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : 0,
      };

      await saveContactProfessional(payloadToSend);

      setSuccess('Contact and professional information saved successfully.');

      setTimeout(() => {
        router.push(redirectTo);
      }, 500);
      
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
    submitForm('/profile/family-background');
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
            Contact & <span style={styles.highlight}>Professional</span>
          </h1>
          <p style={styles.subtitle}>Step 4 of 7 • Tell us about your professional background</p>
          <div style={styles.stepIndicator}>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDot}></span>
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
            {/* City */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📍</span>
                City <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                style={styles.input}
                value={formData.city}
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

            {/* Country */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🌍</span>
                Country <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter your country"
                style={styles.input}
                value={formData.country}
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

            {/* Education Level - Fixed Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🎓</span>
                Education Level <span style={styles.required}>*</span>
              </label>
              <div style={styles.selectWrapper}>
                <select
                  name="education_level"
                  style={styles.select}
                  value={formData.education_level}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor&apos;s Degree">Bachelor&apos;s Degree</option>
                  <option value="Master&apos;s Degree">Master&apos;s Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Other">Other</option>
                </select>
                <span style={styles.selectArrow}>▼</span>
              </div>
            </div>

            {/* Occupation */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💼</span>
                Occupation <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="e.g., Software Engineer"
                style={styles.input}
                value={formData.occupation}
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

            {/* Monthly Income */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💰</span>
                Monthly Income (USD) <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="monthly_income"
                placeholder="Enter monthly income in USD"
                style={styles.input}
                value={formData.monthly_income}
                onChange={handleChange}
                required
                min="0"
                step="100"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <span style={styles.hint}>Enter your monthly income in USD (minimum $0)</span>
            </div>
          </div>

          {/* Additional Details */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📝</span>
              Additional Details (Optional)
            </label>
            <textarea
              name="additional_details"
              placeholder="Share any additional details about your profession or contact preferences"
              style={styles.textarea}
              value={formData.additional_details}
              onChange={handleChange}
              rows="4"
              maxLength="1000"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <span style={styles.hint}>
              {formData.additional_details?.length || 0}/1000 characters
            </span>
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
  // ✅ Fixed - Blue background for dropdown
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
  textarea: {
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    outline: 'none',
    color: COLORS.textWhite,
    width: '100%',
    resize: 'vertical',
    backgroundColor: 'rgba(255,255,255,0.02)',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  hint: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
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