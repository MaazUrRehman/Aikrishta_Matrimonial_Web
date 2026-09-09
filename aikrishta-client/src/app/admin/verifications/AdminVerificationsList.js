// // src/app/admin/verifications/AdminVerificationsList.js
// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';

// import {
//   adminGetAllVerifications,
//   adminGetStatistics,
// } from './adminVerifications';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function AdminVerificationsList() {
//   const router = useRouter();

//   const [verifications, setVerifications] = useState([]);
//   const [statistics, setStatistics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); // ✅ Frontend search only
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0,
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const [verificationsRes, statsRes] = await Promise.all([
//         adminGetAllVerifications({ page: 1, limit: 100 }),
//         adminGetStatistics(),
//       ]);

//       setVerifications(verificationsRes.data?.verifications || []);
//       setPagination(verificationsRes.data?.pagination || {});
//       setStatistics(statsRes.data);
//     } catch (err) {
//       setError(err.message || 'Failed to load data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Frontend Search - Case insensitive
//   // const filteredVerifications = useMemo(() => {
//   //   if (!searchTerm.trim()) {
//   //     return verifications;
//   //   }

//   //   const search = searchTerm.toLowerCase().trim();
//   //   return verifications.filter((verification) => {
//   //     const phone = (verification.phone || '').toLowerCase();
//   //     const email = (verification.email || '').toLowerCase();
//   //     const name = (verification.user_id?.fullName || verification.user_id?.name || '').toLowerCase();

//   //     return phone.includes(search) || email.includes(search) || name.includes(search);
//   //   });
//   // }, [verifications, searchTerm]);


//   // ✅ Frontend Search - Filter out admin users
//   const filteredVerifications = useMemo(() => {
//     let filtered = verifications.filter(v => v.user_id?.role !== 'admin' && v.user_id?.isAdmin !== true);

//     if (searchTerm.trim()) {
//       const search = searchTerm.toLowerCase().trim();
//       filtered = filtered.filter((verification) => {
//         const phone = (verification.phone || '').toLowerCase();
//         const email = (verification.email || '').toLowerCase();
//         const name = (verification.user_id?.fullName || verification.user_id?.name || '').toLowerCase();
//         return phone.includes(search) || email.includes(search) || name.includes(search);
//       });
//     }

//     return filtered;
//   }, [verifications, searchTerm]);


//   // ✅ Frontend Pagination
//   const paginatedVerifications = useMemo(() => {
//     const start = (pagination.page - 1) * pagination.limit;
//     const end = start + pagination.limit;
//     return filteredVerifications.slice(start, end);
//   }, [filteredVerifications, pagination.page, pagination.limit]);

//   const totalPages = Math.ceil(filteredVerifications.length / pagination.limit);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved': return { bg: '#DCFCE7', color: '#16A34A' };
//       case 'Rejected': return { bg: '#FEE2E2', color: '#DC2626' };
//       case 'Under Review': return { bg: '#FEF3C7', color: '#D97706' };
//       case 'Fraud Check': return { bg: '#FEF3C7', color: '#D97706' };
//       default: return { bg: '#FEF3C7', color: '#D97706' };
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPagination({
//       ...pagination,
//       page: newPage,
//     });
//   };

//   if (loading) {
//     return (
//       <div style={styles.pageWrapper}>
//         <Navbar />
//         <div style={styles.loadingContainer}>
//           <span style={styles.loadingSpinner}>⏳</span>
//           <p>Loading verifications...</p>
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
//             <h1 style={styles.title}>Verifications</h1>
//             <p style={styles.subtitle}>Manage user profile verifications</p>
//           </div>
//           <button
//             onClick={loadData}
//             style={styles.btnRefresh}
//           >
//             🔄 Refresh
//           </button>
//         </div>

//         {error && <div style={styles.error}>{error}</div>}

//         {/* Statistics */}
//         {statistics && (
//           <div style={styles.statsContainer}>
//             <div style={styles.statCard}>
//               <span style={styles.statNumber}>{statistics.totalProfiles || 0}</span>
//               <span style={styles.statLabel}>Total Profiles</span>
//             </div>
//             <div style={styles.statCard}>
//               <span style={styles.statNumber}>{statistics.pendingVerifications || 0}</span>
//               <span style={styles.statLabel}>Pending</span>
//             </div>
//             <div style={styles.statCard}>
//               <span style={styles.statNumber}>{statistics.verifiedProfiles || 0}</span>
//               <span style={styles.statLabel}>Verified</span>
//             </div>
//             <div style={styles.statCard}>
//               <span style={styles.statNumber}>{statistics.rejectedVerifications || 0}</span>
//               <span style={styles.statLabel}>Rejected</span>
//             </div>
//           </div>
//         )}

//         {/* ✅ Only Search - No Dropdown */}
//         <div style={styles.filterContainer}>
//           <div style={styles.searchWrapper}>
//             <input
//               type="text"
//               placeholder="Search by name, phone or email..."
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
//             {filteredVerifications.length} result{filteredVerifications.length !== 1 ? 's' : ''} found
//           </div>
//         </div>

//         {/* Table */}
//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeader}>
//                 <th style={styles.th}>User</th>
//                 <th style={styles.th}>Phone</th>
//                 <th style={styles.th}>Email</th>
//                 <th style={styles.th}>Docs</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedVerifications.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={styles.emptyState}>
//                     {searchTerm ? 'No matching verifications found.' : 'No pending verifications found.'}
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedVerifications.map((verification) => {
//                   const statusColor = getStatusColor(verification.profile_status);
//                   return (
//                     <tr key={verification._id} style={styles.tableRow}>
//                       <td style={styles.td}>
//                         {verification.user_id?.fullName || verification.user_id?.name || 'N/A'}
//                       </td>
//                       <td style={styles.td}>{verification.phone || 'N/A'}</td>
//                       <td style={styles.td}>{verification.email || 'N/A'}</td>
//                       <td style={styles.td}>
//                         {verification.documents?.length || 0}
//                       </td>
//                       <td style={styles.td}>
//                         <span style={{
//                           ...styles.statusBadge,
//                           background: statusColor.bg,
//                           color: statusColor.color,
//                         }}>
//                           {verification.profile_status}
//                         </span>
//                       </td>
//                       <td style={styles.td}>
//                         <button
//                           onClick={() => {
//                             const userId = verification.user_id?._id || verification.user_id;
//                             if (userId) {
//                               router.push(`/admin/verifications/${userId}`);
//                             }
//                           }}
//                           style={styles.btnView}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
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
//       <Footer />
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Styles
// |--------------------------------------------------------------------------
// */

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

//   statsContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//     gap: SPACING[4],
//     marginBottom: SPACING[6],
//   },

//   statCard: {
//     backgroundColor: COLORS.white,
//     padding: SPACING[4],
//     borderRadius: BORDER_RADIUS.base,
//     boxShadow: SHADOWS.sm,
//     textAlign: 'center',
//     border: `1px solid ${COLORS.borderLight}`,
//   },

//   statNumber: {
//     display: 'block',
//     fontSize: TYPOGRAPHY.fontSize['2xl'],
//     fontWeight: TYPOGRAPHY.fontWeight.bold,
//     color: COLORS.primary,
//   },

//   statLabel: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
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
//     transition: 'border-color 0.3s ease',
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
//   },

//   tableRow: {
//     borderBottom: `1px solid ${COLORS.border}`,
//   },

//   td: {
//     padding: SPACING[3],
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textDark,
//   },

//   statusBadge: {
//     padding: `${SPACING[1]} ${SPACING[3]}`,
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     display: 'inline-block',
//   },

//   emptyState: {
//     textAlign: 'center',
//     padding: SPACING[8],
//     color: COLORS.textGray,
//   },

//   btnView: {
//     padding: `${SPACING[1]} ${SPACING[3]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.xs,
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


























// src/app/admin/verifications/AdminVerificationsList.js
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import {
  adminGetAllVerifications,
  adminGetStatistics,
} from './adminVerifications';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function AdminVerificationsList() {
  const router = useRouter();

  const [verifications, setVerifications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [verificationsRes, statsRes] = await Promise.all([
        adminGetAllVerifications({ page: 1, limit: 100 }),
        adminGetStatistics(),
      ]);

      setVerifications(verificationsRes.data?.verifications || []);
      setPagination(verificationsRes.data?.pagination || {});
      setStatistics(statsRes.data);
    } catch (err) {
      setError(err.message || 'Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const filteredVerifications = useMemo(() => {
    let filtered = verifications.filter(v => v.user_id?.role !== 'admin' && v.user_id?.isAdmin !== true);

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((verification) => {
        const phone = (verification.phone || '').toLowerCase();
        const email = (verification.email || '').toLowerCase();
        const name = (verification.user_id?.fullName || verification.user_id?.name || '').toLowerCase();
        return phone.includes(search) || email.includes(search) || name.includes(search);
      });
    }

    return filtered;
  }, [verifications, searchTerm]);

  const paginatedVerifications = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    return filteredVerifications.slice(start, end);
  }, [filteredVerifications, pagination.page, pagination.limit]);

  const totalPages = Math.ceil(filteredVerifications.length / pagination.limit);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', border: 'rgba(34, 197, 94, 0.2)' };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' };
      case 'Under Review': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' };
      case 'Fraud Check': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', border: 'rgba(139, 92, 246, 0.2)' };
      default: return { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.05)' };
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading verifications...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const statCards = [
    { icon: <Users size={20} />, label: 'Total Profiles', value: statistics?.totalProfiles || 0, color: COLORS.accent },
    { icon: <Clock size={20} />, label: 'Pending', value: statistics?.pendingVerifications || 0, color: '#F59E0B' },
    { icon: <CheckCircle size={20} />, label: 'Verified', value: statistics?.verifiedProfiles || 0, color: '#22C55E' },
    { icon: <XCircle size={20} />, label: 'Rejected', value: statistics?.rejectedVerifications || 0, color: '#EF4444' },
  ];

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.header}
        >
          <div>
            <h1 style={styles.title}>Verifications</h1>
            <p style={styles.subtitle}>Manage user profile verifications</p>
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

        {/* Statistics Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={styles.statsContainer}
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              style={styles.statCard}
            >
              <div style={{ ...styles.statIcon, color: stat.color }}>
                {stat.icon}
              </div>
              <div style={styles.statInfo}>
                <span style={styles.statNumber}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.filterContainer}
        >
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
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
            {filteredVerifications.length} result{filteredVerifications.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="responsive-table-container"
          style={styles.tableContainer}
        >
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Docs</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVerifications.length === 0 ? (
                <tr>
                  <td colSpan="6" style={styles.emptyState}>
                    <span style={styles.emptyIcon}>📭</span>
                    <p>{searchTerm ? 'No matching verifications found.' : 'No pending verifications found.'}</p>
                  </td>
                </tr>
              ) : (
                paginatedVerifications.map((verification, index) => {
                  const statusColor = getStatusColor(verification.profile_status);
                  return (
                    <motion.tr
                      key={verification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      style={styles.tableRow}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      <td style={styles.td}>
                        <span style={styles.userName}>
                          {verification.user_id?.fullName || verification.user_id?.name || 'N/A'}
                        </span>
                      </td>
                      <td style={styles.td}>{verification.phone || 'N/A'}</td>
                      <td style={styles.td}>{verification.email || 'N/A'}</td>
                      <td style={styles.td}>
                        <span style={styles.docCount}>
                          {verification.documents?.length || 0}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          background: statusColor.bg,
                          color: statusColor.color,
                          borderColor: statusColor.border,
                        }}>
                          {verification.profile_status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => {
                            const userId = verification.user_id?._id || verification.user_id;
                            if (userId) {
                              router.push(`/admin/verifications/${userId}`);
                            }
                          }}
                          style={styles.btnView}
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
                          View
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
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
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: SPACING[4],
    marginBottom: SPACING[6],
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  statNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
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
  },
  userName: {
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  docCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '28px',
    padding: `0 ${SPACING[2]}`,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  statusBadge: {
    padding: `${SPACING[0.5]} ${SPACING[3]}`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    display: 'inline-block',
    borderWidth: '1px',
    borderStyle: 'solid',
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
  btnView: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[1]} ${SPACING[4]}`,
    background: `rgba(201, 169, 110, 0.08)`,
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}20`,
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
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