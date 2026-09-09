'use client';

import Link from 'next/link';
import { HeartHandshake, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

const features = [
  {
    icon: ShieldCheck,
    title: 'Authentic Profiles',
    description: 'Connect with genuine members through profiles built around trust and transparency.',
  },
  {
    icon: Users,
    title: 'Community Focused',
    description: 'Meet people who value meaningful relationships, family, and lasting commitment.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & Security',
    description: 'Your personal information and conversations stay protected at every step.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Support',
    description: 'Thoughtful guidance helps you move from a promising introduction to a real connection.',
  },
];

export default function PublicWhySection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.intro}>
          <span style={styles.eyebrow}>Built for meaningful beginnings</span>
          <h2 style={styles.heading}>Why <span style={styles.highlight}>AIKRISHTA?</span></h2>
          <p style={styles.description}>
            Finding a life partner deserves more than endless scrolling. AIKRISHTA brings together genuine people, thoughtful matchmaking, and a respectful space to begin something lasting.
          </p>
          <Link href="/auth/register" style={styles.button}>
            Create Your Profile <Sparkles size={16} />
          </Link>
        </div>
        <div style={styles.grid}>
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} style={styles.feature}>
              <div style={styles.iconWrapper}><Icon size={22} /></div>
              <div>
                <h3 style={styles.featureTitle}>{title}</h3>
                <p style={styles.featureDescription}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: `${SPACING[16]} clamp(${SPACING[4]}, 6vw, ${SPACING[10]})`,
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: SPACING[16],
    alignItems: 'center',
  },
  intro: {
    maxWidth: '470px',
  },
  eyebrow: {
    display: 'block',
    marginBottom: SPACING[3],
    color: COLORS.accent,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  heading: {
    margin: `0 0 ${SPACING[4]}`,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  highlight: {
    color: COLORS.accent,
  },
  description: {
    margin: `0 0 ${SPACING[6]}`,
    color: 'rgba(255,255,255,0.68)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[5]}`,
    color: COLORS.textWhite,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.full,
    boxShadow: SHADOWS.pink,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textDecoration: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: BORDER_RADIUS['2xl'],
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.025)',
  },
  feature: {
    display: 'flex',
    gap: SPACING[3],
    minHeight: '170px',
    padding: SPACING[6],
    borderRight: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '42px',
    height: '42px',
    color: COLORS.accent,
    backgroundColor: 'rgba(201,169,110,0.1)',
    borderRadius: BORDER_RADIUS.lg,
  },
  featureTitle: {
    margin: `0 0 ${SPACING[2]}`,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  featureDescription: {
    margin: 0,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },
};
