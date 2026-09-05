

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   defaultValues,
//   personalInfoSchema,
//   getPersonalInformation,
//   savePersonalInformation,
// } from './personalInfo';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function PersonalInfoForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState(defaultValues);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');

//   /*
//   |--------------------------------------------------------------------------
//   | Load Existing Data
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     loadPersonalInformation();
//   }, []);

//   const loadPersonalInformation = async () => {
//     try {
//       const response = await getPersonalInformation();

//       if (response?.data) {
//         setFormData({
//           first_name: response.data.first_name || '',
//           last_name: response.data.last_name || '',
//           age: response.data.age || '',
//           date_of_birth: response.data.date_of_birth
//             ? new Date(response.data.date_of_birth).toISOString().split('T')[0]
//             : '',
//           gender: response.data.gender || '',
//           religion: response.data.religion || '',
//           caste: response.data.caste || '',
//           mother_tongue: response.data.mother_tongue || '',
//           marital_status: response.data.marital_status || '',
//           height: response.data.height || '',
//           weight: response.data.weight || '',
//           profile_status: response.data.profile_status || 'Active',
//         });

//         if (response.data.profile_picture) {
//           setPreviewUrl(response.data.profile_picture);
//         }
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
//   | Handle File Upload
//   |--------------------------------------------------------------------------
//   */

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setProfilePicture(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setError('');
//     }
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
//       // Calculate age from date of birth
//       const birthDate = new Date(formData.date_of_birth);
//       const today = new Date();
//       let age = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();

//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//       }

//       const dataToValidate = {
//         ...formData,
//         age: age,
//         height: formData.height ? parseFloat(formData.height) : undefined,
//         weight: formData.weight ? parseFloat(formData.weight) : undefined,
//       };

//       // Validate with Zod
//       personalInfoSchema.parse(dataToValidate);

//       // Create FormData for file upload
//       const formDataToSend = new FormData();

//       // Append all fields including age
//       Object.keys(dataToValidate).forEach((key) => {
//         if (dataToValidate[key] !== '' && dataToValidate[key] !== null && dataToValidate[key] !== undefined) {
//           formDataToSend.append(key, dataToValidate[key]);
//         }
//       });

//       // Append file if exists
//       if (profilePicture) {
//         formDataToSend.append('profile_picture', profilePicture);
//       }

//       await savePersonalInformation(formDataToSend);

//       setSuccess('Personal information saved successfully.');

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
//     submitForm('/profile/contact-professional');
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
//           <span style={styles.logo}>👤</span>

//           <h1 style={styles.title}>
//             Personal Information
//           </h1>

//           <p style={styles.subtitle}>
//             Step 3 of 7
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

//         <form style={styles.form} encType="multipart/form-data">
//           {/* Profile Picture */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Profile Picture
//             </label>
//             <div style={styles.fileUploadContainer}>
//               {previewUrl && (
//                 <div style={styles.previewContainer}>
//                   <img
//                     src={previewUrl}
//                     alt="Profile Preview"
//                     style={styles.previewImage}
//                   />
//                 </div>
//               )}
//               <input
//                 type="file"
//                 name="profile_picture"
//                 accept="image/*"
//                 style={styles.fileInput}
//                 onChange={handleFileChange}
//               />
//               <span style={styles.hint}>
//                 Upload a clear profile picture (JPG, PNG, WEBP)
//               </span>
//             </div>
//           </div>

//           {/* First Name */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               First Name <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="first_name"
//               placeholder="Enter first name"
//               style={styles.input}
//               value={formData.first_name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Last Name */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Last Name <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="last_name"
//               placeholder="Enter last name"
//               style={styles.input}
//               value={formData.last_name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Date of Birth */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Date of Birth <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="date"
//               name="date_of_birth"
//               style={styles.input}
//               value={formData.date_of_birth}
//               onChange={handleChange}
//               required
//             />
//             <span style={styles.hint}>
//               Age will be calculated automatically (Minimum 18 years)
//             </span>
//           </div>

//           {/* Gender */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Gender <span style={styles.required}>*</span>
//             </label>
//             <select
//               name="gender"
//               style={styles.select}
//               value={formData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           {/* Religion */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Religion <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="religion"
//               placeholder="Enter religion (e.g., Islam, Christianity)"
//               style={styles.input}
//               value={formData.religion}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Caste */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Caste <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="caste"
//               placeholder="Enter caste (e.g., Sheikh, Syed)"
//               style={styles.input}
//               value={formData.caste}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Mother Tongue */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Mother Tongue <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="mother_tongue"
//               placeholder="Enter mother tongue (e.g., Urdu, Punjabi)"
//               style={styles.input}
//               value={formData.mother_tongue}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Marital Status */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Marital Status <span style={styles.required}>*</span>
//             </label>
//             <select
//               name="marital_status"
//               style={styles.select}
//               value={formData.marital_status}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select marital status</option>
//               <option value="Never Married">Never Married</option>
//               <option value="Divorced">Divorced</option>
//               <option value="Widowed">Widowed</option>
//               <option value="Separated">Separated</option>
//             </select>
//           </div>

//           {/* Height */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Height (in feet) <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="number"
//               name="height"
//               placeholder="e.g., 5.8"
//               style={styles.input}
//               value={formData.height}
//               onChange={handleChange}
//               required
//               step="0.1"
//               min="2"
//               max="8"
//             />
//             <span style={styles.hint}>
//               Enter height in feet (e.g., 5.8 for 5 feet 8 inches)
//             </span>
//           </div>

//           {/* Weight */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               Weight (in kg) <span style={styles.required}>*</span>
//             </label>
//             <input
//               type="number"
//               name="weight"
//               placeholder="e.g., 70"
//               style={styles.input}
//               value={formData.weight}
//               onChange={handleChange}
//               required
//               min="20"
//               max="300"
//             />
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

//   fileUploadContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: SPACING[3],
//     padding: SPACING[4],
//     border: `2px dashed ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     backgroundColor: COLORS.backgroundLight,
//   },

//   previewContainer: {
//     width: '120px',
//     height: '120px',
//     borderRadius: '50%',
//     overflow: 'hidden',
//     border: `3px solid ${COLORS.secondary}`,
//   },

//   previewImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },

//   fileInput: {
//     padding: `${SPACING[2]} 0`,
//     width: '100%',
//     cursor: 'pointer',
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























// src/components/profile/personal-information/PersonalInfoForm.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  defaultValues,
  personalInfoSchema,
  getPersonalInformation,
  savePersonalInformation,
} from './personalInfo';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function PersonalInfoForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    loadPersonalInformation();
  }, []);

  const loadPersonalInformation = async () => {
    try {
      const response = await getPersonalInformation();

      if (response?.data) {
        setFormData({
          first_name: response.data.first_name || '',
          last_name: response.data.last_name || '',
          age: response.data.age || '',
          date_of_birth: response.data.date_of_birth
            ? new Date(response.data.date_of_birth).toISOString().split('T')[0]
            : '',
          gender: response.data.gender || '',
          religion: response.data.religion || '',
          caste: response.data.caste || '',
          mother_tongue: response.data.mother_tongue || '',
          marital_status: response.data.marital_status || '',
          height: response.data.height || '',
          weight: response.data.weight || '',
          profile_status: response.data.profile_status || 'Active',
        });

        if (response.data.profile_picture) {
          setPreviewUrl(response.data.profile_picture);
        }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const submitForm = async (redirectTo) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      const dataToValidate = {
        ...formData,
        age: age,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      };

      personalInfoSchema.parse(dataToValidate);

      const formDataToSend = new FormData();

      Object.keys(dataToValidate).forEach((key) => {
        if (dataToValidate[key] !== '' && dataToValidate[key] !== null && dataToValidate[key] !== undefined) {
          formDataToSend.append(key, dataToValidate[key]);
        }
      });

      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }

      await savePersonalInformation(formDataToSend);

      setSuccess('Personal information saved successfully.');

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
    submitForm('/profile/contact-professional');
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
          <span style={styles.logo}>👤</span>
          <h1 style={styles.title}>
            Personal <span style={styles.highlight}>Information</span>
          </h1>
          <p style={styles.subtitle}>
            Step 3 of 7 • Tell us about yourself
          </p>
          <div style={styles.stepIndicator}>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
            <span style={styles.stepDotActive}></span>
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

        <form style={styles.form} encType="multipart/form-data">
          {/* Profile Picture */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📸</span>
              Profile Picture
            </label>
            <div style={styles.fileUploadContainer}>
              {previewUrl && (
                <div style={styles.previewContainer}>
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    style={styles.previewImage}
                  />
                </div>
              )}
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                style={styles.fileInput}
                onChange={handleFileChange}
              />
              <span style={styles.hint}>
                Upload a clear profile picture (JPG, PNG, WEBP)
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div style={styles.fieldsGrid}>
            {/* First Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                First Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter first name"
                style={styles.input}
                value={formData.first_name}
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

            {/* Last Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Last Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter last name"
                style={styles.input}
                value={formData.last_name}
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

            {/* Date of Birth */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Date of Birth <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                style={styles.input}
                value={formData.date_of_birth}
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
              <span style={styles.hint}>Age will be calculated automatically</span>
            </div>

            {/* Gender - Fixed Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Gender <span style={styles.required}>*</span>
              </label>
              <div style={styles.selectWrapper}>
                <select
                  name="gender"
                  style={styles.select}
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <span style={styles.selectArrow}>▼</span>
              </div>
            </div>

            {/* Religion */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Religion <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="religion"
                placeholder="e.g., Islam, Christianity"
                style={styles.input}
                value={formData.religion}
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

            {/* Caste */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Caste <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="caste"
                placeholder="e.g., Sheikh, Syed"
                style={styles.input}
                value={formData.caste}
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

            {/* Mother Tongue */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Mother Tongue <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="mother_tongue"
                placeholder="e.g., Urdu, Punjabi"
                style={styles.input}
                value={formData.mother_tongue}
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

            {/* Marital Status - Fixed Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Marital Status <span style={styles.required}>*</span>
              </label>
              <div style={styles.selectWrapper}>
                <select
                  name="marital_status"
                  style={styles.select}
                  value={formData.marital_status}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <option value="">Select marital status</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
                <span style={styles.selectArrow}>▼</span>
              </div>
            </div>

            {/* Height */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Height (in feet) <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="height"
                placeholder="e.g., 5.8"
                style={styles.input}
                value={formData.height}
                onChange={handleChange}
                required
                step="0.1"
                min="2"
                max="8"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <span style={styles.hint}>Enter height in feet (e.g., 5.8)</span>
            </div>

            {/* Weight */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Weight (in kg) <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="weight"
                placeholder="e.g., 70"
                style={styles.input}
                value={formData.weight}
                onChange={handleChange}
                required
                min="20"
                max="300"
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
    backgroundColor: 'rgba(26, 42, 74, 0.9)',
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
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.xs,
    pointerEvents: 'none',
  },

  fileUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[3],
    padding: SPACING[4],
    border: `2px dashed rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.02)',
    transition: 'all 0.3s ease',
  },

  previewContainer: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `3px solid ${COLORS.accent}`,
    boxShadow: `0 0 30px rgba(201, 169, 110, 0.15)`,
  },

  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  fileInput: {
    padding: `${SPACING[2]} 0`,
    width: '100%',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
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
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    border: 'none',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
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
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    border: `1px solid rgba(255,255,255,0.06)`,
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
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