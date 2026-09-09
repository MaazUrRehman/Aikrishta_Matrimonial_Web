// src/components/dashboard/HowItWorksSection.js
'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function HowItWorksSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      desc: 'Sign up & create your profile in a few simple steps.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Get Matched',
      desc: 'Our experts & smart algorithm find the best matches for you.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Connect Safely',
      desc: 'Start a conversation and get to know each other securely.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Find Your Forever',
      desc: 'Build a meaningful relationship and find your forever.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Let Our Experts <br />
            <span style={styles.highlight}>Find the One for You!</span>
          </h2>
          <p style={styles.subtitle}>
            Our matchmaking experts are here to understand your preferences
            and find the perfect match for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={styles.grid}>
          {steps.map((step, index) => {
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
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div style={{
                      ...styles.connectingLine,
                      ...(isHovered && styles.connectingLineHover),
                    }}></div>
                  )}
                  
                  {/* Number */}
                  <div style={{
                    ...styles.numberWrapper,
                    ...(isHovered && styles.numberWrapperHover),
                  }}>
                    <span style={{
                      ...styles.number,
                      ...(isHovered && styles.numberHover),
                    }}>{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div style={{
                    ...styles.iconWrapper,
                    ...(isHovered && styles.iconWrapperHover),
                  }}>
                    <span style={{
                      ...styles.icon,
                      ...(isHovered && styles.iconHover),
                    }}>
                      {step.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 style={{
                    ...styles.stepTitle,
                    ...(isHovered && styles.stepTitleHover),
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    ...styles.stepDesc,
                    ...(isHovered && styles.stepDescHover),
                  }}>
                    {step.desc}
                  </p>

                  {/* Bottom Border */}
                  <div style={{
                    ...styles.stepBorder,
                    ...(isHovered && styles.stepBorderHover),
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
    // ✅ Light -> Dark -> Light gradient from top to bottom
    background: `linear-gradient(180deg, 
      ${COLORS.primaryDark} 0%, 
      ${COLORS.primary} 100%
    )`,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at 30% 20%, ${COLORS.secondary}10 0%, transparent 60%),
                 radial-gradient(ellipse at 70% 80%, ${COLORS.accent}08 0%, transparent 60%),
                 radial-gradient(ellipse at 50% 50%, ${COLORS.secondary}05 0%, transparent 80%)`,
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

  title: {
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

  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: SPACING[8],
    position: 'relative',
  },

  cardWrapper: {
    perspective: '1000px',
    position: 'relative',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    textAlign: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
  },

  cardHover: {
    transform: 'translateY(-16px) scale(1.03)',
    boxShadow: `0 8px 25px rgba(201, 169, 110, 0.25)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },

  // Connecting Line between steps
  connectingLine: {
    position: 'absolute',
    top: '50%',
    right: '-30px',
    width: '30px',
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-50%)',
    transition: 'all 0.4s ease',
    zIndex: 0,
  },

  connectingLineHover: {
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
    width: '40px',
  },

  numberWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: `rgba(139, 30, 63, 0.15)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: `rgba(139, 30, 63, 0.2)`,
    marginBottom: SPACING[4],
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  numberWrapperHover: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
    transform: 'rotate(360deg)',
  },

  number: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.secondary,
    transition: 'all 0.3s ease',
  },

  numberHover: {
    color: COLORS.primary,
  },

  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto ' + SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  iconWrapperHover: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
    transform: 'scale(1.1) rotate(10deg)',
  },

  icon: {
    width: '28px',
    height: '28px',
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },

  iconHover: {
    color: COLORS.primary,
  },

  stepTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    transition: 'all 0.3s ease',
  },

  stepTitleHover: {
    color: COLORS.accent,
  },

  stepDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    marginBottom: SPACING[4],
    transition: 'all 0.3s ease',
  },

  stepDescHover: {
    color: 'rgba(255,255,255,0.75)',
  },

  stepBorder: {
    height: '3px',
    width: '30px',
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(139, 30, 63, 0.3)`,
    margin: '0 auto',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  stepBorderHover: {
    width: '60px',
    backgroundColor: COLORS.accent,
    boxShadow: `0 0 20px rgba(201, 169, 110, 0.3)`,
  },
};

// Add responsive styles with animations
const responsiveStyles = `
  @media (max-width: 1024px) {
    .howitworks-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 2rem !important;
    }
    
    .howitworks-title {
      font-size: 2.5rem !important;
    }
    
    .howitworks-connecting-line {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .howitworks-grid {
      grid-template-columns: 1fr !important;
      max-width: 400px !important;
      margin: 0 auto !important;
    }
    
    .howitworks-title {
      font-size: 2rem !important;
    }
    
    .howitworks-subtitle {
      font-size: 1rem !important;
    }
    
    .howitworks-icon-wrapper {
      width: 56px !important;
      height: 56px !important;
    }
    
    .howitworks-icon-wrapper svg {
      width: 24px !important;
      height: 24px !important;
    }
  }

  @media (max-width: 480px) {
    .howitworks-section {
      padding: 4rem 1rem !important;
    }
    
    .howitworks-title {
      font-size: 1.75rem !important;
    }
    
    .howitworks-number-wrapper {
      width: 40px !important;
      height: 40px !important;
    }
    
    .howitworks-number {
      font-size: 0.875rem !important;
    }
    
    .howitworks-icon-wrapper {
      width: 52px !important;
      height: 52px !important;
    }
    
    .howitworks-icon-wrapper svg {
      width: 22px !important;
      height: 22px !important;
    }
    
    .howitworks-card {
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