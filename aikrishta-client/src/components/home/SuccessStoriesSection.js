// src/components/dashboard/SuccessStoriesSection.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function SuccessStoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const stories = [
{
name: 'Ayesha & Farhan',
story: '"AIKRISHTA.com brought us together when we least expected it. We found a wonderful connection and built a beautiful life together."',
image: '/images/success-story-1.jpeg',
location: 'Lahore, Pakistan',
},
{
name: 'Priya & Arjun',
story: '"We connected through AIKRISHTA and discovered how naturally our dreams and values aligned. We are so grateful for this journey."',
image: '/images/success-story-2.jpeg',
location: 'Mumbai, India',
},
{
name: 'Emily & Daniel',
story: '"AIKRISHTA helped us find someone who truly understood us. What started as a simple connection became something truly special."',
image: '/images/success-story-3.jpeg',
location: 'London, UK',
},
{
name: 'Sara & Michael',
story: '"We found each other through AIKRISHTA and never imagined that one connection could change our lives so beautifully."',
image: '/images/success-story-4.jpeg',
location: 'Toronto, Canada',
},
{
name: 'Fatima & Hassan',
story: '"AIKRISHTA made the search feel simple and meaningful. We found the right person and began a journey we will always cherish."',
image: '/images/success-story-5.jpeg',
location: 'Dubai, UAE',
},
{
name: 'Sofia & Christopher',
story: '"Finding each other on AIKRISHTA was the beginning of an incredible journey. We are thankful every day for the connection we made."',
image: '/images/success-story-6.jpeg',
location: 'New York, USA',
},
];


  return (
    <section id="success-stories" className="success-stories-section" style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 className="success-stories-heading" style={styles.heading}>
            Real Stories, <span style={styles.highlight}>Real Connections</span>
          </h2>
          <p className="success-stories-subheading" style={styles.subheading}>
            Discover beautiful love stories of couples who found their perfect match through AIKRISHTA
          </p>
        </div>

        {/* Stories Grid - 2 Columns */}
        <div className="success-stories-grid" style={styles.grid}>
          {stories.map((story, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="success-stories-card-wrapper"
                style={styles.cardWrapper}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="success-stories-card" style={{
                  ...styles.card,
                  ...(isHovered && styles.cardHover),
                }}>
                  <div className="success-stories-card-inner" style={styles.cardInner}>
                    {/* Image */}
                    <div style={styles.imageWrapper}>
                      <div className="success-stories-image-container" style={{
                        ...styles.imageContainer,
                        ...(isHovered && styles.imageContainerHover),
                      }}>
                        <Image
                          src={story.image}
                          alt={story.name}
                          width={80}
                          height={80}
                          style={{
                            ...styles.image,
                            ...(isHovered && styles.imageHover),
                          }}
                        />
                        <div className="success-stories-quote-icon" style={styles.quoteIcon}>“</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={styles.content}>
                      <p style={{
                        ...styles.story,
                        ...(isHovered && styles.storyHover),
                      }}>
                        {story.story}
                      </p>
                      <div className="success-stories-name-wrapper" style={styles.nameWrapper}>
                        <h4 style={{
                          ...styles.name,
                          ...(isHovered && styles.nameHover),
                        }}>
                          {story.name}
                        </h4>
                        <span style={styles.location}>{story.location}</span>
                      </div>
                      <div style={{
                        ...styles.cardBorder,
                        ...(isHovered && styles.cardBorderHover),
                      }}></div>
                    </div>
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
    background: `linear-gradient(180deg, 
      ${COLORS.primary} 0%, 
      ${COLORS.primaryDark} 50%,
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
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[6],
    marginBottom: SPACING[12],
  },

  cardWrapper: {
    perspective: '1000px',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[6],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },

  cardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    backgroundColor: `rgba(201, 169, 110, 0.06)`,
  },

  cardInner: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[5],
  },

  imageWrapper: {
    flexShrink: 0,
  },

  // ✅ Fixed border conflict - using separate properties
  imageContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  imageContainerHover: {
    borderColor: COLORS.accent,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.3)`,
    transform: 'scale(1.05)',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.4s ease',
  },

  imageHover: {
    transform: 'scale(1.1)',
  },

  quoteIcon: {
    position: 'absolute',
    bottom: '-4px',
    right: '-4px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.primary,
  },

  content: {
    flex: 1,
  },

  story: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    fontStyle: 'italic',
    marginBottom: SPACING[3],
    transition: 'all 0.3s ease',
  },

  storyHover: {
    color: 'rgba(255,255,255,0.8)',
  },

  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    marginBottom: SPACING[2],
    flexWrap: 'wrap',
  },

  name: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    transition: 'all 0.3s ease',
  },

  nameHover: {
    color: COLORS.accent,
  },

  location: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: BORDER_RADIUS.full,
  },

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

  // CTA Section
  ctaSection: {
    padding: SPACING[12],
    background: `linear-gradient(135deg, ${COLORS.secondary}12, ${COLORS.accent}08)`,
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
  .success-stories-cta-btn:hover {
    transform: translateY(-6px) scale(1.05) !important;
    box-shadow: 0 12px 50px rgba(139, 30, 63, 0.6) !important;
  }

  .success-stories-cta-section:hover {
    border-color: ${COLORS.accent}40 !important;
    background: linear-gradient(135deg, ${COLORS.secondary}18, ${COLORS.accent}12) !important;
  }

  @media (max-width: 1024px) {
    .success-stories-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    
    .success-stories-heading {
      font-size: 2.5rem !important;
    }
  }

  @media (max-width: 768px) {
    .success-stories-grid {
      grid-template-columns: 1fr !important;
      max-width: 500px !important;
      margin: 0 auto !important;
    }
    
    .success-stories-heading {
      font-size: 2rem !important;
    }
    
    .success-stories-subheading {
      font-size: 1rem !important;
    }
    
    .success-stories-cta-section {
      padding: 2rem !important;
    }
    
    .success-stories-card-inner {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .success-stories-name-wrapper {
      justify-content: center !important;
    }
    
    .success-stories-card-border {
      margin: 0 auto !important;
    }
    
    .success-stories-image-container {
      width: 70px !important;
      height: 70px !important;
    }
  }

  @media (max-width: 480px) {
    .success-stories-section {
      padding: 4rem 1rem !important;
    }
    
    .success-stories-heading {
      font-size: 1.75rem !important;
    }
    
    .success-stories-cta-title {
      font-size: 1.25rem !important;
    }
    
    .success-stories-card {
      padding: 1.25rem !important;
    }
    
    .success-stories-image-container {
      width: 60px !important;
      height: 60px !important;
    }
    
    .success-stories-quote-icon {
      width: 24px !important;
      height: 24px !important;
      font-size: 0.875rem !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}