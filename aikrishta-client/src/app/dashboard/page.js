// src/app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/constants/theme';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection';
import PremiumSection from '@/components/home/PremiumSection';
import CTASection from '@/components/home/CTASection';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <main>
        <HeroSection user={user} />
        <FeaturesSection />
        <CategoriesSection />
        <HowItWorksSection />
        <SuccessStoriesSection />
        <PremiumSection />
      </main>
      <Footer />
    </div>
  );
}

// ==================== STYLES ====================

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.bgWhite,
  },

  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLightest,
  },

  loader: {
    width: '40px',
    height: '40px',
    border: `4px solid ${COLORS.border}`,
    borderTop: `4px solid ${COLORS.secondary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};