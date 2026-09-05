// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

// // ✅ Import Navbar and Footer
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';

// import ProfileCard from '@/components/profile/ProfileCard';
// import ProfileStatusBadge from '@/components/profile/ProfileStatusBadge';
// import ContinueVerificationButton from '@/components/profile/ContinueVerificationButton';
// import PersonalInfoCard from '@/components/profile/PersonalInfoCard';
// import ContactProfessionalCard from '@/components/profile/ContactProfessionalCard';
// import FamilyBackgroundCard from '@/components/profile/FamilyBackgroundCard';
// import FamilyMemberCard from '@/components/profile/FamilyMemberCard';
// import PartnerPreferenceCard from '@/components/profile/PartnerPreferenceCard';
// import ProfileSkeleton from '@/components/profile/ProfileSkeleton';

// import { API } from '@/lib/api';

// export default function ProfilePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [profileData, setProfileData] = useState({
//     personalInfo: null,
//     contactProfessional: null,
//     familyBackground: null,
//     familyMember: null,
//     partnerPreference: null,
//     profileType: null,
//     verification: null,
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const [
//         personalInfoRes,
//         contactProfessionalRes,
//         familyBackgroundRes,
//         familyMemberRes,
//         partnerPreferenceRes,
//         profileTypeRes,
//         verificationRes,
//       ] = await Promise.all([
//         fetch(API.profile.personalInfo, { credentials: 'include' }),
//         fetch(API.profile.contactProfessional, { credentials: 'include' }),
//         fetch(API.profile.familyBackground, { credentials: 'include' }),
//         fetch(API.profile.familyMember, { credentials: 'include' }),
//         fetch(API.profile.partnerPreference, { credentials: 'include' }),
//         fetch(API.profile.profileType, { credentials: 'include' }),
//         fetch(API.profile.verificationStatus, { credentials: 'include' }),
//       ]);

//       const personalInfo = personalInfoRes.ok ? await personalInfoRes.json() : null;
//       const contactProfessional = contactProfessionalRes.ok ? await contactProfessionalRes.json() : null;
//       const familyBackground = familyBackgroundRes.ok ? await familyBackgroundRes.json() : null;
//       const familyMember = familyMemberRes.ok ? await familyMemberRes.json() : null;
//       const partnerPreference = partnerPreferenceRes.ok ? await partnerPreferenceRes.json() : null;
//       const profileType = profileTypeRes.ok ? await profileTypeRes.json() : null;
//       const verification = verificationRes.ok ? await verificationRes.json() : null;

//       setProfileData({
//         personalInfo: personalInfo?.data || null,
//         contactProfessional: contactProfessional?.data || null,
//         familyBackground: familyBackground?.data || null,
//         familyMember: familyMember?.data || null,
//         partnerPreference: partnerPreference?.data || null,
//         profileType: profileType?.data || null,
//         verification: verification?.data || null,
//       });
//     } catch (err) {
//       console.error('Error fetching profile data:', err);
//       setError('Failed to load profile data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Navigation function for specific section edit
//   const handleEditSection = (section) => {
//     const routes = {
//       personal: '/profile/personal-information',
//       contact: '/profile/contact-professional',
//       family: '/profile/family-background',
//       partner: '/profile/partner-preference',
//     };
//     router.push(routes[section] || '/profile/personal-information');
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div style={styles.container}>
//           <div style={styles.card}>
//             <ProfileSkeleton />
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const { personalInfo, verification, profileType } = profileData;

//   const isComplete = personalInfo !== null;
//   const isVerified = verification?.profile_status === 'Approved';
//   const isPending = verification?.profile_status === 'Pending' ||
//     verification?.profile_status === 'Phone Pending' ||
//     verification?.profile_status === 'Email Pending' ||
//     verification?.profile_status === 'Documents Pending' ||
//     verification?.profile_status === 'Under Review';

//   const showFamilyMember = profileType?.profile_for === 'Family Member';

//   // ✅ New Sequence: 1. Type 2. Personal 3. Contact 4. Family 5. Partner 6. Verification
//   const completedForms = [
//     profileData.profileType,
//     profileData.personalInfo,
//     profileData.contactProfessional,
//     profileData.familyBackground,
//     profileData.partnerPreference,
//     showFamilyMember ? profileData.familyMember : true,
//   ].filter(Boolean).length;

//   const totalForms = showFamilyMember ? 6 : 6;
//   const completionPercentage = Math.round((completedForms / totalForms) * 100);

//   return (
//     <>
//       <Navbar />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           {/* Profile Card */}
//           <ProfileCard
//             personalInfo={profileData.personalInfo}
//             profileType={profileData.profileType}
//             verification={profileData.verification}
//             contactProfessional={profileData.contactProfessional}
//           />

//           {/* Progress Section */}
//           <div style={styles.progressSection}>
//             <div style={styles.progressHeader}>
//               <span style={styles.progressLabel}>Profile Completion</span>
//               <span style={styles.progressPercentage}>{completionPercentage}%</span>
//             </div>
//             <div style={styles.progressBar}>
//               <div
//                 style={{
//                   ...styles.progressFill,
//                   width: `${completionPercentage}%`,
//                 }}
//               />
//             </div>
//             <div style={styles.progressSteps}>
//               <span style={profileData.profileType ? styles.stepActive : styles.stepInactive}>
//                 1. Type
//               </span>
//               <span style={profileData.personalInfo ? styles.stepActive : styles.stepInactive}>
//                 2. Personal
//               </span>
//               <span style={profileData.contactProfessional ? styles.stepActive : styles.stepInactive}>
//                 3. Contact
//               </span>
//               <span style={profileData.familyBackground ? styles.stepActive : styles.stepInactive}>
//                 4. Family
//               </span>
//               <span style={profileData.partnerPreference ? styles.stepActive : styles.stepInactive}>
//                 5. Partner
//               </span>
//               <span style={isVerified ? styles.stepActive : styles.stepInactive}>
//                 6. Verification
//               </span>
//             </div>
//           </div>

//           {error && <div style={styles.error}>{error}</div>}

//           {/* Status Badge */}
//           <div style={styles.statusSection}>
//             <ProfileStatusBadge
//               status={verification?.profile_status || 'Pending'}
//               // Use stored activation status from localStorage if not provided by API
//               profileActivation={
//                 (profileData?.verification?.profileActivation) ??
//                 (typeof window !== 'undefined' && (() => {
//                   try {
//                     const stored = JSON.parse(localStorage.getItem('user') || '{}');
//                     return stored.profileActivation ?? false;
//                   } catch {
//                     return false;
//                   }
//                 })())
//               }
//             />
//           </div>

//           {/* Profile Sections - ✅ With Edit Icons */}
//           <div style={styles.sections}>
//             {/* Personal Info Section */}
//             {profileData.personalInfo && (
//               <div style={styles.sectionWrapper}>
//                 <div style={styles.sectionHeader}>
//                   <h3 style={styles.sectionTitle}>📋 Personal Information</h3>
//                   <button
//                     style={styles.editIconBtn}
//                     onClick={() => handleEditSection('personal')}
//                     aria-label="Edit Personal Information"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={styles.editIcon}
//                     >
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <PersonalInfoCard data={profileData.personalInfo} />
//               </div>
//             )}

//             {/* Contact Professional Section */}
//             {profileData.contactProfessional && (
//               <div style={styles.sectionWrapper}>
//                 <div style={styles.sectionHeader}>
//                   <h3 style={styles.sectionTitle}>📞 Contact & Professional</h3>
//                   <button
//                     style={styles.editIconBtn}
//                     onClick={() => handleEditSection('contact')}
//                     aria-label="Edit Contact & Professional"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={styles.editIcon}
//                     >
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <ContactProfessionalCard data={profileData.contactProfessional} />
//               </div>
//             )}

//             {/* Family Background Section */}
//             {profileData.familyBackground && (
//               <div style={styles.sectionWrapper}>
//                 <div style={styles.sectionHeader}>
//                   <h3 style={styles.sectionTitle}>👨‍👩‍👧‍👦 Family Background</h3>
//                   <button
//                     style={styles.editIconBtn}
//                     onClick={() => handleEditSection('family')}
//                     aria-label="Edit Family Background"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={styles.editIcon}
//                     >
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <FamilyBackgroundCard data={profileData.familyBackground} />
//               </div>
//             )}

//             {/* Partner Preference Section */}
//             {profileData.partnerPreference && (
//               <div style={styles.sectionWrapper}>
//                 <div style={styles.sectionHeader}>
//                   <h3 style={styles.sectionTitle}>💑 Partner Preference</h3>
//                   <button
//                     style={styles.editIconBtn}
//                     onClick={() => handleEditSection('partner')}
//                     aria-label="Edit Partner Preference"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={styles.editIcon}
//                     >
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <PartnerPreferenceCard data={profileData.partnerPreference} />
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div style={styles.actions}>
//             {isPending && (
//               <ContinueVerificationButton verification={profileData.verification} />
//             )}

//             {!isComplete && (
//               <button
//                 style={styles.btnSecondary}
//                 onClick={() => router.push('/profile/personal-information')}
//               >
//                 📝 Complete Profile
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// const styles = {
//   container: {
//     minHeight: '100vh',
//     padding: `${SPACING[6]} ${SPACING[6]} ${SPACING[12]}`,
//     background: COLORS.gradients.hero,
//   },

//   card: {
//     maxWidth: '900px',
//     margin: '0 auto',
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[10],
//     boxShadow: SHADOWS.xl,
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   progressSection: {
//     marginBottom: SPACING[6],
//     padding: SPACING[4],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.base,
//   },

//   progressHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: SPACING[2],
//   },

//   progressLabel: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//   },

//   progressPercentage: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.secondary,
//   },

//   progressBar: {
//     width: '100%',
//     height: '8px',
//     backgroundColor: COLORS.border,
//     borderRadius: BORDER_RADIUS.full,
//     overflow: 'hidden',
//     marginBottom: SPACING[3],
//   },

//   progressFill: {
//     height: '100%',
//     backgroundColor: COLORS.secondary,
//     borderRadius: BORDER_RADIUS.full,
//     transition: 'width 0.5s ease',
//   },

//   progressSteps: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     flexWrap: 'wrap',
//     gap: SPACING[1],
//   },

//   stepActive: {
//     color: COLORS.secondary,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//   },

//   stepInactive: {
//     color: COLORS.textGray,
//   },

//   statusSection: {
//     marginBottom: SPACING[6],
//   },

//   sections: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[4],
//     marginBottom: SPACING[6],
//   },

//   sectionWrapper: {
//     border: `1px solid ${COLORS.borderLight}`,
//     borderRadius: BORDER_RADIUS.base,
//     overflow: 'hidden',
//     backgroundColor: COLORS.white,
//   },

//   sectionHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: `${SPACING[3]} ${SPACING[4]}`,
//     backgroundColor: COLORS.backgroundLight,
//     borderBottom: `1px solid ${COLORS.borderLight}`,
//   },

//   sectionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     margin: 0,
//   },

//   editIconBtn: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: SPACING[1],
//     borderRadius: BORDER_RADIUS.sm,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.2s ease',
//     color: COLORS.textGray,
//     '&:hover': {
//       color: COLORS.secondary,
//       backgroundColor: 'rgba(236, 72, 153, 0.1)',
//       transform: 'scale(1.1)',
//     },
//   },

//   editIcon: {
//     color: 'inherit',
//   },

//   actions: {
//     display: 'flex',
//     gap: SPACING[3],
//     flexWrap: 'wrap',
//   },

//   btnSecondary: {
//     flex: 1,
//     padding: `${SPACING[3]} ${SPACING[6]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: SHADOWS.pink,
//     minWidth: '200px',
//     '&:hover': {
//       opacity: 0.9,
//       transform: 'translateY(-2px)',
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
// };






















// src/app/profile/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

import ProfileCard from '@/components/profile/ProfileCard';
import ProfileStatusBadge from '@/components/profile/ProfileStatusBadge';
import ContinueVerificationButton from '@/components/profile/ContinueVerificationButton';
import PersonalInfoCard from '@/components/profile/PersonalInfoCard';
import ContactProfessionalCard from '@/components/profile/ContactProfessionalCard';
import FamilyBackgroundCard from '@/components/profile/FamilyBackgroundCard';
import FamilyMemberCard from '@/components/profile/FamilyMemberCard';
import PartnerPreferenceCard from '@/components/profile/PartnerPreferenceCard';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';

import { API } from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    personalInfo: null,
    contactProfessional: null,
    familyBackground: null,
    familyMember: null,
    partnerPreference: null,
    profileType: null,
    verification: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError('');

    try {
      const [
        personalInfoRes,
        contactProfessionalRes,
        familyBackgroundRes,
        familyMemberRes,
        partnerPreferenceRes,
        profileTypeRes,
        verificationRes,
      ] = await Promise.all([
        fetch(API.profile.personalInfo, { credentials: 'include' }),
        fetch(API.profile.contactProfessional, { credentials: 'include' }),
        fetch(API.profile.familyBackground, { credentials: 'include' }),
        fetch(API.profile.familyMember, { credentials: 'include' }),
        fetch(API.profile.partnerPreference, { credentials: 'include' }),
        fetch(API.profile.profileType, { credentials: 'include' }),
        fetch(API.profile.verificationStatus, { credentials: 'include' }),
      ]);

      const personalInfo = personalInfoRes.ok ? await personalInfoRes.json() : null;
      const contactProfessional = contactProfessionalRes.ok ? await contactProfessionalRes.json() : null;
      const familyBackground = familyBackgroundRes.ok ? await familyBackgroundRes.json() : null;
      const familyMember = familyMemberRes.ok ? await familyMemberRes.json() : null;
      const partnerPreference = partnerPreferenceRes.ok ? await partnerPreferenceRes.json() : null;
      const profileType = profileTypeRes.ok ? await profileTypeRes.json() : null;
      const verification = verificationRes.ok ? await verificationRes.json() : null;

      setProfileData({
        personalInfo: personalInfo?.data || null,
        contactProfessional: contactProfessional?.data || null,
        familyBackground: familyBackground?.data || null,
        familyMember: familyMember?.data || null,
        partnerPreference: partnerPreference?.data || null,
        profileType: profileType?.data || null,
        verification: verification?.data || null,
      });
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section) => {
    const routes = {
      personal: '/profile/personal-information',
      contact: '/profile/contact-professional',
      family: '/profile/family-background',
      partner: '/profile/partner-preference',
    };
    router.push(routes[section] || '/profile/personal-information');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.card}>
            <ProfileSkeleton />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { personalInfo, verification, profileType } = profileData;

  const isComplete = personalInfo !== null;
  const isVerified = verification?.profile_status === 'Approved';
  const isPending = verification?.profile_status === 'Pending' ||
    verification?.profile_status === 'Phone Pending' ||
    verification?.profile_status === 'Email Pending' ||
    verification?.profile_status === 'Documents Pending' ||
    verification?.profile_status === 'Under Review';

  const showFamilyMember = profileType?.profile_for === 'Family Member';

  const completedForms = [
    profileData.profileType,
    profileData.personalInfo,
    profileData.contactProfessional,
    profileData.familyBackground,
    profileData.partnerPreference,
    showFamilyMember ? profileData.familyMember : true,
  ].filter(Boolean).length;

  const totalForms = showFamilyMember ? 6 : 6;
  const completionPercentage = Math.round((completedForms / totalForms) * 100);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Profile Card */}
          <ProfileCard
            personalInfo={profileData.personalInfo}
            profileType={profileData.profileType}
            verification={profileData.verification}
            contactProfessional={profileData.contactProfessional}
          />

          {/* Progress Section */}
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>
                <span style={styles.progressIcon}>📊</span>
                Profile Completion
              </span>
              <span style={styles.progressPercentage}>{completionPercentage}%</span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${completionPercentage}%`,
                }}
              />
            </div>
            <div style={styles.progressSteps}>
              <span style={profileData.profileType ? styles.stepActive : styles.stepInactive}>
                1. Type
              </span>
              <span style={profileData.personalInfo ? styles.stepActive : styles.stepInactive}>
                2. Personal
              </span>
              <span style={profileData.contactProfessional ? styles.stepActive : styles.stepInactive}>
                3. Contact
              </span>
              <span style={profileData.familyBackground ? styles.stepActive : styles.stepInactive}>
                4. Family
              </span>
              <span style={profileData.partnerPreference ? styles.stepActive : styles.stepInactive}>
                5. Partner
              </span>
              <span style={isVerified ? styles.stepActive : styles.stepInactive}>
                6. Verification
              </span>
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {/* Status Badge */}
          <div style={styles.statusSection}>
            <ProfileStatusBadge
              status={verification?.profile_status || 'Pending'}
              profileActivation={
                (profileData?.verification?.profileActivation) ??
                (typeof window !== 'undefined' && (() => {
                  try {
                    const stored = JSON.parse(localStorage.getItem('user') || '{}');
                    return stored.profileActivation ?? false;
                  } catch {
                    return false;
                  }
                })())
              }
            />
          </div>

          {/* Profile Sections */}
          <div style={styles.sections}>
            {/* Personal Info Section */}
            {profileData.personalInfo && (
              <div style={styles.sectionWrapper}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span style={styles.sectionIcon}>👤</span>
                    Personal Information
                  </h3>
                  <button
                    style={styles.editIconBtn}
                    onClick={() => handleEditSection('personal')}
                    aria-label="Edit Personal Information"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={styles.editIcon}
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <PersonalInfoCard data={profileData.personalInfo} />
              </div>
            )}

            {/* Contact Professional Section */}
            {profileData.contactProfessional && (
              <div style={styles.sectionWrapper}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span style={styles.sectionIcon}>📞</span>
                    Contact & Professional
                  </h3>
                  <button
                    style={styles.editIconBtn}
                    onClick={() => handleEditSection('contact')}
                    aria-label="Edit Contact & Professional"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={styles.editIcon}
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <ContactProfessionalCard data={profileData.contactProfessional} />
              </div>
            )}

            {/* Family Background Section */}
            {profileData.familyBackground && (
              <div style={styles.sectionWrapper}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span style={styles.sectionIcon}>👨‍👩‍👧‍👦</span>
                    Family Background
                  </h3>
                  <button
                    style={styles.editIconBtn}
                    onClick={() => handleEditSection('family')}
                    aria-label="Edit Family Background"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={styles.editIcon}
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <FamilyBackgroundCard data={profileData.familyBackground} />
              </div>
            )}

            {/* Partner Preference Section */}
            {profileData.partnerPreference && (
              <div style={styles.sectionWrapper}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span style={styles.sectionIcon}>💑</span>
                    Partner Preference
                  </h3>
                  <button
                    style={styles.editIconBtn}
                    onClick={() => handleEditSection('partner')}
                    aria-label="Edit Partner Preference"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={styles.editIcon}
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <PartnerPreferenceCard data={profileData.partnerPreference} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            {isPending && (
              <ContinueVerificationButton verification={profileData.verification} />
            )}

            {!isComplete && (
              <button
                style={styles.btnSecondary}
                onClick={() => router.push('/profile/personal-information')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
                }}
              >
                📝 Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: `${SPACING[6]} ${SPACING[6]} ${SPACING[12]}`,
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },

  card: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[10],
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.06)`,
    boxShadow: SHADOWS.xl,
  },

  progressSection: {
    marginBottom: SPACING[6],
    padding: SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING[2],
  },

  progressLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  progressIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },

  progressPercentage: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },

  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING[3],
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.full,
    transition: 'width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.2)`,
  },

  progressSteps: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    flexWrap: 'wrap',
    gap: SPACING[1],
  },

  stepActive: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },

  stepInactive: {
    color: 'rgba(255,255,255,0.3)',
  },

  statusSection: {
    marginBottom: SPACING[6],
  },

  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
    marginBottom: SPACING[6],
  },

  sectionWrapper: {
    borderRadius: BORDER_RADIUS['2xl'],
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: `${COLORS.accent}20`,
    },
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
  },

  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  sectionIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },

  editIconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING[1],
    borderRadius: BORDER_RADIUS.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    color: 'rgba(255,255,255,0.4)',
    width: '32px',
    height: '32px',
    ':hover': {
      color: COLORS.accent,
      transform: 'scale(1.1)',
    },
  },

  editIcon: {
    color: 'inherit',
  },

  actions: {
    display: 'flex',
    gap: SPACING[3],
    flexWrap: 'wrap',
  },

  btnSecondary: {
    flex: 1,
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    minWidth: '200px',
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-3px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.5)`,
    },
  },

  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: SPACING[4],
    textAlign: 'center',
    border: `1px solid rgba(239, 68, 68, 0.2)`,
  },
};

// Add keyframe animations
if (typeof window !== 'undefined') {
  const animations = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}