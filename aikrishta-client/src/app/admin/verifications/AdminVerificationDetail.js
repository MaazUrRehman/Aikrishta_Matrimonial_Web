// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';



// import {
//   adminGetVerificationDetail,
//   adminVerifyDocuments,
//   adminUpdateProfileStatus,
//   adminRunFraudDetection,
//   adminGetFraudDetection,
// } from './adminVerifications';

// import {
//   COLORS,
//   TYPOGRAPHY,
//   SPACING,
//   SHADOWS,
//   BORDER_RADIUS,
// } from '@/constants/theme';

// export default function AdminVerificationDetail({ userId }) {
//   const router = useRouter();

//   const [verification, setVerification] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [remarks, setRemarks] = useState('');
//   const [step, setStep] = useState(1);
//   const [documentAction, setDocumentAction] = useState(null); // 'verified' or 'rejected'
//   const [showRemarks, setShowRemarks] = useState(false);
//   const [fraudReport, setFraudReport] = useState(null);
//   // const [fraudLoading, setFraudLoading] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       loadDetail();
//     }
//   }, [userId]);




//   const loadDetail = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await adminGetVerificationDetail(userId);

//       const data = response.data;
//       setVerification(data);

//       try {
//         const report = await adminGetFraudDetection(userId);
//         setFraudReport(report.report);
//       } catch {
//         setFraudReport(null);
//       }

//       const docs = data?.documents || [];

//       const allProcessed =
//         docs.length > 0 &&
//         docs.every(
//           (doc) =>
//             doc.document_verified === true ||
//             doc.document_verified === false
//         );

//       const allVerified =
//         docs.length > 0 &&
//         docs.every((doc) => doc.document_verified === true);

//       const hasRemarks =
//         data?.admin_remarks &&
//         data.admin_remarks.trim().length > 0;

//       // Default
//       setStep(1);
//       setDocumentAction(null);

//       if (docs.length === 0) {
//         setRemarks('');
//       } else if (allProcessed && allVerified) {
//         // Documents verified
//         setDocumentAction('verified');

//         if (hasRemarks) {
//           // Remarks already submitted → Step 2
//           setStep(2);
//           setRemarks(data.admin_remarks);
//         } else {
//           // Documents verified but remarks not submitted
//           setStep(1);
//           setRemarks('Documents verified successfully');
//         }
//       } else if (allProcessed && !allVerified) {
//         setDocumentAction('rejected');

//         if (hasRemarks) {
//           setStep(2);
//           setRemarks(data.admin_remarks);
//         } else {
//           setStep(1);
//           setRemarks('Documents rejected - please provide reason');
//         }
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to load verification detail.');
//     } finally {
//       setLoading(false);
//     }
//   };




//   const handleVerifyDocuments = async (verified) => {
//     setProcessing(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Ensure verified is boolean
//       const isVerified = verified === true || verified === 'true';

//       console.log('Sending verification request:', {
//         user_id: userId,
//         verified: isVerified,
//         remarks: isVerified
//           ? 'Documents verified successfully'
//           : 'Documents rejected - please provide reason',
//       });

//       const response = await adminVerifyDocuments({
//         user_id: userId,
//         verified: isVerified,
//       });

//       console.log('Verify documents response:', response);

//       if (isVerified) {
//         setSuccess('Documents verified successfully, Please add your remarks!!');
//         setDocumentAction('verified');
//         setRemarks('Documents verified successfully');
//       } else {
//         setSuccess('Documents rejected successfully.');
//         setDocumentAction('rejected');
//         setRemarks('Documents rejected - please provide reason');
//       }

//       // Show remarks section after document verification
//       setShowRemarks(true);

//       // Stay on Step 1 until remarks are submitted
//       setStep(1);

//       // ❌ Don't call loadDetail() here
//       // await loadDetail();

//     } catch (err) {
//       setError(err.message || 'Failed to verify documents.');
//     } finally {
//       setProcessing(false);
//     }
//   };


//   // Step 1: Fraud Detection
//   const handleFraudDetection = async () => {
//     setProcessing(true);
//     setError('');
//     setSuccess('');

//     try {
//       await adminRunFraudDetection(userId);

//       setSuccess("Fraud detection completed successfully.");
//       await loadDetail();
//     } catch (err) {
//       setError(err.message || 'Failed to perform fraud detection.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Step 2: Add Remarks
//   // const handleAddRemarks = async () => {
//   //   if (!remarks.trim()) {
//   //     setError('Please enter remarks before adding.');
//   //     return;
//   //   }

//   //   setProcessing(true);
//   //   setError('');
//   //   setSuccess('');

//   //   try {
//   //     await adminUpdateProfileStatus({
//   //       user_id: userId,
//   //       profile_status: verification?.profile_status || 'Under Review',
//   //       remarks: remarks,
//   //     });

//   //     setSuccess('Remarks added successfully.');
//   //     await loadDetail();
//   //     setStep(3);
//   //   } catch (err) {
//   //     setError(err.message || 'Failed to add remarks.');
//   //   } finally {
//   //     setProcessing(false);
//   //   }
//   // };


//   // Step 1: Add Remarks (Now in Step 1 itself)
//   // const handleAddRemarks = async () => {
//   //   if (!remarks.trim()) {
//   //     setError('Please enter remarks before adding.');
//   //     return;
//   //   }

//   //   setProcessing(true);
//   //   setError('');
//   //   setSuccess('');

//   //   try {
//   //     await adminUpdateProfileStatus({
//   //       user_id: userId,
//   //       profile_status: verification?.profile_status || 'Under Review',
//   //       remarks: remarks,
//   //     });

//   //     setSuccess('Remarks added successfully.');
//   //     await loadDetail();

//   //     // ✅ After remarks added, move to Step 2
//   //     setStep(2);

//   //   } catch (err) {
//   //     setError(err.message || 'Failed to add remarks.');
//   //   } finally {
//   //     setProcessing(false);
//   //   }
//   // };

//   const handleAddRemarks = async () => {
//     if (!remarks.trim()) {
//       setError('Please enter remarks before adding.');
//       return;
//     }

//     setProcessing(true);
//     setError('');
//     setSuccess('');

//     try {
//       await adminUpdateProfileStatus({
//         user_id: userId,
//         profile_status: verification?.profile_status || 'Under Review',
//         remarks,
//       });

//       setSuccess('Remarks added successfully.');

//       // Reload latest data
//       await loadDetail();

//       // Move to Step 2 only after remarks are submitted
//       setStep(2);

//     } catch (err) {
//       setError(err.message || 'Failed to add remarks.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Step 3: Update Status
//   const handleUpdateStatus = async (status) => {
//     setProcessing(true);
//     setError('');
//     setSuccess('');

//     try {
//       await adminUpdateProfileStatus({
//         user_id: userId,
//         profile_status: status,
//         remarks,
//       });

//       setSuccess(`Profile status updated to ${status}.`);

//       setTimeout(() => {
//         router.push('/admin/verifications');
//       }, 500);

//     } catch (err) {
//       setError(err.message || 'Failed to update profile status.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleBack = () => {
//     router.push('/admin/verifications');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved': return { bg: '#DCFCE7', color: '#16A34A' };
//       case 'Rejected': return { bg: '#FEE2E2', color: '#DC2626' };
//       default: return { bg: '#FEF3C7', color: '#D97706' };
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.pageWrapper}>
//         <Navbar />
//         <div style={styles.loadingContainer}>
//           <span style={styles.loadingSpinner}>⏳</span>
//           <p>Loading verification detail...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error && !verification) {
//     return (
//       <div style={styles.pageWrapper}>
//         <Navbar />
//         <div style={styles.container}>
//           <div style={styles.card}>
//             <div style={styles.error}>
//               <span style={styles.errorIcon}>❌</span>
//               <p>{error}</p>
//               <button
//                 onClick={handleBack}
//                 style={styles.btnSecondary}
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const statusColor = getStatusColor(verification?.profile_status);

//   return (
//     <div style={styles.pageWrapper}>
//       <Navbar />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           {/* Header */}
//           <div style={styles.header}>
//             <div>
//               <h1 style={styles.title}>Verification Detail</h1>
//               <p style={styles.subtitle}>
//                 User: {verification?.user_id?.fullName || verification?.user_id?.name || 'N/A'}
//               </p>
//               <p style={styles.stepIndicator}>
//                 Step {step}/2: {step === 1 ? 'Document Verification & Remarks' : 'Update Status'}
//               </p>
//             </div>
//             <button
//               onClick={handleBack}
//               style={styles.btnBack}
//             >
//               ← Back to List
//             </button>
//           </div>

//           {error && <div style={styles.error}>{error}</div>}
//           {success && <div style={styles.success}>{success}</div>}

//           {/* Status Badge */}
//           <div style={{ ...styles.badge, background: statusColor.bg, color: statusColor.color }}>
//             Status: {verification?.profile_status}
//           </div>

//           {/* User Info */}
//           <div style={styles.infoGrid}>
//             <div style={styles.infoItem}>
//               <span style={styles.infoLabel}>📞 Phone</span>
//               <span style={styles.infoValue}>{verification?.phone || 'N/A'}</span>
//               <span style={verification?.phone_verified ? styles.verified : styles.unverified}>
//                 {verification?.phone_verified ? '✅ Verified' : '⏳ Pending'}
//               </span>
//             </div>
//             <div style={styles.infoItem}>
//               <span style={styles.infoLabel}>✉️ Email</span>
//               <span style={styles.infoValue}>{verification?.email || 'N/A'}</span>
//               <span style={verification?.email_verified ? styles.verified : styles.unverified}>
//                 {verification?.email_verified ? '✅ Verified' : '⏳ Pending'}
//               </span>
//             </div>
//           </div>

//           {/* Documents */}
//           <div style={styles.documentsSection}>
//             <h3 style={styles.sectionTitle}>📄 Documents</h3>
//             {verification?.documents?.length === 0 ? (
//               <p style={styles.emptyText}>No documents uploaded.</p>
//             ) : (
//               <div style={styles.documentsGrid}>
//                 {verification?.documents?.map((doc, index) => (
//                   <div key={doc._id || index} style={styles.documentCard}>
//                     <span style={styles.documentType}>{doc.type}</span>
//                     <a
//                       href={doc.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={styles.documentLink}
//                     >
//                       View
//                     </a>
//                     <span style={doc.document_verified ? styles.verified : styles.unverified}>
//                       {doc.document_verified ? '✅ Verified' : '⏳ Pending'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Remarks Section - Step 2 ya 3 mein dikhega */}
//           {step === 2 && !showRemarks && (
//             <div style={styles.remarksSection}>
//               <label style={styles.label}>Admin Remarks</label>

//               <textarea
//                 value={remarks}
//                 readOnly
//                 rows="3"
//                 style={{
//                   ...styles.textarea,
//                   backgroundColor: "#f3f4f6",
//                   cursor: "not-allowed",
//                 }}
//               />
//             </div>
//           )}

//           {/* Actions */}
//           {/* Actions */}
//           <div style={styles.actionsSection}>
//             <h3 style={styles.sectionTitle}>Actions</h3>

//             {/* Step 1: Document Verification + Fraud Detection + Remarks */}
//             {step === 1 && (
//               <>
//                 <div style={styles.actionGroup}>
//                   <h4 style={styles.actionTitle}>Document Verification</h4>
//                   <div style={styles.buttonGroup}>
//                     <button
//                       onClick={() => handleVerifyDocuments(true)}
//                       disabled={processing}
//                       style={styles.btnSuccess}
//                     >
//                       ✅ Verify Documents
//                     </button>
//                     <button
//                       onClick={() => handleVerifyDocuments(false)}
//                       disabled={processing}
//                       style={styles.btnDanger}
//                     >
//                       ❌ Reject Documents
//                     </button>
//                   </div>
//                 </div>

//                 <div style={styles.actionGroup}>
//                   <h4 style={styles.actionTitle}>Fraud Detection</h4>
//                   <button
//                     onClick={handleFraudDetection}
//                     disabled={processing}
//                     style={styles.btnPrimary}
//                   >
//                     {processing
//                       ? "Running..."
//                       : "Run Fraud Detection"}
//                   </button>
//                 </div>
//                 {fraudReport && (

//                   <div className="mt-6 rounded-lg border p-4">

//                     <h3 className="font-bold text-lg mb-4">
//                       AI Fraud Detection
//                     </h3>

//                     <p>
//                       <b>Overall Risk:</b>
//                       {" "}
//                       {fraudReport.overall_risk}
//                     </p>

//                     <p>
//                       <b>Confidence:</b>
//                       {" "}
//                       {fraudReport.confidence}%
//                     </p>

//                     <p>
//                       <b>Edited:</b>
//                       {" "}
//                       {fraudReport.edited}
//                     </p>

//                     <p>
//                       <b>Tampering:</b>
//                       {" "}
//                       {fraudReport.tampering}
//                     </p>

//                     <p>
//                       <b>Blur:</b>
//                       {" "}
//                       {fraudReport.blur}
//                     </p>

//                     <p>
//                       <b>OCR Issues:</b>
//                       {" "}
//                       {fraudReport.ocr_issues}
//                     </p>

//                     <p>
//                       <b>Remarks:</b>
//                       {" "}
//                       {fraudReport.remarks}
//                     </p>

//                     <p className="text-xs text-gray-500 mt-3">
//                       Analyzed:
//                       {" "}
//                       {fraudReport.analyzed_at
//                         ? new Date(fraudReport.analyzed_at).toLocaleString()
//                         : "N/A"}
//                     </p>

//                   </div>

//                 )}

//                 {/* Remarks - Always visible in Step 1 */}
//                 {/* Show Remarks only after Verify/Reject Documents */}
//                 {showRemarks && (
//                   <div style={styles.remarksSection}>
//                     <label style={styles.label}>
//                       Admin Remarks
//                     </label>

//                     <div style={styles.remarksContainer}>
//                       <textarea
//                         value={remarks}
//                         onChange={(e) => setRemarks(e.target.value)}
//                         placeholder="Enter remarks..."
//                         style={styles.textarea}
//                         rows="3"
//                       />

//                       <button
//                         onClick={handleAddRemarks}
//                         disabled={processing || !remarks.trim()}
//                         style={{
//                           ...styles.btnAddRemarks,
//                           opacity: (!remarks.trim() || processing) ? 0.6 : 1,
//                           cursor: (!remarks.trim() || processing) ? 'not-allowed' : 'pointer',
//                         }}
//                       >
//                         {processing ? 'Adding...' : '📝 Add Remarks'}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Step 2: Update Status */}
//             {step === 2 && (
//               <div style={styles.actionGroup}>
//                 <h4 style={styles.actionTitle}>Update Status</h4>
//                 <div style={styles.buttonGroup}>
//                   <button
//                     onClick={() => handleUpdateStatus('Approved')}
//                     disabled={processing}
//                     style={styles.btnSuccess}
//                   >
//                     ✅ Approve Profile
//                   </button>
//                   <button
//                     onClick={() => handleUpdateStatus('Rejected')}
//                     disabled={processing}
//                     style={styles.btnDanger}
//                   >
//                     ❌ Reject Profile
//                   </button>
//                   <button
//                     onClick={() => handleUpdateStatus('Under Review')}
//                     disabled={processing}
//                     style={styles.btnSecondary}
//                   >
//                     🔄 Under Review
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

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

//   card: {
//     maxWidth: '900px',
//     margin: '0 auto',
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS['2xl'],
//     padding: SPACING[8],
//     boxShadow: SHADOWS.xl,
//     border: `1px solid ${COLORS.borderLight}`,
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
//     alignItems: 'flex-start',
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

//   stepIndicator: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.secondary,
//     marginTop: SPACING[1],
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//   },

//   btnBack: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.white,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },

//   badge: {
//     display: 'inline-block',
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     borderRadius: BORDER_RADIUS.full,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     marginBottom: SPACING[6],
//     textAlign: 'center',
//     width: '100%',
//   },

//   infoGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: SPACING[4],
//     marginBottom: SPACING[6],
//   },

//   infoItem: {
//     padding: SPACING[3],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.base,
//   },

//   infoLabel: {
//     display: 'block',
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     color: COLORS.textGray,
//     marginBottom: SPACING[1],
//   },

//   infoValue: {
//     display: 'block',
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//   },

//   verified: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: '#16A34A',
//   },

//   unverified: {
//     fontSize: TYPOGRAPHY.fontSize.xs,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: '#D97706',
//   },

//   documentsSection: {
//     marginBottom: SPACING[6],
//   },

//   sectionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     fontWeight: TYPOGRAPHY.fontWeight.semibold,
//     color: COLORS.textDark,
//     marginBottom: SPACING[3],
//   },

//   documentsGrid: {
//     display: 'grid',
//     gap: SPACING[2],
//   },

//   documentCard: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SPACING[3],
//     backgroundColor: COLORS.backgroundLight,
//     borderRadius: BORDER_RADIUS.base,
//   },

//   documentType: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//   },

//   documentLink: {
//     color: COLORS.secondary,
//     textDecoration: 'none',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },

//   emptyText: {
//     color: COLORS.textGray,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     textAlign: 'center',
//     padding: SPACING[4],
//   },

//   remarksSection: {
//     marginBottom: SPACING[6],
//   },

//   label: {
//     display: 'block',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//     marginBottom: SPACING[2],
//   },

//   remarksContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: SPACING[2],
//   },

//   textarea: {
//     width: '100%',
//     padding: SPACING[3],
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     resize: 'vertical',
//     outline: 'none',
//     backgroundColor: COLORS.white,
//   },

//   btnAddRemarks: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: '#2563EB',
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     cursor: 'pointer',
//     alignSelf: 'flex-start',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       backgroundColor: '#1D4ED8',
//     },
//   },

//   remarksStatus: {
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: '#16A34A',
//     marginTop: SPACING[2],
//     padding: SPACING[2],
//     backgroundColor: '#DCFCE7',
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid #BBF7D0`,
//   },

//   actionsSection: {
//     borderTop: `1px solid ${COLORS.border}`,
//     paddingTop: SPACING[6],
//   },

//   actionGroup: {
//     marginBottom: SPACING[4],
//   },

//   actionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     color: COLORS.textDark,
//     marginBottom: SPACING[2],
//   },

//   buttonGroup: {
//     display: 'flex',
//     gap: SPACING[2],
//     flexWrap: 'wrap',
//   },

//   btnPrimary: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.secondary,
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     '&:disabled': {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//     },
//   },

//   btnSuccess: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: '#16A34A',
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     '&:disabled': {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//     },
//   },

//   btnDanger: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: '#DC2626',
//     color: COLORS.textWhite,
//     border: 'none',
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     '&:disabled': {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//     },
//   },

//   btnSecondary: {
//     padding: `${SPACING[2]} ${SPACING[4]}`,
//     backgroundColor: COLORS.white,
//     color: COLORS.primary,
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: BORDER_RADIUS.base,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
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

//   errorIcon: {
//     fontSize: TYPOGRAPHY.fontSize['4xl'],
//     display: 'block',
//     marginBottom: SPACING[3],
//   },

//   infoMessage: {
//     backgroundColor: '#EFF6FF',
//     color: '#2563EB',
//     padding: SPACING[3],
//     borderRadius: BORDER_RADIUS.base,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     marginTop: SPACING[2],
//     textAlign: 'center',
//     border: `1px solid #BFDBFE`,
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






















// src/app/admin/verifications/AdminVerificationDetail.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Phone,
  Mail,
  User,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import {
  adminGetVerificationDetail,
  adminVerifyDocuments,
  adminUpdateProfileStatus,
  adminRunFraudDetection,
  adminGetFraudDetection,
} from './adminVerifications';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function AdminVerificationDetail({ userId }) {
  const router = useRouter();

  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [remarks, setRemarks] = useState('');
  const [step, setStep] = useState(1);
  const [documentAction, setDocumentAction] = useState(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [fraudReport, setFraudReport] = useState(null);

  useEffect(() => {
    if (userId) {
      loadDetail();
    }
  }, [userId]);

  const loadDetail = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await adminGetVerificationDetail(userId);
      const data = response.data;
      setVerification(data);

      try {
        const report = await adminGetFraudDetection(userId);
        setFraudReport(report.report);
      } catch {
        setFraudReport(null);
      }

      const docs = data?.documents || [];
      const allProcessed = docs.length > 0 && docs.every(doc => doc.document_verified === true || doc.document_verified === false);
      const allVerified = docs.length > 0 && docs.every(doc => doc.document_verified === true);
      const hasRemarks = data?.admin_remarks && data.admin_remarks.trim().length > 0;

      setStep(1);
      setDocumentAction(null);

      if (docs.length === 0) {
        setRemarks('');
      } else if (allProcessed && allVerified) {
        setDocumentAction('verified');
        if (hasRemarks) {
          setStep(2);
          setRemarks(data.admin_remarks);
        } else {
          setStep(1);
          setRemarks('Documents verified successfully');
        }
      } else if (allProcessed && !allVerified) {
        setDocumentAction('rejected');
        if (hasRemarks) {
          setStep(2);
          setRemarks(data.admin_remarks);
        } else {
          setStep(1);
          setRemarks('Documents rejected - please provide reason');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load verification detail.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDocuments = async (verified) => {
    setProcessing(true);
    setError('');
    setSuccess('');

    try {
      const isVerified = verified === true || verified === 'true';
      await adminVerifyDocuments({ user_id: userId, verified: isVerified });

      if (isVerified) {
        setSuccess('Documents verified successfully!');
        setDocumentAction('verified');
        setRemarks('Documents verified successfully');
      } else {
        setSuccess('Documents rejected successfully.');
        setDocumentAction('rejected');
        setRemarks('Documents rejected - please provide reason');
      }

      setShowRemarks(true);
      setStep(1);
    } catch (err) {
      setError(err.message || 'Failed to verify documents.');
    } finally {
      setProcessing(false);
    }
  };

  const handleFraudDetection = async () => {
    setProcessing(true);
    setError('');
    setSuccess('');

    try {
      await adminRunFraudDetection(userId);
      setSuccess("Fraud detection completed successfully.");
      await loadDetail();
    } catch (err) {
      setError(err.message || 'Failed to perform fraud detection.');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddRemarks = async () => {
    if (!remarks.trim()) {
      setError('Please enter remarks before adding.');
      return;
    }

    setProcessing(true);
    setError('');
    setSuccess('');

    try {
      await adminUpdateProfileStatus({
        user_id: userId,
        profile_status: verification?.profile_status || 'Under Review',
        remarks,
      });

      setSuccess('Remarks added successfully.');
      await loadDetail();
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to add remarks.');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateStatus = async (status) => {
    setProcessing(true);
    setError('');
    setSuccess('');

    try {
      await adminUpdateProfileStatus({
        user_id: userId,
        profile_status: status,
        remarks,
      });

      setSuccess(`Profile status updated to ${status}.`);
      setTimeout(() => {
        router.push('/admin/verifications');
      }, 500);
    } catch (err) {
      setError(err.message || 'Failed to update profile status.');
    } finally {
      setProcessing(false);
    }
  };

  const handleBack = () => {
    router.push('/admin/verifications');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', border: 'rgba(34, 197, 94, 0.2)' };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' };
      default: return { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' };
    }
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading verification details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const statusColor = getStatusColor(verification?.profile_status);

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
        >
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <button
                onClick={handleBack}
                style={styles.btnBack}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <div>
                <h1 style={styles.title}>Verification Detail</h1>
                <p style={styles.subtitle}>
                  <User size={14} style={styles.subIcon} />
                  {verification?.user_id?.fullName || verification?.user_id?.name || 'N/A'}
                </p>
                <p style={styles.stepIndicator}>
                  Step {step}/2: {step === 1 ? 'Document Verification & Remarks' : 'Update Status'}
                </p>
              </div>
            </div>
            <div style={styles.headerRight}>
              <button
                onClick={loadDetail}
                style={styles.btnRefresh}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              <AlertTriangle size={16} />
              {error}
            </div>
          )}
          {success && (
            <div style={styles.success}>
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          {/* Status Badge */}
          <div style={{
            ...styles.badge,
            background: statusColor.bg,
            color: statusColor.color,
            borderColor: statusColor.border,
          }}>
            <Shield size={16} />
            Status: {verification?.profile_status || 'Pending'}
          </div>

          {/* User Info */}
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Phone size={16} style={styles.infoIcon} />
              <span style={styles.infoLabel}>Phone</span>
              <span style={styles.infoValue}>{verification?.phone || 'N/A'}</span>
              <span style={verification?.phone_verified ? styles.verified : styles.unverified}>
                {verification?.phone_verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
            <div style={styles.infoItem}>
              <Mail size={16} style={styles.infoIcon} />
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{verification?.email || 'N/A'}</span>
              <span style={verification?.email_verified ? styles.verified : styles.unverified}>
                {verification?.email_verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
          </div>

          {/* Documents */}
          <div style={styles.documentsSection}>
            <h3 style={styles.sectionTitle}>
              <FileText size={18} style={styles.sectionIcon} />
              Documents
            </h3>
            {verification?.documents?.length === 0 ? (
              <p style={styles.emptyText}>No documents uploaded.</p>
            ) : (
              <div style={styles.documentsGrid}>
                {verification?.documents?.map((doc, index) => (
                  <motion.div
                    key={doc._id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={styles.documentCard}
                  >
                    <span style={styles.documentType}>{doc.type}</span>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.documentLink}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.secondary;
                      }}
                    >
                      <Eye size={14} />
                      View
                    </a>
                    <span style={doc.document_verified ? styles.verified : styles.unverified}>
                      {doc.document_verified ? '✅ Verified' : '⏳ Pending'}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={styles.actionsSection}>
            <h3 style={styles.sectionTitle}>Actions</h3>

            {step === 1 && (
              <>
                <div style={styles.actionGroup}>
                  <h4 style={styles.actionTitle}>Document Verification</h4>
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => handleVerifyDocuments(true)}
                      disabled={processing}
                      style={styles.btnVerify}
                      onMouseEnter={(e) => {
                        if (!processing) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 8px 30px rgba(201, 169, 110, 0.3)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.15)`;
                      }}
                    >
                      <CheckCircle size={16} />
                      Verify Documents
                    </button>
                    <button
                      onClick={() => handleVerifyDocuments(false)}
                      disabled={processing}
                      style={styles.btnReject}
                      onMouseEnter={(e) => {
                        if (!processing) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.4)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.2)`;
                      }}
                    >
                      <XCircle size={16} />
                      Reject Documents
                    </button>
                  </div>
                </div>

                <div style={styles.actionGroup}>
                  <h4 style={styles.actionTitle}>Fraud Detection</h4>
                  <button
                    onClick={handleFraudDetection}
                    disabled={processing}
                    style={styles.btnPrimary}
                    onMouseEnter={(e) => {
                      if (!processing) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.4)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.2)`;
                    }}
                  >
                    {processing ? (
                      <>
                        <span style={styles.spinnerSmall}></span>
                        Running...
                      </>
                    ) : (
                      <>
                        <Shield size={16} />
                        Run Fraud Detection
                      </>
                    )}
                  </button>
                </div>

                {/* {fraudReport && (
                  <div style={styles.fraudReport}>
                    <h4 style={styles.fraudTitle}>AI Fraud Detection Report</h4>
                    <div style={styles.fraudGrid}>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Overall Risk</span>
                        <span style={{
                          ...styles.fraudValue,
                          color: fraudReport.overall_risk === 'High' ? '#EF4444' :
                                 fraudReport.overall_risk === 'Medium' ? '#F59E0B' : '#22C55E'
                        }}>
                          {fraudReport.overall_risk}
                        </span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Confidence</span>
                        <span style={styles.fraudValue}>{fraudReport.confidence}%</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Edited</span>
                        <span style={styles.fraudValue}>{fraudReport.edited || 'No'}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Tampering</span>
                        <span style={styles.fraudValue}>{fraudReport.tampering}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Blur</span>
                        <span style={styles.fraudValue}>{fraudReport.blur}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>OCR Issues</span>
                        <span style={styles.fraudValue}>{fraudReport.ocr_issues || 'No'}</span>
                      </div>
                    </div>
                    <p style={styles.fraudRemarks}>
                      <strong>Remarks:</strong> {fraudReport.remarks}
                    </p>
                    <p style={styles.fraudTime}>
                      Analyzed: {fraudReport.analyzed_at ? new Date(fraudReport.analyzed_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                )} */}


                {fraudReport && (
                  <div style={styles.fraudReport}>
                    <h4 style={styles.fraudTitle}>AI Fraud Detection Report</h4>
                    {/* ✅ 6 items in single row */}
                    <div style={styles.fraudGridSingle}>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Overall Risk</span>
                        <span style={{
                          ...styles.fraudValue,
                          color: fraudReport.overall_risk === 'High' ? '#EF4444' :
                            fraudReport.overall_risk === 'Medium' ? '#F59E0B' : '#22C55E'
                        }}>
                          {fraudReport.overall_risk}
                        </span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Confidence</span>
                        <span style={styles.fraudValue}>{fraudReport.confidence}%</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Edited</span>
                        <span style={styles.fraudValue}>{fraudReport.edited || 'No'}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Tampering</span>
                        <span style={styles.fraudValue}>{fraudReport.tampering}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>Blur</span>
                        <span style={styles.fraudValue}>{fraudReport.blur}</span>
                      </div>
                      <div style={styles.fraudItem}>
                        <span style={styles.fraudLabel}>OCR Issues</span>
                        <span style={styles.fraudValue}>{fraudReport.ocr_issues || 'No'}</span>
                      </div>
                    </div>
                    <p style={styles.fraudRemarks}>
                      <strong>Remarks:</strong> {fraudReport.remarks}
                    </p>
                    <p style={styles.fraudTime}>
                      Analyzed: {fraudReport.analyzed_at ? new Date(fraudReport.analyzed_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                )}

                {showRemarks && (
                  <div style={styles.remarksSection}>
                    <label style={styles.label}>Admin Remarks</label>
                    <div style={styles.remarksContainer}>
                      <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter remarks..."
                        style={styles.textarea}
                        rows="3"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = COLORS.accent;
                          e.currentTarget.style.boxShadow = `0 0 30px rgba(201, 169, 110, 0.05)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      <button
                        onClick={handleAddRemarks}
                        disabled={processing || !remarks.trim()}
                        style={{
                          ...styles.btnAddRemarks,
                          opacity: (!remarks.trim() || processing) ? 0.6 : 1,
                          cursor: (!remarks.trim() || processing) ? 'not-allowed' : 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          if (remarks.trim() && !processing) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 8px 30px rgba(201, 169, 110, 0.2)`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {processing ? 'Adding...' : '📝 Add Remarks'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* {step === 2 && (
              <div style={styles.actionGroup}>
                <h4 style={styles.actionTitle}>Update Status</h4>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => handleUpdateStatus('Approved')}
                    disabled={processing}
                    style={styles.btnSuccess}
                  >
                    <CheckCircle size={16} />
                    Approve Profile
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('Rejected')}
                    disabled={processing}
                    style={styles.btnDanger}
                  >
                    <XCircle size={16} />
                    Reject Profile
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('Under Review')}
                    disabled={processing}
                    style={styles.btnSecondary}
                  >
                    <Clock size={16} />
                    Under Review
                  </button>
                </div>
              </div>
            )} */}

            {step === 2 && (
              <div style={styles.actionGroup}>
                <h4 style={styles.actionTitle}>Update Status</h4>
                <div style={styles.buttonGroup}>
                  {/* ✅ Approve - Gold/Green theme */}
                  <button
                    onClick={() => handleUpdateStatus('Approved')}
                    disabled={processing}
                    style={styles.btnApprove}
                    onMouseEnter={(e) => {
                      if (!processing) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 8px 30px rgba(201, 169, 110, 0.4)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                    }}
                  >
                    <CheckCircle size={16} />
                    Approve Profile
                  </button>

                  {/* ✅ Reject - Red/Pink theme */}
                  <button
                    onClick={() => handleUpdateStatus('Rejected')}
                    disabled={processing}
                    style={styles.btnRejectStatus}
                    onMouseEnter={(e) => {
                      if (!processing) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.4)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.2)`;
                    }}
                  >
                    <XCircle size={16} />
                    Reject Profile
                  </button>

                  {/* ✅ Under Review - Gold theme (light) */}
                  <button
                    onClick={() => handleUpdateStatus('Under Review')}
                    disabled={processing}
                    style={styles.btnUnderReview}
                    onMouseEnter={(e) => {
                      if (!processing) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = COLORS.accent;
                        e.currentTarget.style.color = COLORS.accent;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    <Clock size={16} />
                    Under Review
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
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
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.04)`,
    boxShadow: SHADOWS.xl,
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
  spinnerSmall: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
    marginRight: SPACING[2],
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING[6],
    paddingBottom: SPACING[4],
    borderBottom: `1px solid rgba(255,255,255,0.04)`,
  },
  headerLeft: {
    display: 'flex',
    gap: SPACING[4],
    alignItems: 'flex-start',
  },
  headerRight: {
    display: 'flex',
    gap: SPACING[3],
  },
  btnBack: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
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
  btnRefresh: {
    padding: SPACING[2],
    background: 'transparent',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    color: 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },
  subIcon: {
    color: 'rgba(255,255,255,0.3)',
  },
  stepIndicator: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.accent,
    marginTop: SPACING[1],
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: SPACING[6],
    textAlign: 'center',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[4],
    marginBottom: SPACING[6],
  },
  infoItem: {
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  infoIcon: {
    color: COLORS.accent,
    opacity: 0.5,
    marginBottom: SPACING[1],
  },
  infoLabel: {
    display: 'block',
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    marginBottom: SPACING[0.5],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoValue: {
    display: 'block',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
  },
  verified: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: '#22C55E',
    marginTop: SPACING[0.5],
    display: 'inline-block',
  },
  unverified: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: '#F59E0B',
    marginTop: SPACING[0.5],
    display: 'inline-block',
  },
  documentsSection: {
    marginBottom: SPACING[6],
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginBottom: SPACING[3],
  },
  sectionIcon: {
    color: COLORS.accent,
  },
  documentsGrid: {
    display: 'grid',
    gap: SPACING[2],
  },
  documentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING[3],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  documentType: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.7)',
  },
  documentLink: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    color: COLORS.secondary,
    textDecoration: 'none',
    fontSize: TYPOGRAPHY.fontSize.sm,
    transition: 'color 0.3s ease',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
    padding: SPACING[4],
  },
  actionsSection: {
    borderTop: `1px solid rgba(255,255,255,0.04)`,
    paddingTop: SPACING[6],
  },
  actionGroup: {
    marginBottom: SPACING[4],
  },
  actionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING[2],
  },
  buttonGroup: {
    display: 'flex',
    gap: SPACING[2],
    flexWrap: 'wrap',
  },
  // ✅ Verify button - Gold theme
  btnVerify: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.accent,
    color: COLORS.primary,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(201, 169, 110, 0.15)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  // ✅ Reject button - Red/Pink theme
  btnReject: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.2)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.2)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  btnSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: '#22C55E',
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(34, 197, 94, 0.15)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  btnDanger: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: '#EF4444',
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(239, 68, 68, 0.15)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  btnAddRemarks: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.accent,
    color: COLORS.primary,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(201, 169, 110, 0.15)`,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  remarksSection: {
    marginBottom: SPACING[4],
    marginTop: SPACING[4],
  },
  label: {
    display: 'block',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING[2],
  },
  remarksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  textarea: {
    width: '100%',
    padding: SPACING[3],
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    resize: 'vertical',
    outline: 'none',
    background: 'rgba(255,255,255,0.02)',
    color: COLORS.textWhite,
    transition: 'all 0.3s ease',
    '::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  fraudReport: {
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    marginTop: SPACING[3],
    marginBottom: SPACING[4],
  },
  fraudTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
  },
  fraudGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: SPACING[2],
    marginBottom: SPACING[2],
  },
  fraudGridSingle: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)', // ✅ 6 columns in one row
    gap: SPACING[2],
    marginBottom: SPACING[2],
  },
  fraudItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  fraudLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
  },
  fraudValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
  },
  fraudRemarks: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    marginTop: SPACING[2],
  },
  fraudTime: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.2)',
    marginTop: SPACING[1],
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
    border: `1px solid rgba(34, 197, 94, 0.15)`,
  },
  // ✅ Approve button - Gold theme
  btnApprove: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.accent,
    color: COLORS.primary,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(201, 169, 110, 0.2)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },

  // ✅ Reject button - Red/Pink theme
  btnRejectStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.2)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },

  // ✅ Under Review - Gold border, transparent background
  btnUnderReview: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
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