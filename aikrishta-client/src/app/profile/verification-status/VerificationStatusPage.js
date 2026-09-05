

// src/components/profile/verification-status/VerificationStatusPage.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  getVerificationStatus,
  getVerificationProgress,
  getStatusBadgeColor,
} from './verificationStatus';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from '@/constants/theme';

export default function VerificationStatusPage() {
  const router = useRouter();
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const response = await getVerificationStatus();
      setStatus(response.data);
      setProgress(getVerificationProgress(response.data));
    } catch (err) {
      setError(err.message || 'Failed to load verification status.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading verification status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.error}>
            <span style={styles.errorIcon}>❌</span>
            <p style={styles.errorText}>{error}</p>
            <button
              onClick={() => router.push('/profile/profile-verification')}
              style={styles.btnPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
              }}
            >
              Go to Verification
            </button>
          </div>
        </div>
      </div>
    );
  }

  const badge = getStatusBadgeColor(status?.profile_status);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.logo}>📊</span>
          <h1 style={styles.title}>Verification <span style={styles.highlight}>Status</span></h1>
          <p style={styles.subtitle}>Track your profile verification progress</p>
        </div>

        {/* Status Badge */}
        <div style={{ 
          ...styles.badge, 
          backgroundColor: badge.bg, 
          color: badge.color,
          borderColor: badge.borderColor || 'transparent',
        }}>
          <span style={styles.badgeIcon}>{badge.icon || '📌'}</span>
          {badge.label}
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress.percentage}%`,
                background: progress.isRejected ? '#EF4444' : 
                           progress.isComplete ? '#22C55E' : COLORS.accent,
              }}
            />
          </div>
          <div style={styles.progressText}>
            <span>{progress.completed} of {progress.total} steps completed</span>
            <span style={styles.progressPercentage}>{progress.percentage}%</span>
          </div>
        </div>

        {/* Steps */}
        <div style={styles.stepsContainer}>
          {progress.steps.map((step, index) => (
            <div key={index} style={{
              ...styles.stepItem,
              ...(step.completed ? styles.stepItemCompleted : {}),
            }}>
              <div style={styles.stepIcon}>
                {step.completed ? '✅' : '⏳'}
              </div>
              <div style={styles.stepContent}>
                <span style={styles.stepName}>
                  {step.icon} {step.name}
                </span>
                <span style={step.completed ? styles.verified : styles.unverified}>
                  {step.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* User Info */}
        {status && (
          <div style={styles.infoContainer}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>📞 Phone:</span>
              <span style={styles.infoValue}>{status.phone || 'Not provided'}</span>
              <span style={status.phone_verified ? styles.verified : styles.unverified}>
                {status.phone_verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>✉️ Email:</span>
              <span style={styles.infoValue}>{status.email || 'Not provided'}</span>
              <span style={status.email_verified ? styles.verified : styles.unverified}>
                {status.email_verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>📄 Documents:</span>
              <span style={styles.infoValue}>{status.documents?.length || 0} uploaded</span>
              <span style={status.documents?.length > 0 ? styles.verified : styles.unverified}>
                {status.documents?.length > 0 ? '✅ Uploaded' : '⏳ Pending'}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          {progress.isRejected && (
            <div style={styles.rejectedMessage}>
              <span style={styles.rejectedIcon}>❌</span>
              <p style={styles.rejectedText}>Your profile has been rejected.</p>
              <p style={styles.remarksText}>
                {status?.admin_remarks || 'Please contact admin for more details.'}
              </p>
            </div>
          )}

          {progress.isComplete && (
            <button
              onClick={() => router.push('/dashboard')}
              style={styles.btnSuccess}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(34, 197, 94, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(34, 197, 94, 0.2)`;
              }}
            >
              🎉 Go to Dashboard
            </button>
          )}

          <button
            onClick={() => router.push('/profile')}
            style={styles.btnPrimary}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
            }}
          >
            Continue to Profile
          </button>
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
  badgeIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  progressContainer: {
    marginBottom: SPACING[6],
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING[2],
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
    transition: 'width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.15)`,
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
  },
  progressPercentage: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  stepsContainer: {
    marginBottom: SPACING[6],
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    padding: SPACING[3],
    marginBottom: SPACING[2],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
    transition: 'all 0.3s ease',
  },
  stepItemCompleted: {
    borderColor: `rgba(34, 197, 94, 0.15)`,
    backgroundColor: 'rgba(34, 197, 94, 0.03)',
  },
  stepIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginRight: SPACING[3],
  },
  stepContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepName: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  verified: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: '#22C55E',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
  },
  unverified: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.1)`,
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
  },
  infoContainer: {
    marginBottom: SPACING[6],
    padding: SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  infoRow: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: SPACING[2],
  borderBottom: `1px solid rgba(255,255,255,0.04)`,
},
  infoLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.5)',
    minWidth: '80px',
  },
  infoValue: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    flex: 1,
    marginLeft: SPACING[2],
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[3],
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
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(34, 197, 94, 0.2)`,
    
  },
  error: {
    textAlign: 'center',
    padding: SPACING[4],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[3],
  },
  errorIcon: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    display: 'block',
  },
  errorText: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  rejectedMessage: {
    textAlign: 'center',
    padding: SPACING[4],
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING[3],
    border: `1px solid rgba(239, 68, 68, 0.15)`,
  },
  rejectedIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    display: 'block',
    marginBottom: SPACING[1],
  },
  rejectedText: {
    color: '#EF4444',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    margin: 0,
  },
  remarksText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: SPACING[2],
    fontStyle: 'italic',
    fontFamily: TYPOGRAPHY.fontFamily.body,
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