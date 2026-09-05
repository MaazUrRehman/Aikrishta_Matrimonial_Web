// src/app/page.js
'use client';

import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function HomePage() {
  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          {/* Brand */}
          <div style={styles.brand}>
            <span style={styles.brandIcon}>✦</span>
            <span style={styles.brandText}>
              <span style={styles.brandWhite}>AIKRISHTA</span>
              <span style={styles.brandDot}>.</span>
              <span style={styles.brandWhite}>COM</span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={styles.mainHeading}>
            <span style={styles.headingLine1}>BEGINS</span>
            <span style={styles.headingLine2}>WITH</span>
            <span style={styles.headingLine3}>
              <span style={styles.highlight}>AIK</span>
              <span style={styles.headingLine4}>RISHTA</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subtitle}>
            Trusted Matchmaking For Meaningful Relationships
          </p>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <Link href="/auth/register" style={styles.btnPrimary}>
              Sign Up
            </Link>
            <Link href="/auth/login" style={styles.btnSecondary}>
              Sign In
            </Link>
          </div>

          
        </div>
      </section>
    </div>
  );
}

// ==================== STYLES ====================

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: COLORS.primary,
  },

  // ===== HERO =====
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING[16]} ${SPACING[6]}`,
    background: COLORS.gradients.hero,
    position: 'relative',
    overflow: 'hidden',
  },

  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, rgba(201, 169, 110, 0.05) 0%, transparent 70%)',
    zIndex: 1,
  },

  heroContent: {
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },

  // Brand
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[2],
    marginBottom: SPACING[12],
  },

  brandIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.secondary,
  },

  brandText: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    letterSpacing: '2px',
  },

  brandPink: {
    color: COLORS.secondary,
  },

  
  brandWhite: {
    color: COLORS.primaryLightest,
  },

  brandDot: {
    color: COLORS.secondary,
  },

  // Heading
  mainHeading: {
    marginBottom: SPACING[6],
  },

  headingLine1: {
    display: 'block',
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    fontWeight: TYPOGRAPHY.fontWeight.light,
    color: COLORS.accent,
    letterSpacing: '8px',
    textTransform: 'uppercase',
  },

  headingLine2: {
    display: 'block',
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.light,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '12px',
    textTransform: 'uppercase',
    marginTop: SPACING[1],
  },

  headingLine3: {
    display: 'block',
    marginTop: SPACING[2],
  },

  highlight: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['7xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    textShadow: '0 4px 40px rgba(201, 169, 110, 0.25)',
  },

  headingLine4: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['7xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    marginLeft: SPACING[2],
  },

  // Subtitle
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '500px',
    margin: `0 auto ${SPACING[10]}`,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },

  // Buttons
  buttonGroup: {
    display: 'flex',
    gap: SPACING[4],
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: SPACING[12],
  },

  btnPrimary: {
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
    borderRadius: BORDER_RADIUS.full,
    transition: 'all 0.3s ease',
    boxShadow: SHADOWS.pink,
    border: 'none',
    cursor: 'pointer',
  },

  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${SPACING[3]} ${SPACING[8]}`,
    backgroundColor: 'transparent',
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.full,
    border: `2px solid rgba(255,255,255,0.25)`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },

  btnArrow: {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },

  
};