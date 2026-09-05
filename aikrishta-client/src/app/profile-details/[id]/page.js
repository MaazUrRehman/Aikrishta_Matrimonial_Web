// src/app/profile-details/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import UserProfileDetail from '@/components/user-profiles/UserProfileDetail';
import LoadingState from '@/components/user-profiles/LoadingState';
import EmptyState from '@/components/user-profiles/EmptyState';
import { getProfileById } from '@/components/user-profiles/profileDetailService';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '@/constants/theme';
import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';


export default function ProfileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch candidate profile
        if (!id) {
          toast.error("Profile ID is required");
        }
        const data = await getProfileById(id);
        setProfile(data);

        // Fetch current user profile data
        const personalInfoRes = await fetch(API.profile.personalInfo, { credentials: 'include' });
        if (personalInfoRes.ok) {
          const personalInfo = await personalInfoRes.json();
          setCurrentUser(personalInfo.data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, router]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        {/* ✅ Full width container with blue background */}
        <div style={styles.fullContainer}>
          <div style={styles.container}>
            <LoadingState />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={styles.fullContainer}>
          <div style={styles.container}>
            <div style={styles.errorWrapper}>
              <button onClick={handleBack} style={styles.backBtn}>
                Back to Profiles
              </button>
              <EmptyState
                message={error}
                icon="❌"
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!profile || !profile.personalInfo) {
    return (
      <>
        <Navbar />
        <div style={styles.fullContainer}>
          <div style={styles.container}>
            <div style={styles.errorWrapper}>
              <button onClick={handleBack} style={styles.backBtn}>
                Back to Profiles
              </button>
              <EmptyState
                message="Profile not found"
                icon="🔍"
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* ✅ Full width container with blue background */}
      <div style={styles.fullContainer}>
        <div style={styles.container}>
          <div style={styles.headerWrapper}>
            <button onClick={handleBack} style={styles.backBtn}>
              Back to Profiles
            </button>
          </div>
          <UserProfileDetail profile={profile} currentUserPersonal={currentUser} />
        </div>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  // ✅ This div gives full width blue background
  fullContainer: {
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
    padding: `0 ${SPACING[4]}`,
  },
  // ✅ This div centers content with max-width
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${SPACING[6]} 0`,
    minHeight: '100vh',
  },
  headerWrapper: {
    marginBottom: SPACING[6],
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.7)',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY?.fontSize?.sm || '0.875rem',
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    ':hover': {
      backgroundColor: `rgba(201, 169, 110, 0.1)`,
      color: COLORS.accent,
      borderColor: COLORS.accent,
      transform: 'translateX(-4px)',
      boxShadow: `0 4px 20px rgba(201, 169, 110, 0.15)`,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },
  errorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[4],
  },
};