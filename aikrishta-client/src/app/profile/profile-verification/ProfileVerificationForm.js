// src/components/profile/profile-verification/ProfileVerificationForm.js
'use client';

import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PhoneInputComponent } from '@/components/common/PhoneInput';

import {
  defaultValues,
  phoneVerificationSchema,
  phoneOtpSchema,
  emailVerificationSchema,
  emailOtpSchema,
  documentSchema,
  sendPhoneOTP,
  verifyPhoneOTP,
  resendPhoneOTP,
  sendEmailOTP,
  verifyEmailOTP,
  resendEmailOTP,
  submitProfileForm,
  getVerificationStatus,
  uploadDocument,
  deleteDocument,
  getStepProgress,
} from './profileVerification';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function ProfileVerificationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ...defaultValues,
    phone_otp: '',
    email_otp: '',
  });
  const [currentStep, setCurrentStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadVerificationStatus();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // const loadVerificationStatus = async () => {
  //   try {
  //     const response = await getVerificationStatus();

  //     if (response?.data) {
  //       const status = response.data;

  //       if (status.profile_status === 'Approved') {
  //         router.push('/profile/verification-status');
  //         return;
  //       }

  //       setFormData({
  //         phone: status.phone || '',
  //         phone_otp: '',
  //         email: status.email || '',
  //         email_otp: '',
  //         phone_verified: status.phone_verified || false,
  //         email_verified: status.email_verified || false,
  //         document_verified: status.document_verified || false,
  //         documents: status.documents || [],
  //         profile_status: status.profile_status || 'Pending',
  //       });

  //       // Set correct step based on verification status
  //       if (status.phone_verified && status.email_verified && status.documents.length > 0) {
  //         setCurrentStep('documents');
  //       } else if (status.phone_verified && status.email_verified) {
  //         setCurrentStep('documents');
  //       } else if (status.phone_verified) {
  //         setCurrentStep('email');
  //       } else {
  //         setCurrentStep('phone');
  //       }
  //     }
  //   } catch (error) {
  //     console.log('No verification found, starting fresh.');
  //     setFormData({
  //       ...defaultValues,
  //       phone_otp: '',
  //       email_otp: '',
  //     });
  //   } finally {
  //     setPageLoading(false);
  //   }
  // };

  const loadVerificationStatus = async () => {
  try {
    const response = await getVerificationStatus();

    // No verification record yet
    if (response?.notStarted || !response?.data) {
      setFormData({
        ...defaultValues,
        phone_otp: '',
        email_otp: '',
      });

      setCurrentStep('phone');
      return;
    }

    const status = response.data;

    if (status.profile_status === 'Approved') {
      router.push('/profile/verification-status');
      return;
    }

    setFormData({
      phone: status.phone || '',
      phone_otp: '',
      email: status.email || '',
      email_otp: '',
      phone_verified: status.phone_verified || false,
      email_verified: status.email_verified || false,
      document_verified: status.document_verified || false,
      documents: status.documents || [],
      profile_status: status.profile_status || 'Pending',
      document_type: '',
      document_url: '',
    });

    // Resume verification from correct step
    if (!status.phone_verified) {
      setCurrentStep('phone');
    } else if (!status.email_verified) {
      setCurrentStep('email');
    } else {
      setCurrentStep('documents');
    }

  } catch (error) {
    console.error('Failed to load verification status:', error);

    // Only use this as a fallback for unexpected errors
    setFormData({
      ...defaultValues,
      phone_otp: '',
      email_otp: '',
    });

    setCurrentStep('phone');

  } finally {
    setPageLoading(false);
  }
};


  const startTimer = (duration = 60) => {
    setTimer(duration);
    setCanResend(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value || '',
    });
    setError('');
  };

  const handleSendPhoneOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      phoneVerificationSchema.parse({
        phone: formData.phone,
      });

      await sendPhoneOTP(formData.phone);

      setSuccess('OTP sent successfully to your phone.');
      startTimer(60);
      setCurrentStep('phone_otp');
    } catch (err) {
      console.error("❌ Send Phone OTP Error:", err);

      if (err?.issues?.length) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Failed to send OTP.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      phoneOtpSchema.parse({
        phone: formData.phone,
        otp: formData.phone_otp,
      });

      await verifyPhoneOTP(formData.phone, formData.phone_otp);

      setFormData(prev => ({
        ...prev,
        phone_verified: true,
      }));

      setSuccess('Phone verified successfully!');

      setTimeout(() => {
        setCurrentStep('email');
        setSuccess('');
        setFormData(prev => ({
          ...prev,
          phone_verified: true,
        }));
      }, 500);

    } catch (err) {
      console.error("❌ Verify Phone OTP Error:", err);

      if (err?.issues?.length) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Invalid OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendPhoneOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await resendPhoneOTP(formData.phone);
      setSuccess('OTP resent successfully.');
      startTimer(60);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      emailVerificationSchema.parse({ email: formData.email });
      
      await submitProfileForm({
        phone: formData.phone,
        email: formData.email,
      });

      await sendEmailOTP(formData.email);

      setSuccess('OTP sent to your email address.');
      startTimer(60);
      setCurrentStep('email_otp');
    } catch (err) {
      if (err?.issues?.length) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      emailOtpSchema.parse({
        email: formData.email,
        otp: formData.email_otp,
      });

      await verifyEmailOTP(formData.email, formData.email_otp);

      setFormData(prev => ({
        ...prev,
        email_verified: true,
      }));

      setSuccess("Email verified successfully!");

      setTimeout(() => {
        setCurrentStep("documents");
        setSuccess("");
      }, 500);
    } catch (err) {
      if (err?.issues?.length) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || "Invalid OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmailOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await resendEmailOTP(formData.email);
      setSuccess('OTP resent successfully.');
      startTimer(60);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const file = e.target.document_file.files[0];
      if (!file) {
        toast.error("Please select a file.");
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, JPG, and PDF files are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.document_type);
      formDataToSend.append('file', file);

      const response = await uploadDocument(formDataToSend);

      setSuccess('Document uploaded successfully.');
      setFormData({
        ...formData,
        documents: [...formData.documents, response.data.document],
        document_type: '',
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => {
        router.push('/profile/verification-status');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to upload document.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await deleteDocument(documentId);
      setSuccess('Document deleted successfully.');
      setFormData({
        ...formData,
        documents: formData.documents.filter(doc => doc._id !== documentId),
      });
    } catch (err) {
      setError(err.message || 'Failed to delete document.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteVerification = () => {
    router.push('/profile');
  };

  const renderPhoneStep = () => (
    <div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <span style={styles.labelIcon}>📱</span>
          Phone Number <span style={styles.required}>*</span>
        </label>
        <PhoneInputComponent
          value={formData.phone}
          onChange={(fullNumber) => {
            setFormData({ ...formData, phone: fullNumber || '' });
            setError('');
          }}
          disabled={formData.phone_verified}
          required={true}
          placeholder="Enter phone number"
          defaultCountry="PK"
        />
        <span style={styles.hint}>
          Select country code and enter phone number
        </span>
      </div>

      {!formData.phone_verified ? (
        <div style={styles.buttonWrapper}>
          <button
            type="button"
            style={styles.btnPrimary}
            onClick={handleSendPhoneOTP}
            disabled={loading || !formData.phone || formData.phone.length < 8}
            onMouseEnter={(e) => {
              if (!loading && formData.phone && formData.phone.length >= 8) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Sending...
              </>
            ) : (
              '📱 Send OTP'
            )}
          </button>
        </div>
      ) : (
        <>
  <div style={styles.verifiedBadge}>
    ✅ Phone Verified
  </div>

  <button
    type="button"
    style={{ ...styles.btnSuccess, marginTop: SPACING[4] }}
    onClick={() => setCurrentStep('email')}
  >
    ✉️ Continue to Email
  </button>
</>
      )}
    </div>
  );

  // ✅ CHANGE 1: Phone OTP Step - Added autoFocus
  const renderPhoneOTPStep = () => (
    <div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Enter OTP <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="phone_otp"
          placeholder="Enter 6-digit OTP"
          style={styles.input}
          value={formData.phone_otp || ''}
          onChange={handleChange}
          maxLength="6"
          required
          autoFocus
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
          Enter the OTP sent to {formData.phone}
        </span>
      </div>

      <div style={styles.buttonContainer}>
        <button
          type="button"
          style={styles.btnPrimary}
          onClick={handleVerifyPhoneOTP}
          disabled={loading || (formData.phone_otp || '').length !== 6}
          onMouseEnter={(e) => {
            if (!loading && (formData.phone_otp || '').length === 6) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        <button
          type="button"
          style={styles.btnSecondary}
          onClick={handleResendPhoneOTP}
          disabled={!canResend || loading}
          onMouseEnter={(e) => {
            if (canResend && !loading) {
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.color = COLORS.accent;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
        </button>
      </div>
    </div>
  );

  const renderEmailStep = () => (
    <div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          <span style={styles.labelIcon}>✉️</span>
          Email Address <span style={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
          disabled={formData.email_verified}
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

      {!formData.email_verified ? (
        <button
          type="button"
          style={styles.btnPrimary}
          onClick={handleSendEmailOTP}
          disabled={loading || !formData.email}
          onMouseEnter={(e) => {
            if (!loading && formData.email) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              Sending...
            </>
          ) : (
            '✉️ Send OTP'
          )}
        </button>
      ) : (
        <>
  <div style={styles.verifiedBadge}>
    ✅ Email Verified
  </div>

  <button
    type="button"
    style={{ ...styles.btnSuccess, marginTop: SPACING[4] }}
    onClick={() => setCurrentStep('documents')}
  >
    📄 Continue to Documents
  </button>
</>
      )}
    </div>
  );

  // ✅ CHANGE 2: Email OTP Step - Added autoFocus
  const renderEmailOTPStep = () => (
    <div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Enter OTP <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="email_otp"
          placeholder="Enter 6-digit OTP"
          style={styles.input}
          value={formData.email_otp || ''}
          onChange={handleChange}
          maxLength="6"
          required
          autoFocus
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
          Enter the OTP sent to {formData.email}
        </span>
      </div>

      <div style={styles.buttonContainer}>
        <button
          type="button"
          style={styles.btnPrimary}
          onClick={handleVerifyEmailOTP}
          disabled={loading || (formData.email_otp || '').length !== 6}
          onMouseEnter={(e) => {
            if (!loading && (formData.email_otp || '').length === 6) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        <button
          type="button"
          style={styles.btnSecondary}
          onClick={handleResendEmailOTP}
          disabled={!canResend || loading}
          onMouseEnter={(e) => {
            if (canResend && !loading) {
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.color = COLORS.accent;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
        </button>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div>
      <form onSubmit={handleUploadDocument} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelIcon}>📄</span>
            Document Type <span style={styles.required}>*</span>
          </label>
          <div style={styles.selectWrapper}>
            <select
              name="document_type"
              style={styles.select}
              value={formData.document_type}
              onChange={handleChange}
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              <option value="">Select document type</option>
              <option value="Profile Image">Profile Image</option>
              <option value="ID Card Front">ID Card Front</option>
              <option value="ID Card Back">ID Card Back</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Other">Other</option>
            </select>
            <span style={styles.selectArrow}>▼</span>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelIcon}>📎</span>
            Upload File <span style={styles.required}>*</span>
          </label>
          <input
            type="file"
            name="document_file"
            ref={fileInputRef}
            style={styles.fileInput}
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            required
          />
          <span style={styles.hint}>
            Upload JPEG, PNG, JPG, or PDF (Max 5MB)
          </span>
        </div>

        <button
          type="submit"
          style={styles.btnPrimary}
          disabled={loading || !formData.document_type}
          onMouseEnter={(e) => {
            if (!loading && formData.document_type) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner}></span>
              Uploading...
            </>
          ) : (
            '📤 Upload Document'
          )}
        </button>
      </form>

      {formData.documents.length > 0 && (
        <div style={styles.documentList}>
          <h4 style={styles.documentTitle}>Uploaded Documents</h4>
          {formData.documents.map((doc, index) => (
            <div key={doc._id || index} style={styles.documentItem}>
              <span style={styles.documentName}>
                {doc.type} {doc.document_verified && '✅'}
              </span>
              <div style={styles.documentActions}>
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
                  View
                </a>
                <button
                  type="button"
                  style={styles.documentDelete}
                  onClick={() => handleDeleteDocument(doc._id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#EF4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#DC2626';
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formData.documents.length > 0 && (
        <button
          type="button"
          style={styles.btnSuccess}
          onClick={handleCompleteVerification}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 8px 30px rgba(34, 197, 94, 0.4)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(34, 197, 94, 0.2)`;
          }}
        >
          ✅ Continue to Profile
        </button>
      )}
    </div>
  );

  if (pageLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinnerLarge}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  const progress = getStepProgress(formData);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logo}>🔐</span>
          <h1 style={styles.title}>Profile <span style={styles.highlight}>Verification</span></h1>
          <p style={styles.subtitle}>Complete all steps to verify your profile</p>
          <div style={styles.stepIndicator}>
            <span style={progress.completed >= 1 ? styles.stepDotActive : styles.stepDot}></span>
            <span style={progress.completed >= 2 ? styles.stepDotActive : styles.stepDot}></span>
            <span style={progress.completed >= 3 ? styles.stepDotActive : styles.stepDot}></span>
          </div>
        </div>

        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress.percentage}%`,
              }}
            />
          </div>
          <div style={styles.progressSteps}>
            <span style={progress.completed >= 1 ? styles.stepActive : styles.stepInactive}>
              📱 Phone
            </span>
            <span style={progress.completed >= 2 ? styles.stepActive : styles.stepInactive}>
              ✉️ Email
            </span>
            <span style={progress.completed >= 3 ? styles.stepActive : styles.stepInactive}>
              📄 Documents
            </span>
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

        <div style={styles.stepContainer}>
          {currentStep === 'phone' && renderPhoneStep()}
          {currentStep === 'phone_otp' && renderPhoneOTPStep()}
          {currentStep === 'email' && renderEmailStep()}
          {currentStep === 'email_otp' && renderEmailOTPStep()}
          {currentStep === 'documents' && renderDocumentsStep()}
        </div>
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
  spinnerLarge: {
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
  spinner: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
    marginRight: SPACING[2],
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
    marginBottom: SPACING[6],
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
    gap: SPACING[2],
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
  progressContainer: {
    marginBottom: SPACING[6],
  },
  progressBar: {
    width: '100%',
    height: '6px',
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
  },
  stepActive: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  stepInactive: {
    color: 'rgba(255,255,255,0.3)',
  },
  stepContainer: {
    marginTop: SPACING[4],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
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
  fileInput: {
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: COLORS.textWhite,
    width: '100%',
    cursor: 'pointer',
  },
  hint: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
  },
  buttonWrapper: {
    marginTop: SPACING[4],
  },
  buttonContainer: {
    display: 'flex',
    gap: SPACING[3],
    marginTop: SPACING[4],
  },
  btnPrimary: {
    width: '100%',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[2],
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
    width: '100%',
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
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  btnSuccess: {
    width: '100%',
    backgroundColor: '#22C55E',
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    border: 'none',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    marginTop: SPACING[4],
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(34, 197, 94, 0.2)`,
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-3px)',
      boxShadow: `0 8px 30px rgba(34, 197, 94, 0.4)`,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  verifiedBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22C55E',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginTop: SPACING[3],
    border: `1px solid rgba(34, 197, 94, 0.2)`,
  },
  documentList: {
    marginTop: SPACING[6],
    paddingTop: SPACING[4],
    borderTop: `1px solid rgba(255,255,255,0.06)`,
  },
  documentTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
    marginBottom: SPACING[3],
  },
  documentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING[3],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING[2],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  documentName: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  documentActions: {
    display: 'flex',
    gap: SPACING[2],
  },
  documentLink: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.secondary,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: COLORS.accent,
      textDecoration: 'underline',
    },
  },
  documentDelete: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#DC2626',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#EF4444',
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
