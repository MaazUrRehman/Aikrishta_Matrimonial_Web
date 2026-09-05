// src/app/legal/page.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Users,
  MessageCircle,
  Eye,
  UserCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Heart,
  Star
} from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('privacy');
  const [openFaq, setOpenFaq] = useState(null);

  const sections = [
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={18} /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText size={18} /> },
    { id: 'safety', label: 'Safety Tips', icon: <Shield size={18} /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={18} /> },
  ];

  const privacyPolicy = {
    intro: 'At AIKrishta, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.',
    sections: [
      {
        title: 'Information We Collect',
        items: [
          'Personal information (name, email, phone number, date of birth)',
          'Profile information (photos, bio, preferences, interests)',
          'Usage data (how you interact with our platform)',
          'Device information (IP address, browser type, device type)',
          'Location data (city, country, timezone)'
        ]
      },
      {
        title: 'How We Use Your Information',
        items: [
          'To create and manage your account',
          'To match you with compatible partners',
          'To improve our matchmaking algorithms',
          'To send you relevant notifications and updates',
          'To ensure platform security and prevent fraud'
        ]
      },
      {
        title: 'Data Protection',
        items: [
          'All data is encrypted using industry-standard SSL/TLS protocols',
          'Your password is hashed and never stored in plain text',
          'We use firewalls and intrusion detection systems',
          'Regular security audits and vulnerability assessments',
          'Strict access controls for your personal data'
        ]
      },
      {
        title: 'Your Rights',
        items: [
          'Access and view your personal data',
          'Update or correct your information',
          'Delete your account and data',
          'Opt-out of marketing communications',
          'Data portability (download your data)'
        ]
      },
      {
        title: 'Data Retention',
        items: [
          'We retain your data as long as you have an active account',
          'After account deletion, data is permanently removed within 30 days',
          'Anonymized data may be retained for analytics purposes',
          'You can request data deletion at any time'
        ]
      }
    ],
    contact: 'For any privacy-related questions, contact us at privacy@aikrishta.com'
  };

  const termsConditions = {
    intro: 'By using AIKrishta, you agree to the following terms and conditions. Please read them carefully.',
    sections: [
      {
        title: 'Account Registration',
        items: [
          'You must be 18 years or older to create an account',
          'Provide accurate and complete information',
          'You are responsible for maintaining account security',
          'One account per person (multiple accounts are prohibited)',
          'You agree to receive communications from us'
        ]
      },
      {
        title: 'User Conduct',
        items: [
          'Be respectful and courteous to other members',
          'Do not share inappropriate or offensive content',
          'Do not harass, abuse, or threaten others',
          'Do not impersonate other individuals',
          'Do not share contact information in public areas',
          'Report any suspicious behavior to our support team'
        ]
      },
      {
        title: 'Membership & Payments',
        items: [
          'Premium membership is optional and provides additional features',
          'All payments are securely processed through our payment partners',
          'Subscription fees are non-refundable',
          'You can cancel your subscription at any time',
          'Pricing is subject to change with prior notice'
        ]
      },
      {
        title: 'Content Ownership',
        items: [
          'You retain ownership of your profile content',
          'You grant us a license to display your content on our platform',
          'We do not claim ownership of your photos or information',
          'You are responsible for the content you post',
          'We may remove content that violates our policies'
        ]
      },
      {
        title: 'Platform Use',
        items: [
          'AIKrishta is a matchmaking platform for serious relationships',
          'We are not responsible for interactions between members',
          'We reserve the right to suspend or terminate accounts',
          'Use the platform at your own risk',
          'We may modify or update the platform at any time'
        ]
      }
    ],
    contact: 'For any legal questions, contact us at legal@aikrishta.com'
  };

  const safetyTips = [
    {
      icon: <UserCheck size={24} />,
      title: 'Verify Your Profile',
      tips: [
        'Complete your profile with accurate information',
        'Add a clear profile photo for verification',
        'Use the verification badge feature',
        'Keep your contact information up to date'
      ]
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Safe Communication',
      tips: [
        'Use our in-app messaging for initial conversations',
        'Keep personal contact details private until you feel comfortable',
        'Be cautious of sharing personal photos or sensitive information',
        'Trust your instincts - if something feels wrong, it probably is'
      ]
    },
    {
      icon: <Eye size={24} />,
      title: 'Meeting Safely',
      tips: [
        'Always meet in public places for the first few meetings',
        'Inform a friend or family member about your plans',
        'Arrange your own transportation to and from the meeting',
        'Take your time and don\'t rush into anything',
        'Trust your gut feelings'
      ]
    },
    {
      icon: <Shield size={24} />,
      title: 'Online Safety',
      tips: [
        'Never send money to someone you\'ve met online',
        'Beware of individuals asking for financial assistance',
        'Report suspicious profiles immediately',
        'Keep your personal information secure',
        'Use strong passwords and enable two-factor authentication'
      ]
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Red Flags to Watch',
      tips: [
        'Inconsistent stories or information',
        'Refusal to video call or meet in person',
        'Requests for money or financial help',
        'Moving too quickly in the relationship',
        'Pressuring you for personal information',
        'Profiles with limited or suspicious photos'
      ]
    },
    {
      icon: <Heart size={24} />,
      title: 'Building Trust',
      tips: [
        'Take time to get to know someone before committing',
        'Communicate openly and honestly',
        'Respect each other\'s boundaries',
        'Be patient and don\'t feel pressured',
        'Trust develops over time, not overnight'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How does AIKrishta\'s matchmaking work?',
      answer: 'Our advanced AI algorithm analyzes your profile information, preferences, and behavior patterns to find the most compatible matches. We consider over 20 dimensions including values, lifestyle, education, profession, and personality traits.'
    },
    {
      question: 'Is AIKrishta free to use?',
      answer: 'AIKrishta offers both free and premium membership options. With the free plan, you can create a profile, browse matches, and send limited interests. Premium membership unlocks additional features like viewing contact details, seeing who viewed your profile, and priority listing.'
    },
    {
      question: 'How do I get my profile verified?',
      answer: 'To get verified, complete your profile with all required information, add a clear profile photo, and submit your profile for verification. Our team will review your profile within 24-48 hours. Once approved, you\'ll receive a verification badge on your profile.'
    },
    {
      question: 'What happens if I encounter a fake profile?',
      answer: 'If you encounter a suspicious or fake profile, please report it immediately using the "Report" button on the profile page. Our team will investigate and take appropriate action. Your safety is our top priority.'
    },
    {
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account at any time. Go to your account settings and select "Delete Account". Your data will be permanently removed within 30 days. If you change your mind, you can reactivate your account within this period.'
    },
    {
      question: 'How is my data protected?',
      answer: 'We use industry-standard encryption (SSL/TLS) to protect your data during transmission. Your password is hashed and never stored in plain text. We also employ firewalls, intrusion detection systems, and regular security audits to ensure your data remains safe.'
    },
    {
      question: 'What are the premium membership benefits?',
      answer: 'Premium members get access to: View full contact details, see who viewed your profile, priority listing in search results, unlimited messaging, video and voice calls, profile boosting (300% more views), advanced AI matchmaking, unlimited favorites, and personalized matchmaking support.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the Help Center, email us at support@aikrishta.com, or use the live chat feature available on our platform. Our team is available 24/7 to assist you with any questions or concerns.'
    }
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
              <span style={styles.heroBadge}>✦ Trust & Transparency</span>
              <h1 style={styles.heroTitle}>
                Legal & <span style={styles.heroHighlight}>Safety Center</span>
              </h1>
              <p style={styles.heroDesc}>
                Your trust and safety are our top priorities. Learn about our policies,
                safety tips, and get answers to frequently asked questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div style={styles.tabsWrapper}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                ...styles.tabBtn,
                ...(activeSection === section.id ? styles.tabBtnActive : {})
              }}
            >
              <span style={styles.tabIcon}>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={styles.contentWrapper}
        >
          {/* Privacy Policy */}
          {activeSection === 'privacy' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <Lock size={28} style={styles.sectionIcon} />
                <h2 style={styles.sectionTitle}>Privacy Policy</h2>
              </div>
              <p style={styles.sectionIntro}>{privacyPolicy.intro}</p>
              
              {privacyPolicy.sections.map((section, index) => (
                <div key={index} style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>{section.title}</h3>
                  <ul style={styles.infoList}>
                    {section.items.map((item, idx) => (
                      <li key={idx} style={styles.infoItem}>
                        <span style={styles.infoDot}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              
            </div>
          )}

          {/* Terms & Conditions */}
          {activeSection === 'terms' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <FileText size={28} style={styles.sectionIcon} />
                <h2 style={styles.sectionTitle}>Terms & Conditions</h2>
              </div>
              <p style={styles.sectionIntro}>{termsConditions.intro}</p>
              
              {termsConditions.sections.map((section, index) => (
                <div key={index} style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>{section.title}</h3>
                  <ul style={styles.infoList}>
                    {section.items.map((item, idx) => (
                      <li key={idx} style={styles.infoItem}>
                        <span style={styles.infoDot}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div style={styles.contactBox}>
                <Mail size={20} style={styles.contactIcon} />
                <span style={styles.contactText}>{termsConditions.contact}</span>
              </div>
            </div>
          )}

          {/* Safety Tips */}
          {activeSection === 'safety' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <Shield size={28} style={styles.sectionIcon} />
                <h2 style={styles.sectionTitle}>Safety Tips</h2>
              </div>
              <p style={styles.sectionIntro}>
                Your safety is our priority. Follow these tips to ensure a safe and secure experience on AIKrishta.
              </p>
              
              <div style={styles.safetyGrid}>
                {safetyTips.map((tip, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={styles.safetyCard}
                    whileHover={{ y: -4 }}
                  >
                    <div style={styles.safetyIconWrapper}>
                      <span style={styles.safetyIcon}>{tip.icon}</span>
                    </div>
                    <h4 style={styles.safetyTitle}>{tip.title}</h4>
                    <ul style={styles.safetyList}>
                      {tip.tips.map((item, idx) => (
                        <li key={idx} style={styles.safetyItem}>
                          <CheckCircle size={14} style={styles.safetyCheck} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {activeSection === 'faqs' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <HelpCircle size={28} style={styles.sectionIcon} />
                <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
              </div>
              <p style={styles.sectionIntro}>
                Find answers to the most common questions about AIKrishta.
              </p>
              
              <div style={styles.faqContainer}>
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        ...styles.faqItem,
                        ...(isOpen && styles.faqItemOpen)
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        style={styles.faqQuestion}
                      >
                        <span style={styles.faqQuestionText}>{faq.question}</span>
                        <span style={styles.faqToggle}>
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </span>
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={styles.faqAnswer}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        
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
    marginBottom: SPACING[8],
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
    margin: `0 auto`,
    lineHeight: 1.8,
  },
  // Tabs
  tabsWrapper: {
    display: 'flex',
    gap: SPACING[2],
    flexWrap: 'wrap',
    marginBottom: SPACING[8],
    padding: SPACING[2],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(10px)',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  tabBtnActive: {
    background: `rgba(201, 169, 110, 0.08)`,
    borderColor: COLORS.accent,
    color: COLORS.accent,
  },
  tabIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  // Content
  contentWrapper: {
    marginBottom: SPACING[8],
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[6],
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    marginBottom: SPACING[2],
  },
  sectionIcon: {
    color: COLORS.accent,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    margin: 0,
  },
  sectionIntro: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.8,
    marginBottom: SPACING[2],
  },
  // Info Cards
  infoCard: {
    padding: SPACING[6],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
  },
  infoTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    marginBottom: SPACING[3],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: SPACING[2],
    color: 'rgba(255,255,255,0.7)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: 1.6,
  },
  infoDot: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  contactBox: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: SPACING[4],
    background: `rgba(201, 169, 110, 0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
  },
  contactIcon: {
    color: COLORS.accent,
  },
  contactText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  // Safety Grid
  safetyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: SPACING[6],
  },
  safetyCard: {
    padding: SPACING[6],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
    transition: 'all 0.3s ease',
  },
  safetyIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: `rgba(201, 169, 110, 0.08)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING[3],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
  },
  safetyIcon: {
    color: COLORS.accent,
  },
  safetyTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    marginBottom: SPACING[3],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  safetyList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  safetyItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: SPACING[2],
    color: 'rgba(255,255,255,0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: 1.5,
  },
  safetyCheck: {
    color: '#22C55E',
    flexShrink: 0,
    marginTop: '2px',
  },
  // FAQ
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[3],
  },
  faqItem: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  faqItemOpen: {
    borderColor: `${COLORS.accent}30`,
  },
  faqQuestion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: SPACING[4],
    background: 'none',
    border: 'none',
    color: COLORS.textWhite,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  faqQuestionText: {
    flex: 1,
    paddingRight: SPACING[4],
  },
  faqToggle: {
    color: 'rgba(255,255,255,0.3)',
    transition: 'transform 0.3s ease',
    flexShrink: 0,
  },
  faqAnswer: {
    padding: `0 ${SPACING[4]} ${SPACING[4]}`,
    color: 'rgba(255,255,255,0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: 1.8,
  },
  // CTA
  ctaSection: {
    padding: SPACING[12],
    background: `linear-gradient(135deg, ${COLORS.secondary}15, ${COLORS.accent}10)`,
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${COLORS.accent}20`,
    textAlign: 'center',
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
  ctaButtons: {
    display: 'flex',
    gap: SPACING[4],
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
  },
  ctaBtnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    background: 'transparent',
    color: COLORS.textWhite,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: BORDER_RADIUS.full,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    cursor: 'pointer',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
};

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