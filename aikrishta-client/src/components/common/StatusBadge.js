'use client';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
} from '@/constants/theme';

export const StatusBadge = ({ status, size = 'md', showLabel = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'Approved': {
        bg: '#DCFCE7',
        color: '#16A34A',
        icon: '✅',
        label: 'Approved',
      },
      'Rejected': {
        bg: '#FEE2E2',
        color: '#DC2626',
        icon: '❌',
        label: 'Rejected',
      },
      'Under Review': {
        bg: '#FEF3C7',
        color: '#D97706',
        icon: '⏳',
        label: 'Under Review',
      },
      'Fraud Check': {
        bg: '#FEF3C7',
        color: '#D97706',
        icon: '🔍',
        label: 'Fraud Check',
      },
      'Phone Pending': {
        bg: '#FEF3C7',
        color: '#D97706',
        icon: '📱',
        label: 'Phone Pending',
      },
      'Email Pending': {
        bg: '#FEF3C7',
        color: '#D97706',
        icon: '✉️',
        label: 'Email Pending',
      },
      'Documents Pending': {
        bg: '#FEF3C7',
        color: '#D97706',
        icon: '📄',
        label: 'Documents Pending',
      },
      'Pending': {
        bg: '#E5E7EB',
        color: '#6B7280',
        icon: '⏳',
        label: 'Pending',
      },
    };

    return configs[status] || configs['Pending'];
  };

  const config = getStatusConfig(status);

  const sizeStyles = {
    sm: {
      padding: `${SPACING[1]} ${SPACING[2]}`,
      fontSize: TYPOGRAPHY.fontSize.xs,
    },
    md: {
      padding: `${SPACING[2]} ${SPACING[3]}`,
      fontSize: TYPOGRAPHY.fontSize.sm,
    },
    lg: {
      padding: `${SPACING[3]} ${SPACING[4]}`,
      fontSize: TYPOGRAPHY.fontSize.base,
    },
  };

  return (
    <span
      style={{
        ...styles.badge,
        background: config.bg,
        color: config.color,
        ...sizeStyles[size],
      }}
    >
      {showLabel ? (
        <>
          <span style={styles.icon}>{config.icon}</span>
          {config.label}
        </>
      ) : (
        <span style={styles.icon}>{config.icon}</span>
      )}
    </span>
  );
};

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[1],
    borderRadius: BORDER_RADIUS.full,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    whiteSpace: 'nowrap',
  },

  icon: {
    fontSize: 'inherit',
  },
};