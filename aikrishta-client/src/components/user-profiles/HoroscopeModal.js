// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, TRANSITION } from '@/constants/theme';
// import { X } from 'lucide-react';
// import { getHoroscopeMatch } from './horoscopeService';
// import { toast } from 'react-hot-toast';

// export default function HoroscopeModal({ currentUser, candidateUser, isOpen, onClose }) {
//   const [userPlaceOfBirth, setUserPlaceOfBirth] = useState('');
//   const [candidatePlaceOfBirth, setCandidatePlaceOfBirth] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     // Removed auto-population from props
//   }, [currentUser, candidateUser]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') onClose();
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   const handleCheckHoroscope = async () => {
//     setLoading(true);
//     try {
//       const [userCity, userCountry] = userPlaceOfBirth.split(', ');
//       const [candidateCity, candidateCountry] = candidatePlaceOfBirth.split(', ');

//       console.log('DEBUG: Payload Data:', {
//         user: { dob: currentUser.dob, gender: currentUser.gender, city: userCity, country: userCountry },
//         candidate: { dob: candidateUser.dob, gender: candidateUser.gender, city: candidateCity, country: candidateCountry }
//       });

//       const data = await getHoroscopeMatch({
//         user: { dob: currentUser.dob, gender: currentUser.gender, city: userCity, country: userCountry },
//         candidate: { dob: candidateUser.dob, gender: candidateUser.gender, city: candidateCity, country: candidateCountry }
//       });
//       setResult(data);
//     } catch (err) {
//       toast.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000,
//             padding: SPACING[4],
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               background: COLORS.white,
//               borderRadius: BORDER_RADIUS.lg,
//               padding: SPACING[8],
//               width: '100%',
//               maxWidth: '800px',
//               maxHeight: '90vh',
//               overflowY: 'auto',
//               boxShadow: SHADOWS.lg,
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING[6] }}>
//               <h2 style={{ fontSize: TYPOGRAPHY.fontSize['2xl'], color: COLORS.textDark, margin: 0 }}>
//                 {result ? 'Horoscope Compatibility Report' : 'Horoscope Compatibility'}
//               </h2>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 style={{ background: 'none', border: 'none', cursor: 'pointer', padding: SPACING[1], display: 'flex' }}
//               >
//                 <X />
//               </button>
//             </div>

//             {!result ? (
//               <form onSubmit={(e) => { e.preventDefault(); handleCheckHoroscope(); }}>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING[6] }}>
//                   {/* Left Side: Logged-in User */}
//                   <div>
//                     <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, marginBottom: SPACING[4], color: COLORS.primary }}>Your Details</h3>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Date of Birth</label>
//                         <input type="text" value={currentUser?.dob || ''} readOnly style={styles.input} />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Place of Birth (City, Country)</label>
//                         <input type="text" value={userPlaceOfBirth} onChange={(e) => setUserPlaceOfBirth(e.target.value)} placeholder="City, Country" required style={styles.editableInput} />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Gender</label>
//                         <input type="text" value={currentUser?.gender || ''} readOnly style={styles.input} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Side: Candidate */}
//                   <div>
//                     <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, marginBottom: SPACING[4], color: COLORS.primary }}>Candidate Details</h3>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Date of Birth</label>
//                         <input type="text" value={candidateUser?.dob || ''} readOnly style={styles.input} />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Place of Birth (City, Country)</label>
//                         <input type="text" value={candidatePlaceOfBirth} onChange={(e) => setCandidatePlaceOfBirth(e.target.value)} placeholder="City, Country" required style={styles.editableInput} />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, marginBottom: SPACING[1] }}>Gender</label>
//                         <input type="text" value={candidateUser?.gender || ''} readOnly style={styles.input} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ marginTop: SPACING[8], display: 'flex', justifyContent: 'flex-end', gap: SPACING[4] }}>
//                   <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
//                   <button type="submit" disabled={loading} style={styles.checkBtn}>
//                     {loading ? 'Calculating...' : 'Check Horoscope'}
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               // <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
//               //     <div style={{ padding: SPACING[4], borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.goldLight }}>
//               //         <h4 style={{ margin: 0, color: COLORS.goldDark }}>Compatibility Score: {result.match?.gun_milan?.total_points} / 36</h4>
//               //         <p style={{ margin: '5px 0 0 0', color: COLORS.textDark }}>{result.match?.description?.conclusion}</p>
//               //     </div>
//               //     <pre style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textGray, whiteSpace: 'pre-wrap' }}>
//               //         {JSON.stringify(result, null, 2)}
//               //     </pre>
//               // </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
//                 <div style={{ padding: SPACING[4], borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.goldLight }}>
//                   <h4 style={{ margin: 0, color: COLORS.goldDark }}>
//                     Compatibility Score: {result.data?.guna_milan?.total_points} / {result.data?.guna_milan?.maximum_points}
//                   </h4>

//                   <p style={{ marginTop: 10 }}>
//                     <strong>Status:</strong>{" "}
//                     {result.data?.message?.type === "bad"
//                       ? "❌ Match Not Recommended"
//                       : "✅ Match Recommended"}
//                   </p>

//                   <p>
//                     <strong>Reason:</strong><br />
//                     {result.data?.message?.description}
//                   </p>

//                   <br />
//                   <hr />
//                   <br />

//                   <p><strong>Boy Rashi:</strong> {result.data?.boy_info?.rasi?.name}</p>
//                   <p><strong>Boy Nakshatra:</strong> {result.data?.boy_info?.nakshatra?.name}</p>
//                   <p><strong>Boy Gana:</strong> {result.data?.boy_info?.koot?.gana}</p>

//                   <br />
//                   <hr />
//                   <br />

//                   <p><strong>Girl Rashi:</strong> {result.data?.girl_info?.rasi?.name}</p>
//                   <p><strong>Girl Nakshatra:</strong> {result.data?.girl_info?.nakshatra?.name}</p>
//                   <p><strong>Girl Gana:</strong> {result.data?.girl_info?.koot?.gana}</p>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// const styles = {
//   input: {
//     width: '100%',
//     padding: SPACING[2],
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid ${COLORS.borderLight}`,
//     background: COLORS.backgroundLight,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textGray,
//   },
//   editableInput: {
//     width: '100%',
//     padding: SPACING[2],
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid ${COLORS.borderLight}`,
//     fontSize: TYPOGRAPHY.fontSize.sm,
//     color: COLORS.textDark,
//   },
//   cancelBtn: {
//     padding: `${SPACING[2]} ${SPACING[6]}`,
//     borderRadius: BORDER_RADIUS.base,
//     border: `1px solid ${COLORS.borderLight}`,
//     background: COLORS.white,
//     color: COLORS.textDark,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },
//   checkBtn: {
//     padding: `${SPACING[2]} ${SPACING[6]}`,
//     borderRadius: BORDER_RADIUS.base,
//     border: 'none',
//     background: COLORS.primary,
//     color: COLORS.textWhite,
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.sm,
//   },
// };


















// src/components/profile-detail/HoroscopeModal.js
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, TRANSITION } from '@/constants/theme';
import { X } from 'lucide-react';
import { getHoroscopeMatch } from './horoscopeService';
import { toast } from 'react-hot-toast';

export default function HoroscopeModal({ currentUser, candidateUser, isOpen, onClose }) {
  const [userPlaceOfBirth, setUserPlaceOfBirth] = useState('');
  const [candidatePlaceOfBirth, setCandidatePlaceOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Removed auto-population from props
  }, [currentUser, candidateUser]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCheckHoroscope = async () => {
    setLoading(true);
    try {
      const [userCity, userCountry] = userPlaceOfBirth.split(', ');
      const [candidateCity, candidateCountry] = candidatePlaceOfBirth.split(', ');

      console.log('DEBUG: Payload Data:', {
        user: { dob: currentUser.dob, gender: currentUser.gender, city: userCity, country: userCountry },
        candidate: { dob: candidateUser.dob, gender: candidateUser.gender, city: candidateCity, country: candidateCountry }
      });

      const data = await getHoroscopeMatch({
        user: { dob: currentUser.dob, gender: currentUser.gender, city: userCity, country: userCountry },
        candidate: { dob: candidateUser.dob, gender: candidateUser.gender, city: candidateCity, country: candidateCountry }
      });
      setResult(data);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={styles.overlay}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={styles.modal}
          >
            {/* Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                <span style={styles.titleIcon}>🔮</span>
                {result ? 'Horoscope Compatibility Report' : 'Horoscope Compatibility'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                style={styles.closeBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(201, 169, 110, 0.1)`;
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {!result ? (
              <form onSubmit={(e) => { e.preventDefault(); handleCheckHoroscope(); }} style={styles.form}>
                <div style={styles.formGrid}>
                  {/* Left Side: Logged-in User */}
                  <div style={styles.formSection}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.sectionIcon}>👤</span>
                      Your Details
                    </h3>
                    <div style={styles.formFields}>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Date of Birth</label>
                        <input type="text" value={currentUser?.dob || ''} readOnly style={styles.readonlyInput} />
                      </div>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Place of Birth <span style={styles.requiredStar}>*</span></label>
                        <input 
                          type="text" 
                          value={userPlaceOfBirth} 
                          onChange={(e) => setUserPlaceOfBirth(e.target.value)} 
                          placeholder="City, Country" 
                          required 
                          style={styles.editableInput}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = COLORS.accent;
                            e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`;
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Gender</label>
                        <input type="text" value={currentUser?.gender || ''} readOnly style={styles.readonlyInput} />
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Candidate */}
                  <div style={styles.formSection}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.sectionIcon}>⭐</span>
                      Candidate Details
                    </h3>
                    <div style={styles.formFields}>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Date of Birth</label>
                        <input type="text" value={candidateUser?.dob || ''} readOnly style={styles.readonlyInput} />
                      </div>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Place of Birth <span style={styles.requiredStar}>*</span></label>
                        <input 
                          type="text" 
                          value={candidatePlaceOfBirth} 
                          onChange={(e) => setCandidatePlaceOfBirth(e.target.value)} 
                          placeholder="City, Country" 
                          required 
                          style={styles.editableInput}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = COLORS.accent;
                            e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`;
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div style={styles.fieldGroup}>
                        <label style={styles.fieldLabel}>Gender</label>
                        <input type="text" value={candidateUser?.gender || ''} readOnly style={styles.readonlyInput} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={onClose} 
                    style={styles.cancelBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = COLORS.accent;
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    style={{
                      ...styles.checkBtn,
                      ...(loading && styles.checkBtnDisabled),
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={styles.spinnerSmall}></span>
                        Calculating...
                      </>
                    ) : (
                      'Check Horoscope'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Result View
              <div style={styles.resultContainer}>
                <div style={styles.resultHeader}>
                  <div style={styles.resultScore}>
                    <span style={styles.scoreLabel}>Compatibility Score</span>
                    <span style={styles.scoreValue}>
                      {result.data?.guna_milan?.total_points} / {result.data?.guna_milan?.maximum_points}
                    </span>
                  </div>
                  <div style={styles.resultStatus}>
                    {result.data?.message?.type === "bad" ? (
                      <span style={styles.statusBad}>❌ Not Recommended</span>
                    ) : (
                      <span style={styles.statusGood}>✅ Match Recommended</span>
                    )}
                  </div>
                </div>

                <div style={styles.resultReason}>
                  <h4 style={styles.resultReasonTitle}>💭 Reason</h4>
                  <p style={styles.resultReasonText}>{result.data?.message?.description}</p>
                </div>

                <div style={styles.resultDetails}>
                  <div style={styles.resultSection}>
                    <h4 style={styles.resultSectionTitle}>
                      <span style={styles.resultSectionIcon}>👨</span>
                      Boy Details
                    </h4>
                    <div style={styles.resultGrid}>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Rashi</span>
                        <span style={styles.resultItemValue}>{result.data?.boy_info?.rasi?.name}</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Nakshatra</span>
                        <span style={styles.resultItemValue}>{result.data?.boy_info?.nakshatra?.name}</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Gana</span>
                        <span style={styles.resultItemValue}>{result.data?.boy_info?.koot?.gana}</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.resultSection}>
                    <h4 style={styles.resultSectionTitle}>
                      <span style={styles.resultSectionIcon}>👩</span>
                      Girl Details
                    </h4>
                    <div style={styles.resultGrid}>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Rashi</span>
                        <span style={styles.resultItemValue}>{result.data?.girl_info?.rasi?.name}</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Nakshatra</span>
                        <span style={styles.resultItemValue}>{result.data?.girl_info?.nakshatra?.name}</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span style={styles.resultItemLabel}>Gana</span>
                        <span style={styles.resultItemValue}>{result.data?.girl_info?.koot?.gana}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setResult(null)} 
                  style={styles.backBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  ← Back to Form
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: SPACING[4],
  },
  modal: {
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[6],
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  titleIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: SPACING[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    borderRadius: BORDER_RADIUS.full,
    transition: 'all 0.3s ease',
    width: '36px',
    height: '36px',
  },
  form: {
    width: '100%',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[6],
  },
  formSection: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING[5],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    marginBottom: SPACING[4],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  sectionIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  requiredStar: {
    color: COLORS.secondary,
  },
  readonlyInput: {
    width: '100%',
    padding: SPACING[2],
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.06)`,
    background: 'rgba(255,255,255,0.02)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    cursor: 'not-allowed',
    outline: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  editableInput: {
    width: '100%',
    padding: SPACING[2],
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.1)`,
    background: 'rgba(255,255,255,0.03)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    '::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  formActions: {
    marginTop: SPACING[8],
    display: 'flex',
    justifyContent: 'flex-end',
    gap: SPACING[4],
  },
  cancelBtn: {
    padding: `${SPACING[2]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.1)`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  checkBtn: {
    padding: `${SPACING[2]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    background: COLORS.secondary,
    color: COLORS.textWhite,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  checkBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  spinnerSmall: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  // Result Styles
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[6],
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING[4],
    background: `rgba(201, 169, 110, 0.08)`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid ${COLORS.accent}20`,
    flexWrap: 'wrap',
    gap: SPACING[3],
  },
  resultScore: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  scoreLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  scoreValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },
  resultStatus: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  statusGood: {
    color: '#22C55E',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
  },
  statusBad: {
    color: COLORS.secondary,
    backgroundColor: `rgba(139, 30, 63, 0.1)`,
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
  },
  resultReason: {
    padding: SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  resultReasonTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    marginBottom: SPACING[2],
  },
  resultReasonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
    lineHeight: 1.6,
  },
  resultDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[4],
  },
  resultSection: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING[4],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  resultSectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    marginBottom: SPACING[3],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },
  resultSectionIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  resultGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  resultItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING[1]} 0`,
    borderBottom: `1px solid rgba(255,255,255,0.03)`,
  },
  resultItemLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
  },
  resultItemValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  backBtn: {
    padding: `${SPACING[2]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.1)`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    alignSelf: 'flex-start',
  },
};

// Add keyframe animation
if (typeof window !== 'undefined') {
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