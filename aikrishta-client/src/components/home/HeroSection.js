'use client';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function HeroSection({ user }) {
  return (
    <section className="hero-section" style={styles.hero}>
      <div style={styles.overlay}></div>
      <div className="hero-container" style={styles.container}>
        {/* Left Content */}
        <div style={styles.content}>
          

          <h1 className="hero-title" style={styles.title}>
            <span style={styles.meaningful}>Meaningful</span> Connections
            <br />
            <span style={styles.highlight}>Begin Here</span>
          </h1>

          <p style={styles.subtitle}>
            A trusted place to meet people who share your values, faith, and hopes for the future.
            {' '}Start a sincere conversation that can grow into a lasting relationship.
          </p>

          
          {/* Features with secondary color */}
          <div className="features" style={styles.features}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Safe & secure</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Verified profiles</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>A trusted community</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Meaningful connections</span>
            </div>
          </div>

          <div className="stats" style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>50K+</span>
                <span style={styles.statLabel}>Successful relationships</span>
            </div>
            <div className="stat-divider" style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>15K+</span>
                <span style={styles.statLabel}>Members finding love</span>
            </div>
            <div className="stat-divider" style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>15+</span>
                <span style={styles.statLabel}>Years of trust</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: `${SPACING[16]} 0`,
    background: `linear-gradient(90deg, rgba(5, 18, 41, 0.94) 0%, rgba(10, 25, 47, 0.82) 42%, rgba(10, 25, 47, 0.2) 100%), url('/images/home-bg-hero-img.png') center / cover no-repeat`,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(5, 18, 41, 0.3) 0%, rgba(10, 25, 47, 0.18) 45%, transparent 100%)',
    zIndex: 1,
  },

  container: {
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    padding: `0 ${SPACING[6]}`,
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: SPACING[6],
  },

  // ✅ Badge with secondary color border
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    backgroundColor: `rgba(139, 30, 63, 0.15)`,
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.full,
    border: `1px solid ${COLORS.secondary}60`,
    backdropFilter: 'blur(10px)',
  },

  badgeIcon: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },

  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: '3.625rem',
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
    margin: 0,
  },

  meaningful: {
    fontSize: '1em',
  },

  highlight: {
    color: COLORS.accent,
    position: 'relative',
    // ✅ Add secondary color underline effect
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      right: 0,
      height: '4px',
      background: COLORS.secondary,
      borderRadius: BORDER_RADIUS.full,
      opacity: 0.3,
    },
  },

  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    margin: 0,
    maxWidth: '500px',
  },

  // ✅ Search Box with secondary color border
  searchBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[6],
    backdropFilter: 'blur(10px)',
    border: `1px solid ${COLORS.secondary}40`,
  },

  searchRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
    gap: SPACING[3],
    alignItems: 'flex-end',
  },

  searchField: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },

  fieldLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // ✅ Select with secondary color focus
  fieldSelect: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `1px solid rgba(255,255,255,0.1)`,
    borderRadius: BORDER_RADIUS.lg,
    padding: `${SPACING[2]} ${SPACING[3]}`,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    width: '100%',
    outline: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B1E3F' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
    ':focus': {
      borderColor: COLORS.secondary,
      backgroundColor: 'rgba(139, 30, 63, 0.1)',
    },
  },

  // ✅ Find Button with secondary color
  findButton: {
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    padding: `${SPACING[3]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    height: '42px',
    alignSelf: 'flex-end',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.4)`,
    ':hover': {
      backgroundColor: COLORS.secondaryDark,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.5)`,
    },
  },

  // ✅ Features with secondary color icons
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: SPACING[2],
    rowGap: SPACING[2],
    width: '100%',
    maxWidth: '500px',
    marginTop: SPACING[2],
  },

  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  featureIcon: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    backgroundColor: `rgba(139, 30, 63, 0.15)`,
    padding: SPACING[1],
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  featureText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },

  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[6],
    paddingTop: SPACING[6],
    borderTop: `1px solid rgba(255,255,255,0.08)`,
    width: '100%',
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  statNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },

  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    marginTop: SPACING[0.5],
  },

  statDivider: {
    width: '1px',
    height: '30px',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    aspectRatio: '1/1.2',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
  },

  // ✅ Floating badges with secondary color
  floatingBadge1: {
    position: 'absolute',
    top: '20%',
    left: '-15%',
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    backdropFilter: 'blur(20px)',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.xl,
    border: `1px solid ${COLORS.secondary}60`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: `0 8px 30px rgba(139, 30, 63, 0.3)`,
  },

  floatingBadge2: {
    position: 'absolute',
    bottom: '20%',
    right: '-15%',
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    backdropFilter: 'blur(20px)',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.xl,
    border: `1px solid ${COLORS.secondary}60`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: `0 8px 30px rgba(139, 30, 63, 0.3)`,
  },

  badgeNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
  },

  badgeLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
  },
};

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .hero-container {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
    
    .hero-title {
      font-size: 3rem !important;
    }
    
    .search-row {
      grid-template-columns: 1fr 1fr !important;
    }
    
    .features {
      grid-template-columns: 1fr 1fr !important;
    }
    
    .image-wrapper {
      order: -1 !important;
    }
    
    .image-container {
      max-width: 400px !important;
      margin: 0 auto !important;
    }
    
    .floating-badge1 {
      left: 5% !important;
    }
    
    .floating-badge2 {
      right: 5% !important;
    }
  }

  @media (max-width: 768px) {
    .search-row {
      grid-template-columns: 1fr !important;
    }
    
    .features {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 2.25rem !important;
    }
    
    .search-row {
      grid-template-columns: 1fr !important;
    }
    
    .features {
      grid-template-columns: 1fr !important;
    }
    
    .stats {
      flex-wrap: wrap !important;
      gap: 1.5rem !important;
    }
    
    .stat-divider {
      display: none !important;
    }
    
    .image-container {
      max-width: 300px !important;
    }
    
    .floating-badge1,
    .floating-badge2 {
      display: none !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}