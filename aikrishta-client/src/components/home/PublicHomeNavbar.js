'use client';

import Link from 'next/link';
import Image from 'next/image';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function PublicHomeNavbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo} aria-label="AIKRISHTA home">
          <Image src="/images/aikrishta-logo.png" alt="AIKRISHTA" width={180} height={180} style={styles.logoImage} priority />
        </Link>
        <nav style={styles.actions} aria-label="Account actions">
          <Link href="/auth/login" style={styles.signIn}>Sign In</Link>
          <Link href="/auth/register" style={styles.signUp}>Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING[4],
    padding: `${SPACING[3]} 0`,
    backgroundColor: COLORS.primary,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  container: {
    width: '78%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING[4],
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  logoImage: {
    height: '80px',
    width: 'auto',
    objectFit: 'contain',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  signIn: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: BORDER_RADIUS.full,
  },
  signUp: {
    padding: `${SPACING[2]} ${SPACING[5]}`,
    color: COLORS.textWhite,
    backgroundColor: COLORS.secondary,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textDecoration: 'none',
    borderRadius: BORDER_RADIUS.full,
    boxShadow: SHADOWS.pink,
  },
};
