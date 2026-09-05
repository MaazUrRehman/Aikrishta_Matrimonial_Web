'use client';

import LoadingState from '@/components/user-profiles/LoadingState';
import { COLORS, SPACING } from '@/constants/theme';

export default function UserProfilesLoading() {
  return (
    <div style={styles.container}>
      <div style={styles.skeletonHeader}>
        <div style={styles.titleSkeleton}></div>
        <div style={styles.subtitleSkeleton}></div>
      </div>
      <div style={styles.skeletonSearch}>
        <div style={styles.searchSkeleton}></div>
      </div>
      <div style={styles.skeletonFilters}>
        <div style={styles.filterSkeleton}></div>
        <div style={styles.filterSkeleton}></div>
        <div style={styles.filterSkeleton}></div>
        <div style={styles.filterSkeleton}></div>
      </div>
      <LoadingState />
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .skeleton {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${SPACING[6]} ${SPACING[4]}`,
    minHeight: '100vh',
    backgroundColor: COLORS.lightBg,
  },
  skeletonHeader: {
    marginBottom: SPACING[6],
    padding: `${SPACING[6]} ${SPACING[8]}`,
    backgroundColor: COLORS.primary,
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(26, 42, 74, 0.1)',
  },
  titleSkeleton: {
    width: '200px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    marginBottom: SPACING[2],
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  subtitleSkeleton: {
    width: '300px',
    height: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonSearch: {
    marginBottom: SPACING[4],
  },
  searchSkeleton: {
    width: '100%',
    height: '50px',
    backgroundColor: '#E8ECF0',
    borderRadius: '12px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonFilters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SPACING[3],
    marginBottom: SPACING[6],
  },
  filterSkeleton: {
    height: '40px',
    backgroundColor: '#E8ECF0',
    borderRadius: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};