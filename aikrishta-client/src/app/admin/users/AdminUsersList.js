// // src/app/admin/users/AdminUsersList.js
// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';
// import UserBasicInfoModal from './components/UserBasicInfoModal';
// import UserPersonalInfoModal from './components/UserPersonalInfoModal';
// import UserContactModal from './components/UserContactModal';
// import UserFamilyBackgroundModal from './components/UserFamilyBackgroundModal';
// import UserPartnerPreferenceModal from './components/UserPartnerPreferenceModal';
// import UserFamilyMembersModal from './components/UserFamilyMembersModal';

// import { adminGetAllUsers, adminGetUserProfileData } from './adminUsers';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function AdminUsersList() {
//   const router = useRouter();

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0,
//   });

//   // Modal states
//   const [modals, setModals] = useState({
//     basicInfo: { isOpen: false, userId: null, data: null },
//     personalInfo: { isOpen: false, userId: null, data: null },
//     contact: { isOpen: false, userId: null, data: null },
//     familyBackground: { isOpen: false, userId: null, data: null },
//     partnerPreference: { isOpen: false, userId: null, data: null },
//     familyMembers: { isOpen: false, userId: null, data: null },
//   });

//   useEffect(() => {
//     loadData();
//   }, []);



//   // const loadData = async () => {
//   //   setLoading(true);
//   //   setError('');

//   //   try {
//   //     const response = await adminGetAllUsers({ page: 1, limit: 100 });
      

//   //     // ✅ IMPORTANT: Check what data is actually coming from API
//   //     console.log('===== FULL API RESPONSE =====');
//   //     console.log(JSON.stringify(response, null, 2));

//   //     const usersData = response.data?.users || [];
//   //     console.log('===== FIRST USER DATA =====');
//   //     if (usersData.length > 0) {
//   //       console.log('First user keys:', Object.keys(usersData[0]));
//   //       console.log('First user:', JSON.stringify(usersData[0], null, 2));
//   //     }

//   //     setUsers(usersData);
//   //     // ... rest of code
//   //   } catch (err) {
//   //     setError(err.message || 'Failed to load users.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const loadData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await adminGetAllUsers({ page: 1, limit: 100 });
      
//       // ✅ IMPORTANT: Check what data is actually coming from API
//       console.log('===== FULL API RESPONSE =====');
//       console.log(JSON.stringify(response, null, 2));

//       let usersData = response.data?.users || [];
//       console.log('===== FIRST USER DATA =====');
//       if (usersData.length > 0) {
//         console.log('First user keys:', Object.keys(usersData[0]));
//         console.log('First user:', JSON.stringify(usersData[0], null, 2));
//       }

//       // ✅ Transform users - documentsVerified fix
//       usersData = usersData.map(user => {
//         let documentsVerified = false;
//         if (user.verification?.documents && user.verification.documents.length > 0) {
//           documentsVerified = user.verification.documents.every(doc => doc.document_verified === true);
//         }
        
//         return {
//           ...user,
//           documentsVerified: documentsVerified,
//           phoneVerified: user.phoneVerified || user.verification?.phone_verified || false,
//           emailVerified: user.emailVerified || user.verification?.email_verified || false,
//         };
//       });

//       setUsers(usersData);
//       // ... rest of code
//     } catch (err) {
//       setError(err.message || 'Failed to load users.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Frontend Search
//   const filteredUsers = useMemo(() => {
//     if (!searchTerm.trim()) {
//       return users;
//     }

//     const search = searchTerm.toLowerCase().trim();
//     return users.filter((user) => {
//       const name = (user.fullName || '').toLowerCase();
//       const email = (user.email || '').toLowerCase();
//       return name.includes(search) || email.includes(search);
//     });
//   }, [users, searchTerm]);

//   // Frontend Pagination
//   const paginatedUsers = useMemo(() => {
//     const start = (pagination.page - 1) * pagination.limit;
//     const end = start + pagination.limit;
//     return filteredUsers.slice(start, end);
//   }, [filteredUsers, pagination.page, pagination.limit]);

//   const totalPages = Math.ceil(filteredUsers.length / pagination.limit);

//   const handlePageChange = (newPage) => {
//     setPagination({
//       ...pagination,
//       page: newPage,
//     });
//   };


//   // ✅ Yeh mapping object add karo (openModal function ke andar)
//   const modalKeyMap = {
//     'personalInfo': 'personalInfo',
//     'contactProfessional': 'contact',        // ✅ contactProfessional -> contact
//     'familyBackground': 'familyBackground',
//     'partnerPreference': 'partnerPreference',
//     'familyMembers': 'familyMembers',         // ✅ familyMembers -> familyMembers
//     'basicInfo': 'basicInfo',
//   };

//   // ✅ OpenModal function
//   const openModal = async (userId, modalType) => {
//     try {
//       console.log("Opening:", modalType, "for user:", userId);

//       // ✅ For family members, use 'familyMembers' type
//       // This will map to 'family-member' route in adminUsers.js
//       let typeToFetch = modalType;

//       // If it's familyMembers, keep it as is
//       // adminUsers.js will map it to 'family-member'

//       const response = await adminGetUserProfileData(userId, typeToFetch);
//       console.log("Modal API Response:", response);

//       const modalKeyMap = {
//         'personalInfo': 'personalInfo',
//         'contactProfessional': 'contact',
//         'familyBackground': 'familyBackground',
//         'partnerPreference': 'partnerPreference',
//         'familyMembers': 'familyMembers',
//         'basicInfo': 'basicInfo',
//       };

//       const modalKey = modalKeyMap[modalType] || modalType;

//       setModals((prev) => ({
//         ...prev,
//         [modalKey]: {
//           isOpen: true,
//           userId,
//           data: response?.data ?? null,
//         },
//       }));
//     } catch (err) {
//       console.error(`Failed to fetch ${modalType}:`, err);

//       const modalKeyMap = {
//         'personalInfo': 'personalInfo',
//         'contactProfessional': 'contact',
//         'familyBackground': 'familyBackground',
//         'partnerPreference': 'partnerPreference',
//         'familyMembers': 'familyMembers',
//         'basicInfo': 'basicInfo',
//       };

//       const modalKey = modalKeyMap[modalType] || modalType;

//       setModals((prev) => ({
//         ...prev,
//         [modalKey]: {
//           isOpen: true,
//           userId,
//           data: null,
//         },
//       }));
//     }
//   };

//   // ✅ CloseModal function
//   const closeModal = (modalKey) => {
//     setModals({
//       ...modals,
//       [modalKey]: {
//         isOpen: false,
//         userId: null,
//         data: null,
//       },
//     });
//   };


//   const getProfileTypeLabel = (type) => {
//     if (type === 'self') return 'Self';
//     if (type === 'family_member') return 'Family Member';
//     return 'N/A';
//   };
//   console.log("users:", users);
//   console.log("filteredUsers:", filteredUsers);
//   console.log("paginatedUsers:", paginatedUsers);
//   if (loading) {
//     return (
//       <div style={styles.pageWrapper}>
//         <Navbar />
//         <div style={styles.loadingContainer}>
//           <span style={styles.loadingSpinner}>⏳</span>
//           <p>Loading users...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div style={styles.pageWrapper}>
//       <Navbar />
//       <div style={styles.container}>
//         <div style={styles.header}>
//           <div>
//             <h1 style={styles.title}>Users</h1>
//             <p style={styles.subtitle}>Manage all registered users</p>
//           </div>
//           <button onClick={loadData} style={styles.btnRefresh}>
//             🔄 Refresh
//           </button>
//         </div>

//         {error && <div style={styles.error}>{error}</div>}

//         {/* Search */}
//         <div style={styles.filterContainer}>
//           <div style={styles.searchWrapper}>
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setPagination({ ...pagination, page: 1 });
//               }}
//               style={styles.searchInput}
//             />
//             <span style={styles.searchIcon}>🔍</span>
//             {searchTerm && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setPagination({ ...pagination, page: 1 });
//                 }}
//                 style={styles.clearButton}
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//           <div style={styles.resultCount}>
//             {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
//           </div>
//         </div>

//         {/* Table */}
//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeader}>
//                 <th style={styles.th}>Basic Info</th>
//                 <th style={styles.th}>Profile Type</th>
//                 <th style={styles.th}>Personal Info</th>
//                 <th style={styles.th}>Contact & Professional</th>
//                 <th style={styles.th}>Family Background</th>
//                 <th style={styles.th}>Partner Preferences</th>
//                 <th style={styles.th}>Profile Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!paginatedUsers || paginatedUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" style={styles.emptyState}>
//                     {searchTerm ? 'No matching users found.' : 'No users found.'}
//                   </td>
//                 </tr>
//               ) : (
//                 console.log("Rendering:", paginatedUsers),
//                 paginatedUsers.map((user) => (

//                   <tr key={user._id} style={styles.tableRow}>
//                     {/* Basic Info */}
//                     <td style={styles.td}>
//                       <div style={styles.userInfo}>
//                         <div style={styles.avatar}>
//                           {user.fullName?.charAt(0).toUpperCase() || 'U'}
//                         </div>
//                         <div>
//                           <div style={styles.userName}>{user.fullName || 'N/A'}</div>
//                           <div style={styles.userEmail}>{user.email || 'N/A'}</div>
//                         </div>
//                       </div>
//                     </td>

                    

//                     {/* Profile Type */}
//                     <td style={styles.td}>
//                       {user.profile_for === 'Family Member' ? (
//                         <button
//                           onClick={() => openModal(user._id, 'familyMembers')}
//                           style={styles.linkBtn}
//                         >
//                           👨‍👩‍👧‍👦 Family Member
//                         </button>
//                       ) : (
//                         <span style={styles.profileTypeBadge}>Self</span>
//                       )}
//                     </td>

//                     {/* Personal Info */}
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => openModal(user._id, 'personalInfo')}
//                         style={styles.viewBtn}
//                       >
//                         View
//                       </button>
//                     </td>

//                     {/* Contact & Professional */}
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => openModal(user._id, 'contactProfessional')}
//                         style={styles.viewBtn}
//                       >
//                         View
//                       </button>
//                     </td>

//                     {/* Family Background */}
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => openModal(user._id, 'familyBackground')}
//                         style={styles.viewBtn}
//                       >
//                         View
//                       </button>
//                     </td>

//                     {/* Partner Preferences */}
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => openModal(user._id, 'partnerPreference')}
//                         style={styles.viewBtn}
//                       >
//                         View
//                       </button>
//                     </td>

                    

//                     {/* Profile Status */}
//                     <td style={styles.td}>
//                       <div style={styles.statusContainer}>
//                         <div style={styles.statusItem}>
//                           <span style={styles.statusLabel}>Phone:</span>
//                           <span style={getStatusStyle(user.phoneVerified)}>
//                             {user.phoneVerified ? '✅ Verified' : '⏳ Pending'}
//                           </span>
//                         </div>
//                         <div style={styles.statusItem}>
//                           <span style={styles.statusLabel}>Email:</span>
//                           <span style={getStatusStyle(user.emailVerified)}>
//                             {user.emailVerified ? '✅ Verified' : '⏳ Pending'}
//                           </span>
//                         </div>
//                         <div style={styles.statusItem}>
//                           <span style={styles.statusLabel}>Document:</span>
//                           <span style={getStatusStyle(user.documentsVerified)}>
//                             {user.documentsVerified ? '✅ Verified' : '⏳ Pending'}
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div style={styles.pagination}>
//             <button
//               onClick={() => handlePageChange(pagination.page - 1)}
//               disabled={pagination.page <= 1}
//               style={styles.pageButton}
//             >
//               Previous
//             </button>
//             <span style={styles.pageInfo}>
//               Page {pagination.page} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(pagination.page + 1)}
//               disabled={pagination.page >= totalPages}
//               style={styles.pageButton}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <UserBasicInfoModal
//         isOpen={modals.basicInfo.isOpen}
//         onClose={() => closeModal('basicInfo')}
//         data={modals.basicInfo.data}
//         userId={modals.basicInfo.userId}
//       />
//       <UserPersonalInfoModal
//         isOpen={modals.personalInfo.isOpen}
//         onClose={() => closeModal('personalInfo')}
//         data={modals.personalInfo.data}
//         userId={modals.personalInfo.userId}
//       />
//       <UserContactModal
//         isOpen={modals.contact.isOpen}
//         onClose={() => closeModal('contact')}
//         data={modals.contact.data}
//         userId={modals.contact.userId}
//       />
//       <UserFamilyBackgroundModal
//         isOpen={modals.familyBackground.isOpen}
//         onClose={() => closeModal('familyBackground')}
//         data={modals.familyBackground.data}
//         userId={modals.familyBackground.userId}
//       />
//       <UserPartnerPreferenceModal
//         isOpen={modals.partnerPreference.isOpen}
//         onClose={() => closeModal('partnerPreference')}
//         data={modals.partnerPreference.data}
//         userId={modals.partnerPreference.userId}
//       />
//       <UserFamilyMembersModal
//         isOpen={modals.familyMembers.isOpen}
//         onClose={() => closeModal('familyMembers')}
//         data={modals.familyMembers.data}
//         userId={modals.familyMembers.userId}
//       />

//       <Footer />
//     </div>
//   );
// }

// // Helper function for status styles
// const getStatusStyle = (verified) => {
//   return {
//     color: verified ? '#16A34A' : '#D97706',
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   };
// };

// // ==================== STYLES ====================

// const styles = {
//   pageWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: COLORS.backgroundLight,
//   },

//   container: {
//     flex: 1,
//     padding: SPACING[6],
//     maxWidth: '1400px',
//     margin: '0 auto',
//     width: '100%',
//   },

//   loadingContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     color: COLORS.primary,
//     minHeight: '400px',
//   },

//   loadingSpinner: {
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     marginBottom: SPACING[4],
//     animation: 'spin 1s linear infinite',
//   },

//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING[6],
//   },

//   title: {
//     fontFamily: TYPOGRAPHY.fontFamily.heading,
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//     margin: 0,
//   },

//   subtitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     margin: 0,
//   },

//   btnRefresh: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.white,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },

//   filterContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SPACING[6],
//     flexWrap: 'wrap',
//     gap: SPACING[3],
//   },

//   searchWrapper: {
//     position: 'relative',
//     flex: '1',
//     minWidth: '300px',
//     maxWidth: '500px',
//   },

//   searchInput: {
//     width: '100%',
//     padding: `${SPACING[2]} ${SPACING[3]} ${SPACING[2]} ${SPACING[10]}`,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     backgroundColor: COLORS.white,
//     outline: 'none',
//   },

//   searchIcon: {
//     position: 'absolute',
//     left: SPACING[3],
//     top: '50%',
//     transform: 'translateY(-50%)',
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//   },

//   clearButton: {
//     position: 'absolute',
//     right: SPACING[3],
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.base,
//     color: COLORS.textGray,
//     padding: SPACING[1],
//   },

//   resultCount: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//     whiteSpace: 'nowrap',
//   },

//   tableContainer: {
//     overflowX: 'auto',
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.base,
//     boxShadow: SHADOWS.sm,
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     minWidth: '1000px',
//   },

//   tableHeader: {
//     backgroundColor: COLORS.backgroundLight,
//     borderBottom: `2px solid ${COLORS.border}`,
//   },

//   th: {
//     padding: SPACING[3],
//     textAlign: 'left',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     whiteSpace: 'nowrap',
//   },

//   tableRow: {
//     borderBottom: `1px solid ${COLORS.border}`,
//     '&:hover': {
//       backgroundColor: COLORS.backgroundLight,
//     },
//   },

//   td: {
//     padding: SPACING[3],
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textDark,
//     verticalAlign: 'middle',
//   },

//   userInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[2],
//   },

//   avatar: {
//     width: '32px',
//     height: '32px',
//     borderRadius: '50%',
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     flexShrink: 0,
//   },

//   userName: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//   },

//   userEmail: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//   },

//   profileTypeBadge: {
//     display: 'inline-block',
//     padding: `${SPACING[1]} ${SPACING[3]}`,
//     backgroundColor: '#E5E7EB',
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textDark,
//   },

//   linkBtn: {
//     background: 'none',
//     border: 'none',
//     color: COLORS.secondary,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     textDecoration: 'underline',
//     '&:hover': {
//       opacity: 0.8,
//     },
//   },

//   viewBtn: {
//     padding: `${SPACING[1]} ${SPACING[4]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     '&:hover': {
//       opacity: 0.9,
//     },
//   },

//   statusContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[1],
//   },

//   statusItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: SPACING[2],
//     fontSize: TYPOGRAPHY.fontSize.xs,
//   },

//   statusLabel: {
//     color: COLORS.textGray,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },

//   emptyState: {
//     textAlign: 'center',
//     padding: SPACING[8],
//     color: COLORS.textGray,
//   },

//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: SPACING[3],
//     marginTop: SPACING[6],
//   },

//   pageButton: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.white,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     '&:disabled': {
//       opacity: 0.5,
//       cursor: 'not-allowed',
//     },
//   },

//   pageInfo: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
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

// // Add CSS animation keyframes
// if (typeof document !== 'undefined') {
//   const styleSheet = document.createElement("style");
//   styleSheet.textContent = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   `;
//   document.head.appendChild(styleSheet);
// }




























// src/app/admin/users/AdminUsersList.js
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  Users, 
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  CheckCircle,
  Clock
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import UserBasicInfoModal from './components/UserBasicInfoModal';
import UserPersonalInfoModal from './components/UserPersonalInfoModal';
import UserContactModal from './components/UserContactModal';
import UserFamilyBackgroundModal from './components/UserFamilyBackgroundModal';
import UserPartnerPreferenceModal from './components/UserPartnerPreferenceModal';
import UserFamilyMembersModal from './components/UserFamilyMembersModal';
import { adminGetAllUsers, adminGetUserProfileData } from './adminUsers';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function AdminUsersList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const [modals, setModals] = useState({
    basicInfo: { isOpen: false, userId: null, data: null },
    personalInfo: { isOpen: false, userId: null, data: null },
    contact: { isOpen: false, userId: null, data: null },
    familyBackground: { isOpen: false, userId: null, data: null },
    partnerPreference: { isOpen: false, userId: null, data: null },
    familyMembers: { isOpen: false, userId: null, data: null },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminGetAllUsers({ page: 1, limit: 100 });
      let usersData = response.data?.users || [];
      usersData = usersData.map(user => {
        let documentsVerified = false;
        if (user.verification?.documents && user.verification.documents.length > 0) {
          documentsVerified = user.verification.documents.every(doc => doc.document_verified === true);
        }
        return {
          ...user,
          documentsVerified: documentsVerified,
          phoneVerified: user.phoneVerified || user.verification?.phone_verified || false,
          emailVerified: user.emailVerified || user.verification?.email_verified || false,
        };
      });
      setUsers(usersData);
    } catch (err) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const search = searchTerm.toLowerCase().trim();
    return users.filter((user) => {
      const name = (user.fullName || '').toLowerCase();
      const email = (user.email || '').toLowerCase();
      return name.includes(search) || email.includes(search);
    });
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, pagination.page, pagination.limit]);

  const totalPages = Math.ceil(filteredUsers.length / pagination.limit);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = async (userId, modalType) => {
    try {
      const response = await adminGetUserProfileData(userId, modalType);
      const modalKeyMap = {
        'personalInfo': 'personalInfo',
        'contactProfessional': 'contact',
        'familyBackground': 'familyBackground',
        'partnerPreference': 'partnerPreference',
        'familyMembers': 'familyMembers',
        'basicInfo': 'basicInfo',
      };
      const modalKey = modalKeyMap[modalType] || modalType;
      setModals((prev) => ({
        ...prev,
        [modalKey]: {
          isOpen: true,
          userId,
          data: response?.data ?? null,
        },
      }));
    } catch (err) {
      const modalKeyMap = {
        'personalInfo': 'personalInfo',
        'contactProfessional': 'contact',
        'familyBackground': 'familyBackground',
        'partnerPreference': 'partnerPreference',
        'familyMembers': 'familyMembers',
        'basicInfo': 'basicInfo',
      };
      const modalKey = modalKeyMap[modalType] || modalType;
      setModals((prev) => ({
        ...prev,
        [modalKey]: {
          isOpen: true,
          userId,
          data: null,
        },
      }));
    }
  };

  const closeModal = (modalKey) => {
    setModals({
      ...modals,
      [modalKey]: {
        isOpen: false,
        userId: null,
        data: null,
      },
    });
  };

  const getStatusStyle = (verified) => {
    return {
      color: verified ? '#22C55E' : '#F59E0B',
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    };
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading users...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.header}
        >
          <div>
            <h1 style={styles.title}>Users</h1>
            <p style={styles.subtitle}>Manage all registered users</p>
          </div>
          <button
            onClick={loadData}
            style={styles.btnRefresh}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.color = COLORS.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </motion.div>

        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={styles.filterContainer}
        >
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPagination({ ...pagination, page: 1 });
              }}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.boxShadow = `0 0 30px rgba(201, 169, 110, 0.05)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPagination({ ...pagination, page: 1 });
                }}
                style={styles.clearButton}
              >
                ✕
              </button>
            )}
          </div>
          <div style={styles.resultCount}>
            <Users size={14} />
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.tableContainer}
        >
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Basic Info</th>
                <th style={styles.th}>Profile Type</th>
                <th style={styles.th}>Personal</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Family</th>
                <th style={styles.th}>Partner</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {!paginatedUsers || paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.emptyState}>
                    <span style={styles.emptyIcon}>📭</span>
                    <p>{searchTerm ? 'No matching users found.' : 'No users found.'}</p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    style={styles.tableRow}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                  >
                    <td style={styles.td}>
                      <div style={styles.userInfo}>
                        <div style={styles.avatar}>
                          {user.fullName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div style={styles.userName}>{user.fullName || 'N/A'}</div>
                          <div style={styles.userEmail}>{user.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>
                      {user.profile_for === 'Family Member' ? (
                        <button
                          onClick={() => openModal(user._id, 'familyMembers')}
                          style={styles.linkBtn}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = COLORS.accent;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = COLORS.secondary;
                          }}
                        >
                          👨‍👩‍👧‍👦 Family
                        </button>
                      ) : (
                        <span style={styles.profileTypeBadge}>Self</span>
                      )}
                    </td>

                    <td style={styles.td}>
                      <button
                        onClick={() => openModal(user._id, 'personalInfo')}
                        style={styles.viewBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Eye size={14} />
                      </button>
                    </td>

                    <td style={styles.td}>
                      <button
                        onClick={() => openModal(user._id, 'contactProfessional')}
                        style={styles.viewBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Eye size={14} />
                      </button>
                    </td>

                    <td style={styles.td}>
                      <button
                        onClick={() => openModal(user._id, 'familyBackground')}
                        style={styles.viewBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Eye size={14} />
                      </button>
                    </td>

                    <td style={styles.td}>
                      <button
                        onClick={() => openModal(user._id, 'partnerPreference')}
                        style={styles.viewBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Eye size={14} />
                      </button>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.statusContainer}>
                        <div style={styles.statusItem}>
                          <Phone size={12} style={styles.statusIcon} />
                          <span style={getStatusStyle(user.phoneVerified)}>
                            {user.phoneVerified ? '✅' : '⏳'}
                          </span>
                        </div>
                        <div style={styles.statusItem}>
                          <Mail size={12} style={styles.statusIcon} />
                          <span style={getStatusStyle(user.emailVerified)}>
                            {user.emailVerified ? '✅' : '⏳'}
                          </span>
                        </div>
                        <div style={styles.statusItem}>
                          <CheckCircle size={12} style={styles.statusIcon} />
                          <span style={getStatusStyle(user.documentsVerified)}>
                            {user.documentsVerified ? '✅' : '⏳'}
                          </span>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={styles.pagination}
          >
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              style={{
                ...styles.pageButton,
                ...(pagination.page <= 1 ? styles.pageButtonDisabled : {})
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span style={styles.pageInfo}>
              Page {pagination.page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              style={{
                ...styles.pageButton,
                ...(pagination.page >= totalPages ? styles.pageButtonDisabled : {})
              }}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <UserBasicInfoModal
        isOpen={modals.basicInfo.isOpen}
        onClose={() => closeModal('basicInfo')}
        data={modals.basicInfo.data}
        userId={modals.basicInfo.userId}
      />
      <UserPersonalInfoModal
        isOpen={modals.personalInfo.isOpen}
        onClose={() => closeModal('personalInfo')}
        data={modals.personalInfo.data}
        userId={modals.personalInfo.userId}
      />
      <UserContactModal
        isOpen={modals.contact.isOpen}
        onClose={() => closeModal('contact')}
        data={modals.contact.data}
        userId={modals.contact.userId}
      />
      <UserFamilyBackgroundModal
        isOpen={modals.familyBackground.isOpen}
        onClose={() => closeModal('familyBackground')}
        data={modals.familyBackground.data}
        userId={modals.familyBackground.userId}
      />
      <UserPartnerPreferenceModal
        isOpen={modals.partnerPreference.isOpen}
        onClose={() => closeModal('partnerPreference')}
        data={modals.partnerPreference.data}
        userId={modals.partnerPreference.userId}
      />
      <UserFamilyMembersModal
        isOpen={modals.familyMembers.isOpen}
        onClose={() => closeModal('familyMembers')}
        data={modals.familyMembers.data}
        userId={modals.familyMembers.userId}
      />

      <Footer />
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  container: {
    flex: 1,
    padding: SPACING[6],
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[4],
    minHeight: '400px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: `4px solid rgba(255,255,255,0.05)`,
    borderTop: `4px solid ${COLORS.accent}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[6],
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },
  btnRefresh: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: 'transparent',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[4],
    flexWrap: 'wrap',
    gap: SPACING[3],
  },
  searchWrapper: {
    position: 'relative',
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING[3],
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.2)',
  },
  searchInput: {
    width: '100%',
    padding: `${SPACING[2]} ${SPACING[3]} ${SPACING[2]} ${SPACING[10]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    background: 'rgba(255,255,255,0.02)',
    color: COLORS.textWhite,
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    '::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  clearButton: {
    position: 'absolute',
    right: SPACING[3],
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.3)',
    padding: SPACING[1],
  },
  resultCount: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
    whiteSpace: 'nowrap',
  },
  tableContainer: {
    overflowX: 'auto',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1000px',
  },
  tableHeader: {
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
  },
  th: {
    padding: SPACING[3],
    textAlign: 'left',
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: `1px solid rgba(255,255,255,0.02)`,
    transition: 'background 0.3s ease',
  },
  td: {
    padding: SPACING[3],
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    verticalAlign: 'middle',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: `rgba(201, 169, 110, 0.15)`,
    color: COLORS.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    flexShrink: 0,
    border: `1px solid ${COLORS.accent}20`,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
  },
  profileTypeBadge: {
    display: 'inline-block',
    padding: `${SPACING[0.5]} ${SPACING[3]}`,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: COLORS.secondary,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    '&:hover': {
      color: COLORS.accent,
    },
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING[1]} ${SPACING[3]}`,
    background: `rgba(201, 169, 110, 0.08)`,
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}20`,
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.xs,
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 20px rgba(201, 169, 110, 0.15)`,
    },
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
  statusIcon: {
    color: 'rgba(255,255,255,0.2)',
  },
  emptyState: {
    textAlign: 'center',
    padding: SPACING[8],
    color: 'rgba(255,255,255,0.3)',
  },
  emptyIcon: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    display: 'block',
    marginBottom: SPACING[2],
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[3],
    marginTop: SPACING[6],
    padding: SPACING[3],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  pageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: 'transparent',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  pageButtonDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
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
    border: `1px solid rgba(239, 68, 68, 0.15)`,
  },
  errorIcon: {
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