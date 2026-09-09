// src/components/home/FeaturesSection.js
'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" />
          <path d="M12 6v6l4 2" />
          <path d="M12 22v-4" />
          <path d="M6 12h4" />
          <path d="M18 12h-2" />
        </svg>
      ),
      title: 'AI Matchmaking',
      desc: 'Advanced AI algorithms find your perfect life partner based on compatibility.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
      ),
      title: 'Recommended Matches',
      desc: 'Discover personalized match recommendations based on your preferences and compatibility.',
    },

    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M8 3.13a4 4 0 0 0 0 7.75" />
          <line x1="12" y1="2" x2="12" y2="7" />
        </svg>
      ),
      title: 'Smart Filters',
      desc: 'Advanced filters and AI-powered recommendations for your perfect match.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      ),
      title: 'Secure Chats',
      desc: 'End-to-end encrypted messaging ensures your conversations remain private.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="8" y1="2" x2="8" y2="22" />
          <line x1="16" y1="2" x2="16" y2="22" />
          <line x1="2" y1="8" x2="22" y2="8" />
          <line x1="2" y1="16" x2="22" y2="16" />
          <path d="M8 2 L16 2" />
          <path d="M8 22 L16 22" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      title: 'Voice & Video Calls',
      desc: 'Connect face-to-face or voice-to-voice with secure high-quality calls.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
      title: 'Horoscope Matching',
      desc: 'Get astrological compatibility insights for a harmonious and blessed union.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <path d="M12 22v-5" />
          <path d="M6 12v5" />
          <path d="M18 12v5" />
          <path d="M6 7v3" />
          <path d="M18 7v3" />
        </svg>
      ),
      title: 'Authentic Profiles',
      desc: 'Connect with genuine profiles for a safer trustworthy experience.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Verified Profiles',
      desc: 'Every profile undergoes strict manual verification for authenticity and trust.',
    },
  ];

  return (
    <section id="premium-features" style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>
            Everything You Need for <span style={styles.highlight}>Perfect Matchmaking</span>
          </h2>
          <p style={styles.subheading}>
            Discover powerful features designed to help you find your ideal life partner
          </p>
        </div>

        {/* Features Grid */}
        <div style={styles.grid}>
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                style={styles.cardWrapper}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{
                  ...styles.card,
                  ...(isHovered && styles.cardHover),
                }}>
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
                  <h3 style={{
                    ...styles.title,
                    ...(isHovered && styles.titleHover),
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    ...styles.desc,
                    ...(isHovered && styles.descHover),
                  }}>
                    {feature.desc}
                  </p>
                  <div style={{
                    ...styles.featureBorder,
                    ...(isHovered && styles.featureBorderHover),
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
    background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at 20% 20%, ${COLORS.secondary}15 0%, transparent 60%),
                 radial-gradient(ellipse at 80% 80%, ${COLORS.accent}10 0%, transparent 60%),
                 radial-gradient(ellipse at 50% 50%, ${COLORS.secondary}08 0%, transparent 80%)`,
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
    marginBottom: SPACING[16],
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: SPACING[6],
    marginBottom: SPACING[16],
  },

  cardWrapper: {
    perspective: '1000px',
  },

  // ✅ Card - Fixed border issue (no shorthand border mixing)
  card: {
    padding: SPACING[8],
    borderRadius: BORDER_RADIUS['2xl'],
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },

  // ✅ Card hover - using separate border properties
  cardHover: {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },

  iconWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto ' + SPACING[4],
    backgroundColor: `rgba(139, 30, 63, 0.15)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: `rgba(139, 30, 63, 0.2)`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // ✅ Icon wrapper hover - gold/red theme
  iconWrapperHover: {
    backgroundColor: COLORS.accent,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
  },

  icon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.secondary,
    transition: 'all 0.3s ease',
  },

  // ✅ Icon hover - dark blue on gold
  iconHover: {
    color: COLORS.primary,
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    transition: 'all 0.3s ease',
  },

  titleHover: {
    color: COLORS.accent,
  },

  desc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    marginBottom: SPACING[4],
    transition: 'all 0.3s ease',
  },

  descHover: {
    color: 'rgba(255,255,255,0.75)',
  },

  featureBorder: {
    height: '3px',
    width: '30px',
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    margin: '0 auto',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  featureBorderHover: {
    width: '60px',
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },

  // CTA Section
  ctaSection: {
    padding: SPACING[12],
    background: `linear-gradient(135deg, ${COLORS.secondary}15, ${COLORS.accent}10)`,
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
    textAlign: 'center',
    transition: 'all 0.4s ease',
  },

  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
  },

  ctaDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: SPACING[6],
  },

  ctaButton: {
    padding: `${SPACING[3]} ${SPACING[8]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.full,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: `0 4px 25px rgba(139, 30, 63, 0.4)`,
  },
};

// Add responsive styles
const responsiveStyles = `
  .features-cta-btn:hover {
    transform: translateY(-6px) scale(1.05) !important;
    box-shadow: 0 12px 50px rgba(139, 30, 63, 0.6) !important;
  }

  .features-cta-section:hover {
    border-color: ${COLORS.accent}40 !important;
    background: linear-gradient(135deg, ${COLORS.secondary}20, ${COLORS.accent}15) !important;
  }

  @media (max-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
    }
    
    .features-heading {
      font-size: 2.5rem !important;
    }
  }

  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr !important;
      max-width: 400px !important;
      margin: 0 auto !important;
    }
    
    .features-heading {
      font-size: 2rem !important;
    }
    
    .features-subheading {
      font-size: 1rem !important;
    }
    
    .features-cta-section {
      padding: 2rem !important;
    }
    
    .features-icon-wrapper {
      width: 60px !important;
      height: 60px !important;
    }
    
    .features-icon-wrapper svg {
      width: 28px !important;
      height: 28px !important;
    }
  }

  @media (max-width: 480px) {
    .features-section {
      padding: 4rem 1rem !important;
    }
    
    .features-heading {
      font-size: 1.75rem !important;
    }
    
    .features-icon-wrapper {
      width: 56px !important;
      height: 56px !important;
    }
    
    .features-icon-wrapper svg {
      width: 24px !important;
      height: 24px !important;
    }
    
    .features-cta-title {
      font-size: 1.25rem !important;
    }
    
    .features-card {
      padding: 1.5rem !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}