// src/app/membership/page.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Crown, 
  Star, 
  Sparkles, 
  Shield, 
  Users, 
  MessageCircle, 
  Video, 
  Phone, 
  Eye, 
  Zap, 
  Heart,
  TrendingUp,
  Award,
  Lock,
  Unlock,
  ChevronRight
} from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function MembershipPage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  // ✅ Free plan selected by default
  const [selectedPlan, setSelectedPlan] = useState('free');

  const freeFeatures = [
    { icon: <Users size={18} />, text: 'Basic Profile Creation' },
    { icon: <Search size={18} />, text: 'Browse Limited Profiles' },
    { icon: <MessageCircle size={18} />, text: 'Send Interest (Limited)' },
    { icon: <Eye size={18} />, text: 'Basic Search Filters' },
    { icon: <Heart size={18} />, text: 'Save Favorites (Limited)' },
    { icon: <Shield size={18} />, text: 'Basic Security' },
  ];

  const premiumFeatures = [
    { icon: <Unlock size={18} />, text: 'View Full Contact Details' },
    { icon: <Eye size={18} />, text: 'See Who Viewed Your Profile' },
    { icon: <Crown size={18} />, text: 'Priority Listing in Search' },
    { icon: <MessageCircle size={18} />, text: 'Unlimited Messaging' },
    { icon: <Video size={18} />, text: 'Video & Voice Calls' },
    { icon: <Zap size={18} />, text: 'Profile Boosting (300% More Views)' },
    { icon: <Sparkles size={18} />, text: 'Advanced AI Matchmaking' },
    { icon: <TrendingUp size={18} />, text: 'Advanced Filters & Recommendations' },
    { icon: <Heart size={18} />, text: 'Unlimited Favorites' },
    { icon: <Star size={18} />, text: 'Personalized Matchmaking Support' },
  ];

  const premiumBenefits = [
    'Connect instantly with potential partners',
    'Know who is interested in you',
    '100x more visibility to matches',
    'Find your perfect match faster',
    'Get expert advice for your perfect match',
    'Increase match requests by 300%',
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Choose Your Plan',
      desc: 'Select the membership plan that fits your needs',
      icon: <Crown size={24} />
    },
    {
      step: '02',
      title: 'Complete Payment',
      desc: 'Secure payment with multiple options available',
      icon: <Shield size={24} />
    },
    {
      step: '03',
      title: 'Get Access',
      desc: 'Instantly unlock all premium features',
      icon: <Unlock size={24} />
    },
    {
      step: '04',
      title: 'Find Your Match',
      desc: 'Start connecting with your perfect life partner',
      icon: <Heart size={24} />
    },
  ];

  const stats = [
    { value: '95%', label: 'Success Rate' },
    { value: '10K+', label: 'Premium Members' },
    { value: '4.8★', label: 'User Rating' },
    { value: '3X', label: 'More Matches' },
  ];

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={styles.heroInner}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={styles.heroBadge}
              >
                ✦ Premium Membership
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={styles.heroTitle}
              >
                Unlock Your <span style={styles.heroHighlight}>Perfect Match</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={styles.heroDesc}
              >
                Upgrade to premium and get access to exclusive features that help you 
                find your life partner faster and more efficiently
              </motion.p>
              
              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={styles.heroStats}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    style={styles.heroStat}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={styles.heroStatValue}>{stat.value}</span>
                    <span style={styles.heroStatLabel}>{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works - With Animations */}
        <section style={styles.howItWorksSection}>
          <div style={styles.sectionHeader}>
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.sectionBadge}
            >
              ✦ How It Works
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={styles.sectionTitle}
            >
              Get Started in <span style={styles.sectionHighlight}>4 Easy Steps</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={styles.sectionDesc}
            >
              Start your premium journey and find your perfect match today
            </motion.p>
          </div>

          <div style={styles.stepsGrid}>
            {howItWorks.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                style={{
                  ...styles.stepCard,
                  ...(hoveredStep === index && styles.stepCardHover),
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  style={styles.stepNumber}
                  animate={hoveredStep === index ? { scale: 1.1, color: COLORS.accent } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.step}
                </motion.div>
                <motion.div 
                  style={{
                    ...styles.stepIconWrapper,
                    ...(hoveredStep === index && styles.stepIconWrapperHover),
                  }}
                  animate={hoveredStep === index ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <h4 style={{
                  ...styles.stepTitle,
                  ...(hoveredStep === index && styles.stepTitleHover),
                }}>
                  {step.title}
                </h4>
                <p style={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Plans Grid - With Selection */}
        <div style={styles.plansGrid}>
          {/* Free Plan - Selected by default */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              ...styles.planCard,
              ...styles.planCardSelected, // ✅ Selected by default
              ...(hoveredPlan === 'free' && !selectedPlan && styles.planCardHover),
            }}
            onMouseEnter={() => setHoveredPlan('free')}
            onMouseLeave={() => setHoveredPlan(null)}
            onClick={() => setSelectedPlan('free')}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            cursor="pointer"
          >
            <div style={styles.planHeader}>
              <motion.span 
                style={styles.planIcon}
                animate={hoveredPlan === 'free' || selectedPlan === 'free' ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                👤
              </motion.span>
              <h3 style={styles.planName}>Free Plan</h3>
              <p style={styles.planDesc}>Basic features to get started</p>
            </div>

            <div style={styles.planFeatures}>
              {freeFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  style={styles.featureItem}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <span style={styles.featureIcon}>{feature.icon}</span>
                  <span style={styles.featureText}>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              style={{
                ...styles.planBtn,
                ...(selectedPlan === 'free' ? styles.planBtnSelected : styles.planBtnUnselected),
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedPlan === 'free' ? '✅ Current Plan' : 'Select Plan'}
            </motion.button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              ...styles.planCard,
              ...styles.planCardPremium,
              ...(selectedPlan === 'premium' && styles.planCardSelected),
              ...(hoveredPlan === 'premium' && !selectedPlan && styles.planCardHover),
            }}
            onMouseEnter={() => setHoveredPlan('premium')}
            onMouseLeave={() => setHoveredPlan(null)}
            onClick={() => setSelectedPlan('premium')}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            cursor="pointer"
          >
            <motion.div 
              style={styles.popularBadge}
              animate={hoveredPlan === 'premium' || selectedPlan === 'premium' ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Star size={14} />
              Most Popular
            </motion.div>
            
            <div style={styles.planHeader}>
              <motion.span 
                style={styles.planIcon}
                animate={hoveredPlan === 'premium' || selectedPlan === 'premium' ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                👑
              </motion.span>
              <h3 style={styles.planNamePremium}>Premium Plan</h3>
              <p style={styles.planDesc}>All features unlocked for premium experience</p>
            </div>

            <div style={styles.planFeatures}>
              {premiumFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  style={styles.featureItem}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <span style={styles.featureIconPremium}>{feature.icon}</span>
                  <span style={styles.featureTextPremium}>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              style={{
                ...styles.planBtn,
                ...(selectedPlan === 'premium' ? styles.planBtnSelected : styles.planBtnUnselected),
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {selectedPlan === 'premium' ? '✅ Current Plan' : '⭐ Upgrade Now →'}
            </motion.button>
          </motion.div>
        </div>

        {/* Premium Benefits - With Animations */}
        <section style={styles.benefitsSection}>
          <div style={styles.sectionHeader}>
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.sectionBadge}
            >
              ✦ Premium Benefits
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={styles.sectionTitle}
            >
              What You <span style={styles.sectionHighlight}>Get</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={styles.sectionDesc}
            >
              Exclusive features designed to help you find your perfect match faster
            </motion.p>
          </div>

          <div style={styles.benefitsGrid}>
            {premiumBenefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                style={{
                  ...styles.benefitItem,
                  ...(hoveredBenefit === index && styles.benefitItemHover),
                }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                whileHover={{ x: 6, transition: { duration: 0.3 } }}
              >
                <motion.span 
                  style={styles.benefitCheck}
                  animate={hoveredBenefit === index ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ✓
                </motion.span>
                <span style={styles.benefitText}>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </section>

       
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '1280px',
    margin: `0 auto`,
    padding: `${SPACING[6]} ${SPACING[6]}`,
  },
  // Hero Section
  heroSection: {
    position: 'relative',
    padding: `${SPACING[12]} ${SPACING[6]}`,
    marginBottom: SPACING[12],
    borderRadius: BORDER_RADIUS['2xl'],
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${COLORS.secondary}20, ${COLORS.accent}10)`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(ellipse at 30% 20%, ${COLORS.secondary}15 0%, transparent 60%),
                 radial-gradient(ellipse at 70% 80%, ${COLORS.accent}10 0%, transparent 60%)`,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  heroInner: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: `${SPACING[1]} ${SPACING[4]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(201, 169, 110, 0.08)`,
    marginBottom: SPACING[4],
  },
  heroTitle: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[4],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    lineHeight: 1.2,
  },
  heroHighlight: {
    color: COLORS.accent,
  },
  heroDesc: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '600px',
    margin: `0 auto ${SPACING[8]}`,
    lineHeight: 1.8,
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING[8],
    flexWrap: 'wrap',
    paddingTop: SPACING[6],
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  heroStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[0.5],
    transition: 'transform 0.3s ease',
    cursor: 'default',
  },
  heroStatValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  heroStatLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  // How It Works
  howItWorksSection: {
    padding: `${SPACING[8]} 0`,
    marginBottom: SPACING[8],
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: SPACING[10],
  },
  sectionBadge: {
    display: 'inline-block',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: `${SPACING[1]} ${SPACING[4]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}30`,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(201, 169, 110, 0.08)`,
    marginBottom: SPACING[4],
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  sectionHighlight: {
    color: COLORS.accent,
  },
  sectionDesc: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: SPACING[6],
  },
  stepCard: {
    textAlign: 'center',
    padding: SPACING[6],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'default',
  },
  stepCardHover: {
    borderColor: COLORS.accent,
    background: `rgba(201, 169, 110, 0.06)`,
    boxShadow: `0 8px 30px rgba(0,0,0,0.2)`,
  },
  stepNumber: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: 'rgba(255,255,255,0.05)',
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    marginBottom: SPACING[2],
    transition: 'all 0.3s ease',
  },
  stepIconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: `rgba(201, 169, 110, 0.08)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto ${SPACING[3]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
    color: COLORS.accent,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  stepIconWrapperHover: {
    background: COLORS.accent,
    borderColor: COLORS.accent,
    color: COLORS.primary,
    boxShadow: `0 0 30px rgba(201, 169, 110, 0.3)`,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    transition: 'color 0.3s ease',
  },
  stepTitleHover: {
    color: COLORS.accent,
  },
  stepDesc: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.6,
  },
  // Plans Grid
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: SPACING[8],
    marginBottom: SPACING[12],
  },
  planCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING[8],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[6],
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
  },
  planCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
  },
  // ✅ Selected styling - Gold border and glow
  planCardSelected: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: COLORS.accent,
    background: `rgba(201, 169, 110, 0.08)`,
    boxShadow: `0 0 40px rgba(201, 169, 110, 0.1)`,
  },
  planCardPremium: {
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    right: SPACING[4],
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[0.5]} ${SPACING[3]}`,
    background: COLORS.accent,
    color: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    transition: 'transform 0.3s ease',
  },
  planHeader: {
    textAlign: 'center',
  },
  planIcon: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    display: 'block',
    marginBottom: SPACING[2],
    transition: 'all 0.3s ease',
  },
  planName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  planNamePremium: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.accent,
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  planDesc: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
  },
  planFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
    flex: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: `${SPACING[1]} 0`,
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    color: 'rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
  },
  featureIconPremium: {
    color: COLORS.accent,
    display: 'flex',
    alignItems: 'center',
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  featureTextPremium: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  planBtn: {
    padding: `${SPACING[3]} ${SPACING[6]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    width: '100%',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[2],
    cursor: 'pointer',
  },
  planBtnSelected: {
    background: 'rgba(201, 169, 110, 0.12)',
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}30`,
    cursor: 'default',
  },
  planBtnUnselected: {
    background: COLORS.secondary,
    color: COLORS.textWhite,
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
    },
  },
  // Benefits Section
  benefitsSection: {
    padding: `${SPACING[8]} 0`,
    marginBottom: SPACING[8],
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: SPACING[4],
    maxWidth: '700px',
    margin: '0 auto',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: SPACING[3],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'default',
  },
  benefitItemHover: {
    borderColor: COLORS.accent,
    background: `rgba(201, 169, 110, 0.06)`,
    boxShadow: `0 4px 20px rgba(201, 169, 110, 0.1)`,
  },
  benefitCheck: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    transition: 'transform 0.3s ease',
  },
  benefitText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
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
    marginBottom: SPACING[8],
    transition: 'all 0.4s ease',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  ctaDesc: {
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
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 25px rgba(139, 30, 63, 0.4)`,
  },
  ctaGuarantee: {
    display: 'block',
    marginTop: SPACING[3],
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.3)',
  },
};

// Add Search icon for free features
const Search = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

// Add keyframe animations
if (typeof window !== 'undefined') {
  const animations = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}