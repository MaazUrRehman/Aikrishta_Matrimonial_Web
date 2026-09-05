// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import axiosInstance from '@/lib/axios';
// import ProfileHeader from './ProfileHeader';
// import PersonalInformation from './PersonalInformation';
// import ContactProfessional from './ContactProfessional';
// import FamilyBackground from './FamilyBackground';
// import PartnerPreference from './PartnerPreference';
// import ProfileActions from './ProfileActions';
// import { COLORS, SPACING,TYPOGRAPHY  } from '@/constants/theme';
// import './styles.css';

// export default function UserProfileDetail({ profile, currentUserPersonal }) {
//   const searchParams = useSearchParams();
//   const matchPercentage = searchParams.get('matchPercentage');
//   const matchCategory = searchParams.get('matchCategory');
//   const source = searchParams.get('source');

//   const [permissionStatus, setPermissionStatus] = useState('No Request');

//   const { personalInfo, contactProfessional, familyBackground, partnerPreference } = profile || {};
//   const profileId = personalInfo?.user_id || profile?.id;

//   const getPlaceOfBirth = (personalInfo, contactProfessional) => {
//     const city = contactProfessional?.city || personalInfo?.city;
//     const country = contactProfessional?.country || personalInfo?.country;
//     return city && country ? `${city}, ${country}` : (city || country || 'Not specified');
//   };

//   const getLoggedInUserContact = () => {
//     if (typeof window === 'undefined') return null;
//     try {
//       const userStr = localStorage.getItem('user');
//       console.log('DEBUG: LocalStorage user:', userStr);
//       const user = JSON.parse(userStr);
//       console.log('DEBUG: Parsed user:', user);
//       return user ? { city: user.city || user.residence_city || user.current_city, country: user.country } : null;
//     } catch (e) {
//       console.error('DEBUG: Error parsing user from localStorage:', e);
//       return null;
//     }
//   };

//   const candidateDataForModal = {
//     dob: personalInfo?.date_of_birth,
//     placeOfBirth: getPlaceOfBirth(personalInfo, contactProfessional),
//     gender: personalInfo?.gender,
//   };

//   const currentUserDataForModal = {
//     dob: currentUserPersonal?.date_of_birth,
//     placeOfBirth: getPlaceOfBirth(currentUserPersonal, getLoggedInUserContact()),
//     gender: currentUserPersonal?.gender,
//   };

//   useEffect(() => {
//     const fetchPermission = async () => {
//       if (!profileId) return;
//       try {
//         const response = await axiosInstance.get(`/picture-requests/permission/${profileId}`);
//         if (response.data && response.data.data) {
//           setPermissionStatus(response.data.data.status);
//         }
//       } catch (error) {
//         console.error('Error fetching picture permission:', error);
//       }
//     };
//     fetchPermission();
//   }, [profileId]);

//   if (!profile) {
//     return (
//       <div style={styles.errorContainer}>
//         <p>No profile data available</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <ProfileHeader profile={profile} permissionStatus={permissionStatus} />
      
//       <div className="sections-grid" style={styles.sectionsGrid}>
//         <PersonalInformation data={personalInfo} />
//         <ContactProfessional data={contactProfessional} />
//         <FamilyBackground data={familyBackground} />
//         <PartnerPreference data={partnerPreference} />
//       </div>

//       <ProfileActions 
//         profileId={profileId} 
//         matchPercentage={source === 'ai-match' ? matchPercentage : null}
//         matchCategory={source === 'ai-match' ? matchCategory : null}
//         permissionStatus={permissionStatus}
//         onPermissionChange={setPermissionStatus}
//         currentUser={currentUserDataForModal}
//         candidateProfile={candidateDataForModal}
//         // isProfileActive={currentUserPersonal?.profileActivation}
//         isProfileActive={JSON.parse(localStorage.getItem("user"))?.profileActivation}
//       />
//     </div>
//   );
// }

// const styles = {
//   container: {
//     width: '100%',
//   },
//   sectionsGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[6],
//     marginTop: SPACING[6],
//   },
//   errorContainer: {
//     padding: SPACING[8],
//     textAlign: 'center',
//     color: COLORS.textGray,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//   },
// };




















// src/components/profile-detail/UserProfileDetail.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import ProfileHeader from './ProfileHeader';
import PersonalInformation from './PersonalInformation';
import ContactProfessional from './ContactProfessional';
import FamilyBackground from './FamilyBackground';
import PartnerPreference from './PartnerPreference';
import ProfileActions from './ProfileActions';
import { COLORS, SPACING } from '@/constants/theme';

export default function UserProfileDetail({ profile, currentUserPersonal }) {
  const searchParams = useSearchParams();
  const matchPercentage = searchParams.get('matchPercentage');
  const matchCategory = searchParams.get('matchCategory');
  const source = searchParams.get('source');

  const [permissionStatus, setPermissionStatus] = useState('No Request');

  const { personalInfo, contactProfessional, familyBackground, partnerPreference } = profile || {};
  const profileId = personalInfo?.user_id || profile?.id;

  const getPlaceOfBirth = (personalInfo, contactProfessional) => {
    const city = contactProfessional?.city || personalInfo?.city;
    const country = contactProfessional?.country || personalInfo?.country;
    return city && country ? `${city}, ${country}` : (city || country || 'Not specified');
  };

  const getLoggedInUserContact = () => {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem('user');
      const user = JSON.parse(userStr);
      return user ? { city: user.city || user.residence_city || user.current_city, country: user.country } : null;
    } catch (e) {
      return null;
    }
  };

  const candidateDataForModal = {
    dob: personalInfo?.date_of_birth,
    placeOfBirth: getPlaceOfBirth(personalInfo, contactProfessional),
    gender: personalInfo?.gender,
  };

  const currentUserDataForModal = {
    dob: currentUserPersonal?.date_of_birth,
    placeOfBirth: getPlaceOfBirth(currentUserPersonal, getLoggedInUserContact()),
    gender: currentUserPersonal?.gender,
  };

  useEffect(() => {
    const fetchPermission = async () => {
      if (!profileId) return;
      try {
        const response = await axiosInstance.get(`/picture-requests/permission/${profileId}`);
        if (response.data && response.data.data) {
          setPermissionStatus(response.data.data.status);
        }
      } catch (error) {
        console.error('Error fetching picture permission:', error);
      }
    };
    fetchPermission();
  }, [profileId]);

  if (!profile) {
    return (
      <div style={styles.errorContainer}>
        <p>No profile data available</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ProfileHeader 
        profile={profile} 
        permissionStatus={permissionStatus} 
      />
      
      <div style={styles.sectionsGrid}>
        <PersonalInformation data={personalInfo} />
        <ContactProfessional data={contactProfessional} />
        <FamilyBackground data={familyBackground} />
        <PartnerPreference data={partnerPreference} />
      </div>

      <ProfileActions 
        profileId={profileId} 
        matchPercentage={source === 'ai-match' ? matchPercentage : null}
        matchCategory={source === 'ai-match' ? matchCategory : null}
        permissionStatus={permissionStatus}
        onPermissionChange={setPermissionStatus}
        currentUser={currentUserDataForModal}
        candidateProfile={candidateDataForModal}
        isProfileActive={JSON.parse(localStorage.getItem("user"))?.profileActivation}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%',
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[6],
    marginTop: SPACING[6],
  },
  errorContainer: {
    padding: SPACING[8],
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.125rem',
  },
};

// Add responsive styles
if (typeof window !== 'undefined') {
  const responsiveStyles = `
    @media (max-width: 1024px) {
      .profile-sections-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
    }
    @media (max-width: 640px) {
      .profile-sections-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}