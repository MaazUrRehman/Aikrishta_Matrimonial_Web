
// src/app/ai-match/page.js
'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ChevronLeft, ChevronRight, RotateCcw, Search, Filter } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import axios from '../../lib/axios';
import MatchCard from '../../components/ai-match/MatchCard';
import AIMatchHero from '../../components/ai-match/AIMatchHero';
import { API } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function AIMatchPage() {
  const { user } = useAuth();
  const [allMatches, setAllMatches] = useState([]);
  const [loggedInUserGender, setLoggedInUserGender] = useState(user?.gender);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [sortBy, setSortBy] = useState('Highest Match %');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(API.profile.personalInfo, { credentials: 'include' })
      .then(response => response.ok ? response.json() : null)
      .then(data => setLoggedInUserGender(data?.data?.gender || user?.gender))
      .catch(() => setLoggedInUserGender(user?.gender));
  }, [user]);

  const handleAIMatch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API.aiMatch.getMatches);
      setAllMatches(response.data.data);
      setHasFetched(true);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to fetch AI matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setCity('');
    setCountry('');
    setEducation('');
    setProfession('');
    setMaritalStatus('');
    setSortBy('Highest Match %');
    setCurrentPage(1);
  };

  // ✅ Get unique values for filter dropdowns
  const getUniqueValues = (key) => {
    const values = allMatches.map(m => m[key]).filter(Boolean);
    return [...new Set(values)];
  };

  const filteredMatches = useMemo(() => {
    let result = allMatches.filter(m => {
      const s = searchTerm.toLowerCase();
      const searchMatch = !s || 
        `${m.first_name || ''} ${m.last_name || ''} ${m.city || ''} ${m.education || ''} ${m.profession || ''} ${m.matchLevel || ''} ${m.matchPercentage || ''}`.toLowerCase().includes(s);
      
      const catMatch = category === 'All' || m.matchLevel === category;
      const cityMatch = !city || (m.city && m.city.toLowerCase() === city.toLowerCase());
      const countryMatch = !country || (m.country && m.country.toLowerCase() === country.toLowerCase());
      const eduMatch = !education || (m.education && m.education.toLowerCase() === education.toLowerCase());
      const profMatch = !profession || (m.profession && m.profession.toLowerCase() === profession.toLowerCase());
      const maritalMatch = !maritalStatus || (m.marital_status && m.marital_status.toLowerCase() === maritalStatus.toLowerCase());

      return searchMatch && catMatch && cityMatch && countryMatch && eduMatch && profMatch && maritalMatch;
    });

    result.sort((a, b) => {
      if (sortBy === 'Highest Match %') return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      if (sortBy === 'Lowest Match %') return (a.matchPercentage || 0) - (b.matchPercentage || 0);
      if (sortBy === 'Age (Low → High)') return (a.age || 0) - (b.age || 0);
      if (sortBy === 'Age (High → Low)') return (b.age || 0) - (a.age || 0);
      return 0;
    });

    return result;
  }, [allMatches, searchTerm, category, city, country, education, profession, maritalStatus, sortBy]);

  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMatches.slice(start, start + itemsPerPage);
  }, [filteredMatches, currentPage]);

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

  const FilterSelect = ({ label, value, onChange, options, placeholder }) => (
    <select 
      value={value} 
      onChange={(e) => { onChange(e.target.value); setCurrentPage(1); }} 
      style={styles.filterSelect}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = COLORS.accent;
        e.currentTarget.style.boxShadow = `0 0 20px rgba(201, 169, 110, 0.1)`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <option value="">{placeholder || label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <main style={styles.main}>
        <AIMatchHero 
          onFetchMatches={handleAIMatch}
          loading={loading}
          hasFetched={hasFetched}
        />

        {!hasFetched && (
          <div style={styles.heroSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={styles.heroContent}
            >
              <h1 style={styles.heroTitle}>
                Smart <span style={styles.heroHighlight}>Matchmaking</span>
              </h1>
              <p style={styles.heroDesc}>
                Find your perfect match using our advanced AI algorithms
              </p>
              {!hasFetched && (
                <motion.button 
                  onClick={handleAIMatch} 
                  disabled={loading} 
                  style={styles.fetchBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 40px rgba(139, 30, 63, 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} style={styles.spinning} />
                      Finding...
                    </>
                  ) : (
                    <>
                      Fetch AI Matches
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          </div>
        )}

        {hasFetched && (
          <>
            {/* Search & Filter Bar */}
            <div style={styles.filterBar}>
              <div style={styles.searchWrapper}>
                <Search size={18} style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search by name, location, education..." 
                  value={searchTerm} 
                  onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
                  style={styles.searchInput}
                  onFocus={(e) => {
                    e.currentTarget.parentElement.style.borderColor = COLORS.accent;
                    e.currentTarget.parentElement.style.boxShadow = `0 0 30px rgba(201, 169, 110, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.parentElement.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={styles.filterActions}>
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  style={styles.filterToggleBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  <Filter size={16} />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <button 
                  type="button" 
                  onClick={resetFilters} 
                  style={styles.resetBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(201, 169, 110, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                > 
                  <RotateCcw size={16} /> 
                  Reset Filters 
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={styles.filtersExpanded}
              >
                <div style={styles.filtersGrid}>
                  <FilterSelect 
                    label="Category" 
                    value={category} 
                    onChange={setCategory} 
                    placeholder="All Categories"
                    options={['Excellent Match', 'Very Good Match', 'Good Match', 'Average Match', 'Low Match']} 
                  />
                  
                  <FilterSelect 
                    label="City" 
                    value={city} 
                    onChange={setCity} 
                    placeholder="Select City"
                    options={getUniqueValues('city')} 
                  />
                  
                  
                  
                  <FilterSelect 
                    label="Education" 
                    value={education} 
                    onChange={setEducation} 
                    placeholder="Select Education"
                    options={getUniqueValues('education')} 
                  />
                  
                  <FilterSelect 
                    label="Profession" 
                    value={profession} 
                    onChange={setProfession} 
                    placeholder="Select Profession"
                    options={getUniqueValues('profession')} 
                  />
                  
                  
                  
                  <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}} style={styles.filterSelect}>
                    <option value="Highest Match %">Highest Match %</option>
                    <option value="Lowest Match %">Lowest Match %</option>
                    <option value="Age (Low → High)">Age (Low → High)</option>
                    <option value="Age (High → Low)">Age (High → Low)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Results Info */}
            <div style={styles.resultsInfo}>
              <span style={styles.resultsCount}>
                Showing <strong>{paginatedMatches.length}</strong> of <strong>{filteredMatches.length}</strong> Matches
              </span>
            </div>
            
            {/* Match Cards Grid */}
            <div style={styles.matchesGrid}>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} style={styles.skeletonCard}>
                    <div style={styles.skeletonImage}></div>
                    <div style={styles.skeletonContent}>
                      <div style={styles.skeletonLine}></div>
                      <div style={styles.skeletonLineShort}></div>
                    </div>
                  </div>
                ))
              ) : paginatedMatches.length > 0 ? (
                paginatedMatches.map((match, index) => (
                  <motion.div
                    key={match.user_id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MatchCard profile={match} loggedInUserGender={loggedInUserGender} />
                  </motion.div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <span style={styles.emptyIcon}>🔍</span>
                  <h3 style={styles.emptyTitle}>No matching profiles found</h3>
                  <p style={styles.emptyDesc}>Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  style={{
                    ...styles.pageBtn,
                    ...(currentPage === 1 ? styles.pageBtnDisabled : {})
                  }}
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <span style={styles.pageInfo}>Page {currentPage} of {totalPages || 1}</span>
                <button 
                  disabled={currentPage >= totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  style={{
                    ...styles.pageBtn,
                    ...(currentPage >= totalPages ? styles.pageBtnDisabled : {})
                  }}
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
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
    padding: `0 ${SPACING[6]} ${SPACING[6]}`,
  },
  // ✅ Hero Section (below AIMatchHero)
  heroSection: {
    textAlign: 'center',
    marginBottom: SPACING[12],
    padding: `${SPACING[12]} 0`,
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[4],
  },
  heroBadge: {
    display: 'inline-block',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: `${SPACING[1]} ${SPACING[4]}`,
    border: `1px solid ${COLORS.accent}30`,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `rgba(201, 169, 110, 0.08)`,
  },
  heroTitle: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  heroHighlight: {
    color: COLORS.accent,
  },
  heroDesc: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  fetchBtn: {
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
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
  },
  spinning: {
    animation: 'spin 1s linear infinite',
  },
  // ✅ Filter Bar Styles
  filterBar: {
    display: 'flex',
    gap: SPACING[4],
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: SPACING[4],
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
  },
  searchWrapper: {
    flex: '1 1 300px',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[3]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.06)`,
    background: 'rgba(255,255,255,0.02)',
    transition: 'all 0.3s ease',
  },
  searchIcon: {
    color: 'rgba(255,255,255,0.3)',
  },
  searchInput: {
    width: '100%',
    padding: `${SPACING[1]} 0`,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
  filterActions: {
    display: 'flex',
    gap: SPACING[2],
    flexWrap: 'wrap',
  },
  filterToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.06)`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid ${COLORS.accent}30`,
    background: 'transparent',
    color: COLORS.accent,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  filtersExpanded: {
    marginBottom: SPACING[4],
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    overflow: 'hidden',
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SPACING[3],
  },
  // ✅ Filter Select - Blue Background
  filterSelect: {
    padding: SPACING[2],
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.06)`,
    background: `rgba(26, 42, 74, 0.8)`,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    outline: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A96E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
    '& option': {
      background: COLORS.primaryDark,
      color: COLORS.textWhite,
    }
  },
  resultsInfo: {
    marginBottom: SPACING[4],
    padding: `${SPACING[2]} ${SPACING[4]}`,
  },
  resultsCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
  },
  matchesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: SPACING[6],
  },
  skeletonCard: {
    height: '200px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    overflow: 'hidden',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonImage: {
    height: '100px',
    background: 'rgba(255,255,255,0.03)',
  },
  skeletonContent: {
    padding: SPACING[4],
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },
  skeletonLine: {
    height: '16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.full,
    width: '80%',
  },
  skeletonLineShort: {
    height: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.full,
    width: '50%',
  },
  emptyState: {
    textAlign: 'center',
    padding: SPACING[16],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  emptyIcon: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    display: 'block',
    marginBottom: SPACING[4],
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.heading,
  },
  emptyDesc: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
  },
  pagination: {
    marginTop: SPACING[8],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING[4],
    padding: SPACING[4],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
  },
  pageBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[1],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    border: `1px solid rgba(255,255,255,0.06)`,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
  },
  pageBtnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
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