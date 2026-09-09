

// src/app/user-profiles/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getOppositeGenderProfiles } from './aiMatchingService';
import ProfilesHeader from './ProfilesHeader';
import ProfileSearch from './ProfileSearch';
import ProfileFilters from './ProfileFilters';
import ProfileGrid from './ProfileGrid';
import ProfilePagination from './ProfilePagination';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { COLORS, SPACING } from '@/constants/theme';
import { API } from '@/lib/api';

export default function UserProfilesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    preferredAge: false,
    preferredEducation: false,
    preferredProfession: false,
    preferredCaste: false,
    preferredMaritalStatus: false,
    preferredCity: false,
    preferredCountry: false,
    sameReligion: false,
    sameCommunity: false,
  });
  const [partnerPreference, setPartnerPreference] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const profilesPerPage = 12;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    const loadPartnerPreference = async () => {
      if (!user) return;
      try {
        const response = await fetch(API.profile.partnerPreference, {
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          setPartnerPreference(result.data || null);
        }
      } catch (err) {
        console.error("Error loading partner preference:", err);
      }
    };

    const loadPersonalInfo = async () => {
      if (!user) return;
      try {
        const personalRes = await fetch(API.profile.personalInfo, {
          credentials: "include",
        });
        if (personalRes.ok) {
          const personalResult = await personalRes.json();
          setPersonalInfo(personalResult.data);
        }
      } catch (err) {
        console.error("Error loading personal info:", err);
      }
    };

    loadPartnerPreference();
    loadPersonalInfo();
  }, [user]);

  const loadProfiles = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getOppositeGenderProfiles();
      if (response?.data) {
        let filteredProfiles = response.data.filter(profile => profile.profileActivation !== false);

        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredProfiles = filteredProfiles.filter(profile =>
            profile.first_name?.toLowerCase().includes(searchLower) ||
            profile.last_name?.toLowerCase().includes(searchLower) ||
            profile.city?.toLowerCase().includes(searchLower) ||
            profile.country?.toLowerCase().includes(searchLower) ||
            profile.profession?.toLowerCase().includes(searchLower) ||
            profile.education?.toLowerCase().includes(searchLower)
          );
        }

        const matchesPreference = (value, preference) =>
          String(value || '').trim().toLowerCase() === String(preference || '').trim().toLowerCase();

        if (partnerPreference) {
          if (filters.preferredAge) {
            filteredProfiles = filteredProfiles.filter((profile) =>
              profile.age >= partnerPreference.preferred_age_min &&
              profile.age <= partnerPreference.preferred_age_max
            );
          }
          if (filters.preferredEducation) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.education, partnerPreference.preferred_education));
          if (filters.preferredProfession) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.profession, partnerPreference.preferred_profession));
          if (filters.preferredCaste) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.caste, partnerPreference.preferred_caste));
          if (filters.preferredMaritalStatus) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.marital_status, partnerPreference.preferred_marital_status));
          if (filters.preferredCity) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.city, partnerPreference.preferred_city));
          if (filters.preferredCountry) filteredProfiles = filteredProfiles.filter((profile) => matchesPreference(profile.country, partnerPreference.preferred_country));

          if (filters.sameReligion) {
            filteredProfiles = filteredProfiles.filter(profile =>
              String(profile.religion || '').trim().toLowerCase() ===
              String(personalInfo?.religion || '').trim().toLowerCase()
            );
          }

          if (filters.sameCommunity) {
            filteredProfiles = filteredProfiles.filter(profile =>
              String(profile.caste || '').trim().toLowerCase() ===
              String(personalInfo?.caste || '').trim().toLowerCase()
            );
          }
        }

        setTotalProfiles(filteredProfiles.length);
        setTotalPages(Math.ceil(filteredProfiles.length / profilesPerPage));
        const startIndex = (currentPage - 1) * profilesPerPage;
        const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + profilesPerPage);
        setProfiles(paginatedProfiles);
      }
    } catch (err) {
      console.error('Error loading profiles:', err);
      setError(err.message || 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  }, [user, searchTerm, filters, currentPage, partnerPreference, personalInfo]);

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [loadProfiles, user]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchValue(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingState />;
  if (error) return <EmptyState message={error} icon="❌" />;

  return (
    <div style={styles.container}>
      {/* Inner wrapper for content with max-width */}
      <div style={styles.innerContainer}>
        <ProfilesHeader totalCount={totalProfiles} />
        <div style={styles.searchFilterWrapper}>
          <ProfileSearch
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
          />
          <ProfileFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            partnerPreference={partnerPreference}
            personalInfo={personalInfo}
          />
        </div>
        {profiles.length === 0 ? (
          <EmptyState message="No profiles found matching your criteria" icon="🔍" />
        ) : (
          <>
            <ProfileGrid profiles={profiles} />
            {totalPages > 1 && (
              <ProfilePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ✅ Updated styles - Full width blue background with centered content
const styles = {
  container: {
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
    padding: `0 ${SPACING[6]}`,
  },
  innerContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${SPACING[6]} 0`,
  },
  searchFilterWrapper: {
    marginBottom: SPACING[8],
  },
};