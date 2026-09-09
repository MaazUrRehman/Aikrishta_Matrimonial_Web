// src/components/ai-match/AIMatchHero.js
'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Users, Brain, Heart, Star, TrendingUp } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function AIMatchHero({ onFetchMatches, loading, hasFetched }) {
  const benefits = [
    {
      icon: <Brain size={24} />,
      title: 'AI-Powered Intelligence',
      desc: 'Advanced algorithms analyze compatibility across 20+ dimensions'
    },
    {
      icon: <Heart size={24} />,
      title: 'Meaningful Connections',
      desc: 'Find partners who truly align with your values and preferences'
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Matching',
      desc: 'Get smart match recommendations in seconds, not days'
    },
    {
      icon: <Shield size={24} />,
      title: 'Verified Profiles',
      desc: 'Every profile is manually verified for authenticity and trust'
    },
  ];

  const stats = [
    { value: '95%', label: 'Match Accuracy' },
    { value: '50K+', label: 'Successful Matches' },
    { value: '4.8★', label: 'User Rating' },
    { value: '10K+', label: 'Happy Members' },
  ];

  return (
    <section style={styles.section}>
      {/* Background Effects */}
      <div style={styles.backgroundEffects}>
        <div style={styles.glowOrb1}></div>
        <div style={styles.glowOrb2}></div>
        <div style={styles.glowOrb3}></div>
      </div>

      <div style={styles.container}>
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.content}
        >
          

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={styles.heading}
          >
            Find Your <span style={styles.highlight}>Perfect Match</span>
            <br />
            <span style={styles.subHighlight}>with AI Precision</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={styles.description}
          >
            Our advanced AI algorithm analyzes your preferences, personality traits, 
            and lifestyle to find the most compatible life partners. Trusted by thousands 
            of happy couples worldwide.
          </motion.p>

          
          
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={styles.benefitsGrid}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
              style={styles.benefitCard}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3 }
              }}
            >
              <div style={styles.benefitIconWrapper}>
                <span style={styles.benefitIcon}>{benefit.icon}</span>
              </div>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <p style={styles.benefitDesc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    padding: `${SPACING[12]} ${SPACING[8]}`,
    background: `radial-gradient(circle at center, rgba(5, 18, 41, 0.94) 0%, rgba(10, 25, 47, 0.78) 38%, rgba(10, 25, 47, 0.38) 75%, rgba(10, 25, 47, 0.18) 100%), url('/images/ai-match-bg-hero-img.png') center / cover no-repeat`,
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    overflow: 'hidden',
    borderRadius: 0,
    marginBottom: SPACING[8],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  backgroundEffects: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
  },
  glowOrb1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.secondary}20, transparent 70%)`,
    animation: 'floatOrb 8s ease-in-out infinite',
  },
  glowOrb2: {
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.accent}15, transparent 70%)`,
    animation: 'floatOrb 10s ease-in-out infinite reverse',
  },
  glowOrb3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.secondary}08, transparent 70%)`,
  },
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    zIndex: 1,
  },
  content: {
    textAlign: 'center',
    marginBottom: SPACING[10],
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[1]} ${SPACING[4]}`,
    background: `rgba(201, 169, 110, 0.08)`,
    border: `1px solid ${COLORS.accent}30`,
    borderRadius: BORDER_RADIUS.full,
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING[4],
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  badgeIcon: {
    color: COLORS.accent,
  },
  heading: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginTop: SPACING[8],
    marginBottom: SPACING[4],
    lineHeight: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  highlight: {
    color: COLORS.accent,
    position: 'relative',
  },
  subHighlight: {
    color: 'rgba(255,255,255,0.7)',
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '650px',
    margin: `0 auto ${SPACING[6]}`,
    lineHeight: 1.8,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  ctaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[3],
    marginBottom: SPACING[8],
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[8]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    borderRadius: BORDER_RADIUS.full,
    border: 'none',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
  },
  refreshBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[8]}`,
    background: 'rgba(255,255,255,0.05)',
    color: COLORS.textWhite,
    borderRadius: BORDER_RADIUS.full,
    border: `1px solid ${COLORS.accent}30`,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  spinner: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  ctaNote: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  statsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING[8],
    flexWrap: 'wrap',
    paddingTop: SPACING[6],
    borderTop: `1px solid rgba(255,255,255,0.06)`,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[0.5],
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: SPACING[5],
    marginBottom: SPACING[8],
  },
  benefitCard: {
    padding: SPACING[5],
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  benefitIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: `rgba(201, 169, 110, 0.08)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto ${SPACING[3]}`,
    border: `1px solid ${COLORS.accent}20`,
  },
  benefitIcon: {
    color: COLORS.accent,
  },
  benefitTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  benefitDesc: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.6,
    margin: 0,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  trustSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[4],
    flexWrap: 'wrap',
    paddingTop: SPACING[6],
    borderTop: `1px solid rgba(255,255,255,0.04)`,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    color: 'rgba(255,255,255,0.4)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  trustIcon: {
    color: COLORS.accent,
  },
  trustDivider: {
    width: '1px',
    height: '20px',
    background: 'rgba(255,255,255,0.06)',
  },
};

// Add animations
if (typeof window !== 'undefined') {
  const animations = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(20px, -20px); }
      66% { transform: translate(-20px, 10px); }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}