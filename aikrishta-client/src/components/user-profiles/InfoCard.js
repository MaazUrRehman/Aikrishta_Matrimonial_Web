// src/components/profile-detail/InfoCard.js
'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function InfoCard({ title, fields, children }) {
  if (!fields || fields.length === 0) {
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.empty}>No information available</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.grid}>
        {fields.map((field, index) => (
          field.value && (
            <div key={index} style={styles.field}>
              <label style={styles.label}>{field.label}</label>
              <p style={styles.value}>{field.value}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[6],
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.06)`,
    height: '100%',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: `${COLORS.accent}30`,
      backgroundColor: 'rgba(255,255,255,0.06)',
    },
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    margin: 0,
    marginBottom: SPACING[4],
    paddingBottom: SPACING[3],
    borderBottom: `2px solid ${COLORS.accent}20`,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[3],
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    margin: 0,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  empty: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    padding: SPACING[4],
  },
};