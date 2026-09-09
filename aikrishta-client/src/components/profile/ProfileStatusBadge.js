// src/components/profile/ProfileStatusBadge.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';


export default function ProfileStatusBadge({ status, profileActivation }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const getInitialStatus = () => {
    if (typeof profileActivation !== 'undefined') return profileActivation;
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : {};
      return user.profileActivation ?? false;
    } catch (e) {
      return false;
    }
  };
  const [currentStatus, setCurrentStatus] = useState(getInitialStatus);

  useEffect(() => {
    if (typeof profileActivation !== 'undefined') {
      setCurrentStatus(profileActivation);
    }
  }, [profileActivation]);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : {};
      user.profileActivation = currentStatus;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to sync profileActivation to localStorage', e);
    }
  }, [currentStatus]);

  const statusConfig = {
    'Approved': {
      label: 'Verified',
      color: '#22C55E',
      bg: 'rgba(34, 197, 94, 0.12)',
      borderColor: 'rgba(34, 197, 94, 0.2)',
    },
    'Pending': {
      label: 'Pending',
      color: COLORS.accent,
      bg: 'rgba(201, 169, 110, 0.12)',
      borderColor: 'rgba(201, 169, 110, 0.2)',
    },
    'Under Review': {
      label: 'Under Review',
      color: '#60A5FA',
      bg: 'rgba(96, 165, 250, 0.12)',
      borderColor: 'rgba(96, 165, 250, 0.2)',
    },
    'Rejected': {
      label: 'Rejected',
      color: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.12)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    'Phone Pending': {
      label: 'Phone Pending',
      color: COLORS.accent,
      bg: 'rgba(201, 169, 110, 0.12)',
      borderColor: 'rgba(201, 169, 110, 0.2)',
    },
    'Email Pending': {
      label: 'Email Pending',
      color: COLORS.accent,
      bg: 'rgba(201, 169, 110, 0.12)',
      borderColor: 'rgba(201, 169, 110, 0.2)',
    },
    'Documents Pending': {
      label: 'Documents Pending',
      color: COLORS.accent,
      bg: 'rgba(201, 169, 110, 0.12)',
      borderColor: 'rgba(201, 169, 110, 0.2)',
    },
  };

  const config = statusConfig[status] || statusConfig['Pending'];

  const handleToggle = async () => {
    setShowModal(true);
  };

  const confirmToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(API.auth.toggleProfileActivation, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ profileActivation: !currentStatus }),
      });

      if (!response.ok) {
        toast.error("Failed to update status");
      }

      const data = await response.json();
      setCurrentStatus(data.data.profileActivation);
      
      router.refresh();
      
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update profile status. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.statusWrapper}>
          {/* Verification Status Badge */}
          <span style={{ 
            ...styles.badge, 
            backgroundColor: config.bg, 
            color: config.color,
            borderColor: config.borderColor,
          }}>
            {config.label}
          </span>

          {/* Profile Active/Inactive Status Badge */}
          <span style={{
            ...styles.badge,
            backgroundColor: currentStatus ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            color: currentStatus ? '#22C55E' : '#EF4444',
            borderColor: currentStatus ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          }}>
            <span style={styles.statusDot}></span>
            {currentStatus ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={loading}
          style={{
            ...styles.toggleBtn,
            backgroundColor: currentStatus ? COLORS.secondary : '#22C55E',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = currentStatus 
              ? `0 8px 30px rgba(139, 30, 63, 0.4)` 
              : `0 8px 30px rgba(34, 197, 94, 0.4)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {loading ? (
            <span style={styles.spinner}></span>
          ) : currentStatus ? (
            'Deactivate'
          ) : (
            'Activate'
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>
              {currentStatus ? '⚠️' : '🔄'}
            </div>
            <h3 style={styles.modalTitle}>
              {currentStatus ? 'Deactivate Profile?' : 'Activate Profile?'}
            </h3>
            <p style={styles.modalMessage}>
              {currentStatus 
                ? 'Your profile will be hidden from other users. You can activate it anytime.'
                : 'Your profile will be visible to other users again.'}
            </p>
            <div style={styles.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                style={styles.modalCancel}
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
                onClick={confirmToggle}
                disabled={loading}
                style={{
                  ...styles.modalConfirm,
                  backgroundColor: currentStatus ? COLORS.secondary : '#22C55E',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {loading ? (
                  <span style={styles.spinner}></span>
                ) : currentStatus ? (
                  'Deactivate'
                ) : (
                  'Activate'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    flexWrap: 'wrap',
    gap: SPACING[3],
  },

  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    flexWrap: 'wrap',
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[1]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    whiteSpace: 'nowrap',
    borderWidth: '1px',
    borderStyle: 'solid',
  },

  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    display: 'inline-block',
    animation: 'pulse 2s ease-in-out infinite',
  },

  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING[2]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    whiteSpace: 'nowrap',
    minWidth: '120px',
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.2)`,
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
  },

  spinner: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  },

  modal: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    maxWidth: '450px',
    width: '90%',
    boxShadow: SHADOWS.xl,
    animation: 'slideIn 0.3s ease',
    textAlign: 'center',
    border: `1px solid rgba(255,255,255,0.06)`,
  },

  modalIcon: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    display: 'block',
    marginBottom: SPACING[3],
  },

  modalTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
  },

  modalMessage: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: SPACING[6],
    lineHeight: 1.6,
  },

  modalActions: {
    display: 'flex',
    gap: SPACING[3],
    justifyContent: 'center',
  },

  modalCancel: {
    padding: `${SPACING[2]} ${SPACING[5]}`,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: `1px solid rgba(255,255,255,0.1)`,
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

  modalConfirm: {
    padding: `${SPACING[2]} ${SPACING[5]}`,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    color: COLORS.textWhite,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '120px',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
  },
};

// Add global styles for animations
if (typeof document !== 'undefined') {
  const globalStyles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

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
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}