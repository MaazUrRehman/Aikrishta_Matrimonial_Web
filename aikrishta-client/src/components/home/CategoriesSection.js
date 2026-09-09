// src/components/home/CategoriesSection.js
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function CategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    { 
      title: 'By Religion', 
      desc: 'Find matches from your preferred religion.',
      image: '/images/religion-image.jpeg',
      borderColor: COLORS.secondary,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    { 
      title: 'By Community', 
      desc: 'Connect with matches from your community.',
      image: '/images/cummunity-image.jpeg',
      borderColor: COLORS.accent,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    { 
      title: 'By Profession', 
      desc: 'Find matches with similar professional backgrounds.',
      image: '/images/profession-image.jpeg',
      borderColor: COLORS.accent,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
    },
    { 
      title: 'By Location', 
      desc: 'Connect with matches from your desired location.',
      image: '/images/location-image.jpeg',
      borderColor: COLORS.secondary,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    { 
      title: 'By Education', 
      desc: 'Find matches with similar educational backgrounds.',
      image: '/images/education-image.jpeg',
      borderColor: COLORS.accent,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 1.5 3 2.5 6 2.5s6-1 6-2.5v-5"/>
        </svg>
      ),
    },
    { 
      title: 'By Interests', 
      desc: 'Find matches who share your hobbies and interests.',
      image: '/images/interest-image.jpeg',
      borderColor: COLORS.secondary,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="choose-your-preference" style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>
            Find Your <span style={styles.highlight}>Perfect Match</span>
          </h2>
          <p style={styles.subheading}>
            Discover your ideal life partner by exploring matches tailored to your preferences
          </p>
        </div>

        {/* Categories Grid */}
        <div style={styles.grid}>
          {categories.map((cat, index) => {
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
                  {/* Image Container */}
                  <div style={styles.imageContainer}>
                    <div style={styles.imageWrapper}>
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        style={{
                          ...styles.cardImage,
                          ...(isHovered && styles.imageHover),
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div style={{
                      ...styles.imageOverlay,
                      background: `linear-gradient(135deg, ${cat.borderColor}40, transparent)`
                    }}></div>
                    
                    {/* Icon Badge - HIGH Z-INDEX */}
                    <div style={styles.iconBadge}>
                      <div style={{
                        ...styles.iconCircle,
                        ...(isHovered && styles.iconCircleHover),
                      }}>
                        <span style={{
                          ...styles.icon,
                          ...(isHovered && styles.iconHover),
                        }}>{cat.icon}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div style={styles.content}>
                    <h3 style={{
                      ...styles.title,
                      ...(isHovered && styles.titleHover),
                    }}>{cat.title}</h3>
                    <p style={{
                      ...styles.desc,
                      ...(isHovered && styles.descHover),
                    }}>{cat.desc}</p>
                    
                  </div>
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
    background: COLORS.primary,
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at 20% 50%, ${COLORS.secondary}10 0%, transparent 50%),
                 radial-gradient(ellipse at 80% 50%, ${COLORS.accent}10 0%, transparent 50%)`,
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
    border: `1px solid ${COLORS.accent}40`,
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: SPACING[8],
    marginBottom: SPACING[16],
  },

  cardWrapper: {
    perspective: '1000px',
  },

  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: BORDER_RADIUS['2xl'],
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
  },

  cardHover: {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
    border: `1px solid ${COLORS.accent}`,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '250px',
    overflow: 'hidden',
  },

  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  cardImage: {
    objectFit: 'cover',
    objectPosition: 'center 20%',
    transition: 'transform 0.6s ease',
  },

  imageHover: {
    transform: 'scale(1.1)',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },

  // ✅ ICON BADGE - HIGHEST Z-INDEX
  iconBadge: {
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
  },

  // ✅ Fixed border issue - using borderWidth + borderStyle + borderColor instead of border shorthand
  iconCircle: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 25px rgba(201, 169, 110, 0.4)`,
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: COLORS.primary,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  iconCircleHover: {
    transform: 'scale(1.15) rotate(10deg)',
    boxShadow: `0 8px 50px rgba(201, 169, 110, 0.7)`,
    borderColor: COLORS.accent,
  },

  icon: {
    width: '34px',
    height: '34px',
    color: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    stroke: COLORS.primary,
    strokeWidth: '2.5',
    transition: 'all 0.3s ease',
  },

  iconHover: {
    color: COLORS.secondary,
    stroke: COLORS.secondary,
  },

  content: {
    padding: `${SPACING[10]} ${SPACING[6]} ${SPACING[6]}`,
    textAlign: 'center',
    marginTop: SPACING[2],
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

  titleHover: {
    color: COLORS.accent,
  },

  desc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    marginBottom: SPACING[4],
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

  descHover: {
    color: 'rgba(255,255,255,0.8)',
  },

  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[4],
  },

  exploreBtn: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[1],
  },

  exploreBtnHover: {
    color: COLORS.secondary,
    transform: 'translateX(8px)',
  },

  cardBorder: {
    width: '40px',
    height: '3px',
    borderRadius: BORDER_RADIUS.full,
    opacity: 0.5,
    transition: 'all 0.3s ease',
  },

  cardBorderHover: {
    width: '60px',
    opacity: 1,
  },

  // CTA Section
  ctaSection: {
    marginTop: SPACING[8],
    padding: SPACING[12],
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid ${COLORS.accent}20`,
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
  @media (max-width: 1024px) {
    .categories-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 2rem !important;
    }
    
    .categories-heading {
      font-size: 2.5rem !important;
    }
  }

  @media (max-width: 768px) {
    .categories-grid {
      grid-template-columns: 1fr !important;
      max-width: 400px !important;
      margin: 0 auto !important;
    }
    
    .categories-heading {
      font-size: 2rem !important;
    }
    
    .categories-subheading {
      font-size: 1rem !important;
    }
    
    .categories-cta-section {
      padding: 2rem !important;
    }
    
    .categories-icon-circle {
      width: 60px !important;
      height: 60px !important;
    }
    
    .categories-icon-circle svg {
      width: 30px !important;
      height: 30px !important;
    }
  }

  @media (max-width: 480px) {
    .categories-section {
      padding: 4rem 1rem !important;
    }
    
    .categories-heading {
      font-size: 1.75rem !important;
    }
    
    .categories-card-image {
      height: 180px !important;
    }
    
    .categories-icon-circle {
      width: 52px !important;
      height: 52px !important;
    }
    
    .categories-icon-circle svg {
      width: 26px !important;
      height: 26px !important;
    }
    
    .categories-cta-title {
      font-size: 1.25rem !important;
    }
    
    .categories-icon-badge {
      bottom: -22px !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}