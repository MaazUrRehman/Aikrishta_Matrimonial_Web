'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function FamilyMemberCard({ data }) {
  if (!data) return null;

  const fields = [
    { label: 'First Name', value: data.first_name },
    { label: 'Last Name', value: data.last_name },
    { label: 'Relation', value: data.relation },
    { label: 'Phone', value: data.phone },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>👤 Family Member</h3>
      <div style={styles.grid}>
        {fields.map((field, index) => (
          field.value && (
            <div key={index} style={styles.item}>
              <span style={styles.label}>{field.label}</span>
              <span style={styles.value}>{field.value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: SPACING[4],
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid ${COLORS.borderLight}`,
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primary,
    marginBottom: SPACING[3],
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SPACING[2],
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[0.5],
  },

  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textGray,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  value: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textDark,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
};