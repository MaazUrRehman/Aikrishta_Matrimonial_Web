
// src/components/admin/AdminDashboard.js
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  TrendingUp,
  UserPlus,
  Shield,
  Activity
} from 'lucide-react';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { API } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProfiles: 0,
    verifiedProfiles: 0,
    pendingVerifications: 0,
    rejectedVerifications: 0,
    recentActivities: [],
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API.admin.dashboard, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error('Failed to fetch dashboard statistics');
        return;
      }

      const data = await response.json();
      
      setStats({
        totalProfiles: data.data?.totalProfiles || 0,
        verifiedProfiles: data.data?.verifiedProfiles || 0,
        pendingVerifications: data.data?.pendingVerifications || 0,
        rejectedVerifications: data.data?.rejectedVerifications || 0,
        recentActivities: data.data?.recentActivities || [],
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <span style={styles.errorIcon}>😕</span>
        <p style={styles.errorText}>{error}</p>
        <button onClick={fetchDashboardStats} style={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    {
      id: 'total',
      icon: <Users size={24} />,
      label: 'Total Profiles',
      value: stats.totalProfiles - 1,
      color: COLORS.accent,
      bgColor: 'rgba(201, 169, 110, 0.08)',
      borderColor: `${COLORS.accent}30`,
    },
    {
      id: 'verified',
      icon: <CheckCircle size={24} />,
      label: 'Verified Profiles',
      value: stats.verifiedProfiles,
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.08)',
      borderColor: 'rgba(34, 197, 94, 0.2)',
    },
    {
      id: 'pending',
      icon: <Clock size={24} />,
      label: 'Pending Verifications',
      value: stats.pendingVerifications,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.08)',
      borderColor: 'rgba(245, 158, 11, 0.2)',
    },
    {
      id: 'rejected',
      icon: <XCircle size={24} />,
      label: 'Rejected Verifications',
      value: stats.rejectedVerifications,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.dashboard}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <Shield size={28} />
          </div>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>Overview of platform statistics and performance</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.refreshBtn} onClick={fetchDashboardStats}>
            <Activity size={16} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} style={styles.statsGrid}>
        {statCards.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            style={{
              ...styles.statCard,
              borderColor: stat.borderColor,
            }}
          >
            <div style={{
              ...styles.statIcon,
              backgroundColor: stat.bgColor,
              color: stat.color,
            }}>
              {stat.icon}
            </div>
            <div style={styles.statInfo}>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
            <div style={{
              ...styles.statTrend,
              color: stat.color,
            }}>
              <TrendingUp size={14} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      

      {/* Recent Activities */}
      <motion.div variants={itemVariants} style={styles.activitySection}>
        <div style={styles.activityHeader}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📋</span>
            Recent Activities
          </h3>
          <span style={styles.activityCount}>
            {stats.recentActivities.length} activities
          </span>
        </div>
        <div style={styles.activityList}>
          {stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                style={styles.activityItem}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
              >
                <div style={styles.activityIcon}>{getActivityIcon(activity.type)}</div>
                <div style={styles.activityContent}>
                  <p style={styles.activityText}>{activity.message}</p>
                  <span style={styles.activityTime}>{formatTime(activity.timestamp)}</span>
                </div>
                <div style={styles.activityDot}></div>
              </motion.div>
            ))
          ) : (
            <div style={styles.noActivity}>
              <span style={styles.noActivityIcon}>📭</span>
              <p>No recent activities</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ==================== Helper Functions ====================

function getActivityIcon(type) {
  const icons = {
    user_register: '🆕',
    user_verified: '✅',
    match_made: '💕',
    payment: '💰',
    profile_update: '📝',
    verification_submitted: '📋',
    verification_pending: '⏳',
    verification_rejected: '❌',
    premium_upgrade: '⭐',
  };
  return icons[type] || '📌';
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

// ==================== STYLES ====================

const styles = {
  dashboard: {
    padding: SPACING[6],
    maxWidth: '1400px',
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[8],
    padding: SPACING[6],
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    flexWrap: 'wrap',
    gap: SPACING[4],
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[4],
  },

  headerIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: `rgba(201, 169, 110, 0.1)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}20`,
  },

  headerRight: {
    display: 'flex',
    gap: SPACING[3],
  },

  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: COLORS.accent,
      color: COLORS.accent,
      background: `rgba(201, 169, 110, 0.05)`,
    },
  },

  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[0.5],
  },

  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: SPACING[4],
    marginBottom: SPACING[6],
  },

  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[4],
    padding: SPACING[5],
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },

  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: BORDER_RADIUS.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TYPOGRAPHY.fontSize.xl,
    flexShrink: 0,
  },

  statInfo: {
    flex: 1,
  },

  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    margin: 0,
  },

  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },

  statTrend: {
    opacity: 0.3,
  },

  quickStats: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[6],
    padding: SPACING[5],
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    marginBottom: SPACING[6],
    flexWrap: 'wrap',
  },

  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    flex: 1,
  },

  quickIcon: {
    color: COLORS.accent,
    opacity: 0.5,
  },

  quickValue: {
    display: 'block',
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
  },

  quickLabel: {
    display: 'block',
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
  },

  quickDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255,255,255,0.04)',
  },

  activitySection: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: BORDER_RADIUS['2xl'],
    border: `1px solid rgba(255,255,255,0.04)`,
    backdropFilter: 'blur(10px)',
    padding: SPACING[6],
  },

  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[4],
  },

  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textWhite,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
  },

  sectionIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },

  activityCount: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: BORDER_RADIUS.full,
  },

  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[2],
  },

  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: `${SPACING[3]} ${SPACING[4]}`,
    borderRadius: BORDER_RADIUS.lg,
    background: 'rgba(255,255,255,0.02)',
    border: `1px solid rgba(255,255,255,0.02)`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
  },

  activityIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
    width: '24px',
    textAlign: 'center',
  },

  activityContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING[2],
  },

  activityText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
  },

  activityTime: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.3)',
  },

  activityDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: COLORS.accent,
    opacity: 0.3,
  },

  noActivity: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING[2],
    padding: SPACING[6],
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },

  noActivityIcon: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: SPACING[4],
  },

  spinner: {
    width: '48px',
    height: '48px',
    border: `4px solid rgba(255,255,255,0.05)`,
    borderTop: `4px solid ${COLORS.accent}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  loadingText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
  },

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: SPACING[4],
  },

  errorIcon: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
  },

  errorText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255,255,255,0.4)',
  },

  retryBtn: {
    padding: `${SPACING[2]} ${SPACING[6]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
    },
  },
};

// Add CSS animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
