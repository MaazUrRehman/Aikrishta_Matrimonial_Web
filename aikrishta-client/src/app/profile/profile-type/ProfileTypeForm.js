// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   defaultValues,
//   profileTypeSchema,
//   getProfileType,
//   saveProfileType,
// } from './profileType';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function ProfileTypeForm() {
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
//     loadProfileType();
//   }, []);

//   const loadProfileType = async () => {
//     try {
//       const response = await getProfileType();

//       if (response?.data) {
//         setFormData({
//           profile_for: response.data.profile_for,
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

//   const handleChange = (value) => {
//     setFormData({
//       ...formData,
//       profile_for: value,
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
//       profileTypeSchema.parse(formData);

//       await saveProfileType(formData);

//       setSuccess('Profile type saved successfully.');

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
//   | Handle Continue (Redirect to Next Form based on selection)
//   |--------------------------------------------------------------------------
//   */

//   const handleContinue = (e) => {
//     e.preventDefault();
    
//     // Determine next route based on profile_for selection
//     const nextRoute = formData.profile_for === 'Family Member' 
//       ? '/profile/family-member' 
//       : '/profile/personal-information';
    
//     submitForm(nextRoute);
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
//           <span style={styles.logo}>✦</span>

//           <h1 style={styles.title}>
//             Profile Type
//           </h1>

//           <p style={styles.subtitle}>
//             Step 1 of 7
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
//           <div
//             style={{
//               ...styles.optionCard,
//               ...(formData.profile_for === "Myself"
//                 ? styles.optionCardActive
//                 : {}),
//             }}
//             onClick={() => handleChange("Myself")}
//           >
//             <input
//               type="radio"
//               checked={formData.profile_for === "Myself"}
//               readOnly
//             />

//             <div>
//               <h3 style={styles.optionTitle}>
//                 Myself
//               </h3>

//               <p style={styles.optionDescription}>
//                 I am creating my own matrimonial profile.
//               </p>
//             </div>
//           </div>

//           <div
//             style={{
//               ...styles.optionCard,
//               ...(formData.profile_for === "Family Member"
//                 ? styles.optionCardActive
//                 : {}),
//             }}
//             onClick={() =>
//               handleChange("Family Member")
//             }
//           >
//             <input
//               type="radio"
//               checked={
//                 formData.profile_for ===
//                 "Family Member"
//               }
//               readOnly
//             />

//             <div>
//               <h3 style={styles.optionTitle}>
//                 Family Member
//               </h3>

//               <p style={styles.optionDescription}>
//                 I am creating this profile for a family
//                 member.
//               </p>
//             </div>
//           </div>

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

// const styles = {

//   loadingContainer: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: COLORS.gradients.hero,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     color: COLORS.primary,
//   },

//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: SPACING[6],
//     background: COLORS.gradients.hero,
//   },

//   card: {
//     width: "100%",
//     maxWidth: "650px",
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS["2xl"],
//     padding: SPACING[10],
//     boxShadow: SHADOWS.xl,
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: SPACING[8],
//   },

//   logo: {
//     fontSize: TYPOGRAPHY.fontSize["4xl"],
//   },

//   title: {
//     fontSize: TYPOGRAPHY.fontSize["3xl"],
//     color: COLORS.primary,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     marginTop: SPACING[2],
//   },

//   subtitle: {
//     color: COLORS.textGray,
//     marginTop: SPACING[1],
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: SPACING[4],
//   },

//   optionCard: {
//     border: `2px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.xl,
//     padding: SPACING[5],
//     display: "flex",
//     gap: SPACING[4],
//     cursor: "pointer",
//     transition: "0.3s",
//   },

//   optionCardActive: {
//     border: `2px solid ${COLORS.secondary}`,
//     backgroundColor: "#FFF1F7",
//   },

//   optionTitle: {
//     color: COLORS.primary,
//     marginBottom: SPACING[1],
//     fontSize: TYPOGRAPHY.fontSize.lg,
//   },

//   optionDescription: {
//     color: COLORS.textGray,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },

//   buttonContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: SPACING[6],
//     gap: SPACING[3],
//   },

//   btnPrimary: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     border: "none",
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     cursor: "pointer",
//     boxShadow: SHADOWS.pink,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
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
//     color: COLORS.primary,
//     border: `1px solid ${COLORS.border}`,
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     cursor: "pointer",
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
//     backgroundColor: "#FEE2E2",
//     color: "#DC2626",
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     marginBottom: SPACING[4],
//     textAlign: "center",
//   },

//   success: {
//     backgroundColor: "#DCFCE7",
//     color: "#16A34A",
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     marginBottom: SPACING[4],
//     textAlign: "center",
//   },

// };

























// src/components/profile/profile-type/ProfileTypeForm.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  defaultValues,
  profileTypeSchema,
  getProfileType,
  saveProfileType,
} from './profileType';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function ProfileTypeForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfileType();
  }, []);

  const loadProfileType = async () => {
    try {
      const response = await getProfileType();

      if (response?.data) {
        setFormData({
          profile_for: response.data.profile_for,
        });
      }
    } catch (error) {
      // Ignore 404
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (value) => {
    setFormData({
      ...formData,
      profile_for: value,
    });

    setError('');
  };

  const submitForm = async (redirectTo) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      profileTypeSchema.parse(formData);

      await saveProfileType(formData);

      setSuccess('Profile type saved successfully.');

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
    const nextRoute = formData.profile_for === 'Family Member' 
      ? '/profile/family-member' 
      : '/profile/personal-information';
    submitForm(nextRoute);
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
          <span style={styles.logo}>✦</span>
          <h1 style={styles.title}>
            Profile <span style={styles.highlight}>Type</span>
          </h1>
          <p style={styles.subtitle}>Step 1 of 7 • Choose who you&apos;re creating this profile for</p>
          <div style={styles.stepIndicator}>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDot}></span>
            <span style={styles.stepDot}></span>
            <span style={styles.stepDot}></span>
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
          <div
            style={{
              ...styles.optionCard,
              ...(formData.profile_for === "Myself" ? styles.optionCardActive : {}),
            }}
            onClick={() => handleChange("Myself")}
            onMouseEnter={(e) => {
              if (formData.profile_for !== "Myself") {
                e.currentTarget.style.borderColor = COLORS.accent;
              }
            }}
            onMouseLeave={(e) => {
              if (formData.profile_for !== "Myself") {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }
            }}
          >
            <input
              type="radio"
              checked={formData.profile_for === "Myself"}
              readOnly
              style={styles.radio}
            />
            <div>
              <h3 style={styles.optionTitle}>Myself</h3>
              <p style={styles.optionDescription}>
                I am creating my own matrimonial profile.
              </p>
            </div>
          </div>

          <div
            style={{
              ...styles.optionCard,
              ...(formData.profile_for === "Family Member" ? styles.optionCardActive : {}),
            }}
            onClick={() => handleChange("Family Member")}
            onMouseEnter={(e) => {
              if (formData.profile_for !== "Family Member") {
                e.currentTarget.style.borderColor = COLORS.accent;
              }
            }}
            onMouseLeave={(e) => {
              if (formData.profile_for !== "Family Member") {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }
            }}
          >
            <input
              type="radio"
              checked={formData.profile_for === "Family Member"}
              readOnly
              style={styles.radio}
            />
            <div>
              <h3 style={styles.optionTitle}>Family Member</h3>
              <p style={styles.optionDescription}>
                I am creating this profile for a family member.
              </p>
            </div>
          </div>

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
    maxWidth: '650px',
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
  optionCard: {
    border: `2px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING[5],
    display: 'flex',
    gap: SPACING[4],
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  optionCardActive: {
    border: `2px solid ${COLORS.accent}`,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
    boxShadow: `0 0 30px rgba(201, 169, 110, 0.05)`,
  },
  radio: {
    marginTop: SPACING[1],
    accentColor: COLORS.accent,
    width: '18px',
    height: '18px',
  },
  optionTitle: {
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  optionDescription: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
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