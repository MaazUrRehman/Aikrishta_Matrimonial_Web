'use client';

import PublicHomeNavbar from '@/components/home/PublicHomeNavbar';
import HeroSection from '@/components/home/HeroSection';
import PublicWhySection from '@/components/home/PublicWhySection';
import { COLORS } from '@/constants/theme';

export default function HomePage() {
  return (
    <div style={styles.page}>
      <PublicHomeNavbar />
      <main>
        <HeroSection />
        <PublicWhySection />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.primaryDark,
  },
};
