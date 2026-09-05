// src/components/dashboard/CTASection.js
'use client';

import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function CTASection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          Ready to Find Your <span style={styles.highlight}>Perfect Match?</span>
        </h2>
        <p style={styles.subtitle}>
          Join thousands of happy members who found their forever.
        </p>

        <div style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={styles.input}
          />
          <Link href="/auth/register" style={styles.btn}>
            Join Now - It's Free <span style={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: `${SPACING[16]} ${SPACING[6]}`,
    backgroundColor: COLORS.bgCream,
  },

  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textDark,
    marginBottom: SPACING[3],
  },

  highlight: {
    color: COLORS.secondary,
  },

  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textGray,
    marginBottom: SPACING[8],
  },

  form: {
    display: 'flex',
    gap: SPACING[4],
    maxWidth: '600px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    minWidth: '250px',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid ${COLORS.border}`,
    borderRadius: BORDER_RADIUS.base,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    outline: 'none',
    transition: 'all 0.3s ease',
    color: COLORS.textDark,
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[8]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.base,
    transition: 'all 0.3s ease',
    boxShadow: SHADOWS.pink,
    whiteSpace: 'nowrap',
  },

  arrow: {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
};