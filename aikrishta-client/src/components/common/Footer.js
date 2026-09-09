
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Main Footer Grid */}
        <div className="footer-grid" style={styles.grid}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>✦</span>
              <span style={styles.logoText}>
                AIKRISHTA<span style={styles.logoDot}>.</span>COM
              </span>
            </div>
            <p style={styles.brandDesc}>
              Trusted matchmaking platform helping thousands find their perfect life partner.
              We connect genuine people from around the world and make it easier to discover
              meaningful relationships based on compatibility, trust, and shared values.
              Your journey to a meaningful relationship starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Quick Links</h4>
            <Link href="/dashboard#premium-features" style={styles.link}>Premium Features</Link>
            <Link href="/dashboard#choose-your-preference" style={styles.link}>Choose Your Preference</Link>
            <Link href="/dashboard#success-stories" style={styles.link}>Success Stories</Link>
            <Link href="/dashboard#how-it-works" style={styles.link}>How It Works</Link>
            <Link href="/dashboard#what-we-offer" style={styles.link}>What We Offer</Link>
          </div>

          {/* Features */}
          <div style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Features</h4>
            <Link href="/user-profiles" style={styles.link}>AI Matchmaking</Link>
            <Link href="/user-profiles" style={styles.link}>Secure Chat</Link>
            <Link href="/user-profiles" style={styles.link}>Horoscope Matching</Link>
            <Link href="/user-profiles" style={styles.link}>Authentic Profiles</Link>
            <Link href="/user-profiles" style={styles.link}>Match Filters</Link>
          </div>

          {/* Support */}
          <div style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>Support</h4>
            <Link href="/legal" style={styles.link}>Privacy Policy</Link>
            <Link href="/legal" style={styles.link}>Safety Tips</Link>
            <Link href="/legal" style={styles.link}>Terms & Conditions</Link>
            <Link href="/legal" style={styles.link}>FAQ</Link>
          </div>

          {/* For Members */}
          <div style={styles.linkGroup}>
            <h4 style={styles.linkTitle}>For Members</h4>
            <Link href="/user-profiles" style={styles.link}>Video Call</Link>
            <Link href="/user-profiles" style={styles.link}>Voice Call</Link>
            <Link href="/user-profiles" style={styles.link}>Match Recommendation</Link>
          </div>
        </div>



        {/* Security & Trust Section */}
        <div style={styles.securitySection}>
          <div className="footer-security-grid" style={styles.securityGrid}>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Completely Secure</h5>
                <p style={styles.securityDesc}>Your data is encrypted and 100% secure</p>
              </div>
            </div>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Verified Profiles</h5>
                <p style={styles.securityDesc}>Every profile is manually verified</p>
              </div>
            </div>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Active Members</h5>
                <p style={styles.securityDesc}>Thousands of active members online</p>
              </div>
            </div>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Image Privacy</h5>
                <p style={styles.securityDesc}>Your images are secure & private</p>
              </div>
            </div>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Smart Filters</h5>
                <p style={styles.securityDesc}>Advanced filters for perfect matches</p>
              </div>
            </div>
            <div style={styles.securityItem}>
              <div>
                <h5 style={styles.securityTitle}>Match Recommendations</h5>
                <p style={styles.securityDesc}>AI-powered match suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottom}>
        <div style={styles.bottomContainer}>
          <div className="footer-bottom-content" style={styles.bottomContent}>
            <p style={styles.copyright}>
              © {new Date().getFullYear()} AIKRISHTA. All rights reserved.
              Made with love for meaningful connections.
            </p>
            <div style={styles.bottomLinks}>
              <Link href="/legal" style={styles.bottomLink}>Privacy</Link>
              <span style={styles.bottomDivider}>|</span>
              <Link href="/legal" style={styles.bottomLink}>Terms</Link>
              <span style={styles.bottomDivider}>|</span>
              <Link href="/legal" style={styles.bottomLink}>Safety</Link>
              <span style={styles.bottomDivider}>|</span>
              <Link href="/legal" style={styles.bottomLink}>FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== UPDATED STYLES WITH SECONDARY COLOR ====================

const styles = {
  footer: {
    backgroundColor: COLORS.primary,
    color: COLORS.textWhite,
    padding: `${SPACING[12]} 0 0`,
    marginTop: 'auto',
    borderTop: `3px solid ${COLORS.secondary}40`,
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${SPACING[6]}`,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    gap: SPACING[8],
    paddingBottom: SPACING[8],
    borderBottom: `2px solid ${COLORS.secondary}20`,
  },

  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[3],
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  logoIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.secondary,
  },

  logoText: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    letterSpacing: '1px',
  },

  logoDot: {
    color: COLORS.secondary,
  },

  brandDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    maxWidth: '300px',
  },

  trustBadges: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
    marginTop: SPACING[1],
  },

  trustBadge: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
  },

  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },

  linkTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
    position: 'relative',
    paddingBottom: SPACING[1],
    borderBottom: `2px solid ${COLORS.secondary}30`,
  },

  link: {
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    transition: 'all 0.3s ease',
    position: 'relative',
    ':hover': {
      color: COLORS.secondary,
      transform: 'translateX(6px)',
    },
  },

  // ✅ Newsletter Section
  newsletterSection: {
    padding: `${SPACING[8]} 0`,
    borderBottom: `2px solid ${COLORS.secondary}20`,
  },

  newsletterContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[4],
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },

  newsletterText: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },

  newsletterTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },

  newsletterDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },

  subscribeForm: {
    display: 'flex',
    gap: SPACING[2],
    width: '100%',
    maxWidth: '500px',
  },

  subscribeInput: {
    flex: 1,
    padding: `${SPACING[3]} ${SPACING[4]}`,
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `2px solid ${COLORS.secondary}30`,
    borderRadius: BORDER_RADIUS.lg,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    outline: 'none',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: COLORS.secondary,
      backgroundColor: `rgba(139, 30, 63, 0.05)`,
      boxShadow: `0 0 20px ${COLORS.secondary}20`,
    },
    ':placeholder': {
      color: 'rgba(255,255,255,0.3)',
    },
  },

  subscribeBtn: {
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.4)`,
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.5)`,
    },
  },

  successMessage: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#4ADE80',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING[2],
    border: `1px solid rgba(74, 222, 128, 0.2)`,
  },

  // ✅ Security Section
  securitySection: {
    padding: `${SPACING[8]} 0`,
    borderBottom: `2px solid ${COLORS.secondary}20`,
  },

  securityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: SPACING[6],
  },

  securityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: SPACING[3],
    padding: SPACING[4],
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid ${COLORS.secondary}20`,
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: `rgba(139, 30, 63, 0.05)`,
      borderColor: COLORS.secondary,
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.15)`,
    },
  },

  securityIcon: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    flexShrink: 0,
  },

  securityTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    margin: 0,
    marginBottom: SPACING[0.5],
  },

  securityDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },

  // ✅ Bottom Bar
  bottom: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: `${SPACING[4]} 0`,
    marginTop: SPACING[4],
    borderTop: `2px solid ${COLORS.secondary}20`,
  },

  bottomContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${SPACING[6]}`,
  },

  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING[4],
  },

  copyright: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
    margin: 0,
  },

  heart: {
    color: COLORS.secondary,
    display: 'inline-block',
    animation: 'heartBeat 1.5s ease-in-out infinite',
  },

  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  bottomLink: {
    color: 'rgba(255,255,255,0.3)',
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    transition: 'all 0.3s ease',
    ':hover': {
      color: COLORS.secondary,
    },
  },

  bottomDivider: {
    color: COLORS.secondary30,
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
};

// Add global styles with animations
const globalStyles = `
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
  }

  .footer-link:hover {
    color: ${COLORS.secondary} !important;
    transform: translateX(6px) !important;
  }
  
  .footer-security-item:hover {
    background-color: rgba(139, 30, 63, 0.05) !important;
    border-color: ${COLORS.secondary} !important;
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 30px rgba(139, 30, 63, 0.15) !important;
  }
  
  .footer-subscribe-btn:hover {
    opacity: 0.9 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 30px rgba(139, 30, 63, 0.5) !important;
  }
  
  .footer-bottom-link:hover {
    color: ${COLORS.secondary} !important;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
    
    .footer-security-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 2rem !important;
    }
    
    .footer-brand-section {
      grid-column: span 2 !important;
    }
    
    .footer-security-grid {
      grid-template-columns: 1fr !important;
    }
    
    .footer-subscribe-form {
      flex-direction: column !important;
    }
    
    .footer-bottom-content {
      flex-direction: column !important;
      text-align: center !important;
    }
  }

  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr !important;
    }
    
    .footer-brand-section {
      grid-column: span 1 !important;
    }
  }
`;

// Inject global styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}