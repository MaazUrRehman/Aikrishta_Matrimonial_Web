'use client';

import UserProfilesPage from '@/components/user-profiles/UserProfilesPage';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function UserProfilesPageWrapper() {
  return (
    <>
      <Navbar />
      <UserProfilesPage />
      <Footer />
    </>
  );
}