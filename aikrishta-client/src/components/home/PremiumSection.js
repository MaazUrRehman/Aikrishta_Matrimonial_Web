// src/components/dashboard/PremiumSection.js
'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function PremiumSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const premiumFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Verified Profiles',
      desc: 'Browse profiles that go through the platform verification process.',
      profit: 'Build connections with greater confidence',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Advanced Profile Search',
      desc: 'Use profile filters and recommendations to discover compatible people.',
      profit: 'Find relevant matches more easily',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'AI Matchmaking',
      desc: 'Explore AI-powered matching based on available profile information.',
      profit: 'Discover compatibility-focused suggestions',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 10h.01"/>
          <path d="M12 10h.01"/>
          <path d="M16 10h.01"/>
        </svg>
      ),
      title: 'Private Chat',
      desc: 'Connect with matches through the platform chat experience.',
      profit: 'Keep conversations in one place',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
          <path d="M12 22v-5"/>
          <path d="M6 12v5"/>
          <path d="M18 12v5"/>
        </svg>
      ),
      title: 'Voice & Video Calls',
      desc: 'Use voice and video calling to connect with matches directly.',
      profit: 'Meet face-to-face when you are ready',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          <path d="M8 3.13a4 4 0 0 0 0 7.75"/>
          <line x1="12" y1="2" x2="12" y2="7"/>
        </svg>
      ),
      title: 'Horoscope Compatibility',
      desc: 'Review horoscope information as part of your compatibility journey.',
      profit: 'Add another perspective to your search',
    },
  ];

  return (
    <section id="what-we-offer" className="premium-section" style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 className="premium-heading" style={styles.heading}>
            Tools for <span style={styles.highlight}>Meaningful Connections</span>
          </h2>
          <p className="premium-subheading" style={styles.subheading}>
            Explore the features that help you discover, evaluate, and connect with potential life partners.
          </p>
        </div>

        {/* Features Grid */}
        <div className="premium-grid" style={styles.grid}>
          {premiumFeatures.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="premium-card-wrapper"
                style={styles.cardWrapper}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="premium-card" style={{
                  ...styles.card,
                  ...(isHovered && styles.cardHover),
                }}>
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.iconWrapper,
                      ...(isHovered && styles.iconWrapperHover),
                    }}>
                      <span style={{
                        ...styles.icon,
                        ...(isHovered && styles.iconHover),
                      }}>
                        {feature.icon}
                      </span>
                    </div>
                    <div style={styles.featureNumber}>{String(index + 1).padStart(2, '0')}</div>
                  </div>
                  
                  <h3 style={{
                    ...styles.featureTitle,
                    ...(isHovered && styles.featureTitleHover),
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={styles.featureDesc}>{feature.desc}</p>
                  
                  <div style={{
                    ...styles.profitWrapper,
                    ...(isHovered && styles.profitWrapperHover),
                  }}>
                    <span style={styles.profitIcon}>💡</span>
                    <span style={{
                      ...styles.profitText,
                      ...(isHovered && styles.profitTextHover),
                    }}>{feature.profit}</span>
                  </div>

                  <div style={{
                    ...styles.cardBorder,
                    ...(isHovered && styles.cardBorderHover),
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    padding: `${SPACING[20]} ${SPACING[6]}`,
    background: `linear-gradient(180deg, 
      ${COLORS.primaryDark} 0%, 
      ${COLORS.primary} 50%, 
      ${COLORS.primaryLight} 100%
    )`,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at 30% 20%, ${COLORS.secondary}12 0%, transparent 60%),
                 radial-gradient(ellipse at 70% 80%, ${COLORS.accent}08 0%, transparent 60%)`,
    zIndex: 1,
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },

  header: {
    textAlign: 'center',
    marginBottom: SPACING[12],
  },

  badge: {
    display: 'inline-block',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: `${SPACING[1]} ${SPACING[4]}`,
    border: `1px solid ${COLORS.accent}30`,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING[4],
    backgroundColor: `rgba(201, 169, 110, 0.08)`,
  },

  heading: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[4],
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },

  highlight: {
    color: COLORS.accent,
    position: 'relative',
  },

  subheading: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: SPACING[6],
    marginBottom: SPACING[12],
  },

  cardWrapper: {
    perspective: '1000px',
  },

  // ✅ Fixed border conflict - using separate properties
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[6],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `rgba(139, 30, 63, 0.15)`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },

  cardHover: {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: `0 8px 25px rgba(201, 169, 110, 0.35)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING[4],
  },

  // ✅ Fixed border conflict - using separate properties
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(139, 30, 63, 0.1)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: `rgba(139, 30, 63, 0.2)`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  iconWrapperHover: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
    transform: 'scale(1.1) rotate(10deg)',
  },

  icon: {
    width: '24px',
    height: '24px',
    color: COLORS.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  iconHover: {
    color: COLORS.primary,
  },

  featureNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: `rgba(139, 30, 63, 0.15)`,
    lineHeight: 1,
  },

  featureTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    transition: 'all 0.3s ease',
  },

  featureTitleHover: {
    color: COLORS.accent,
  },

  featureDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    marginBottom: SPACING[4],
  },

  // ✅ Fixed border conflict - using separate properties
  profitWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[3]}`,
    backgroundColor: `rgba(139, 30, 63, 0.05)`,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING[4],
    transition: 'all 0.3s ease',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `rgba(139, 30, 63, 0.1)`,
  },

  profitWrapperHover: {
    backgroundColor: `rgba(201, 169, 110, 0.1)`,
    borderColor: COLORS.accent,
  },

  profitIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },

  // ✅ Profit text - Gold for better readability
  profitText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: 'all 0.3s ease',
  },

  profitTextHover: {
    color: COLORS.accent,
    textShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },

  // ✅ Fixed border conflict - using separate properties
  cardBorder: {
    height: '2px',
    width: '30px',
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  cardBorderHover: {
    width: '60px',
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },

  // Trust Badges
  trustSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: SPACING[6],
    paddingTop: SPACING[8],
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: `rgba(139, 30, 63, 0.15)`,
  },

  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    transition: 'all 0.3s ease',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
  },

  trustIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
  },

  trustTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
  },

  trustDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
  },
};

// Add responsive styles
const responsiveStyles = `
  .premium-card:hover .premium-trust-item {
    border-color: ${COLORS.accent}30 !important;
    background: rgba(201, 169, 110, 0.05) !important;
  }

  .premium-card:hover .premium-profit-text {
    color: ${COLORS.accent} !important;
    text-shadow: 0 0 20px rgba(201, 169, 110, 0.3) !important;
  }

  @media (max-width: 1024px) {
    .premium-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
    }
    
    .premium-heading {
      font-size: 2.5rem !important;
    }
    
    .premium-trust-section {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 768px) {
    .premium-grid {
      grid-template-columns: 1fr !important;
      max-width: 400px !important;
      margin: 0 auto !important;
    }
    
    .premium-heading {
      font-size: 2rem !important;
    }
    
    .premium-subheading {
      font-size: 1rem !important;
    }
    
    .premium-trust-section {
      grid-template-columns: 1fr 1fr !important;
      gap: 1.5rem !important;
    }
    
    .premium-trust-item {
      padding: 1rem !important;
    }
  }

  @media (max-width: 480px) {
    .premium-section {
      padding: 4rem 1rem !important;
    }
    
    .premium-heading {
      font-size: 1.75rem !important;
    }
    
    .premium-trust-section {
      grid-template-columns: 1fr !important;
    }
    
    .premium-card {
      padding: 1.5rem !important;
    }
    
    .premium-icon-wrapper {
      width: 48px !important;
      height: 48px !important;
    }
    
    .premium-icon-wrapper svg {
      width: 20px !important;
      height: 20px !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}