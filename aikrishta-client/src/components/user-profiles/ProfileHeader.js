'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function ProfileHeader({ profile, permissionStatus }) {
  const { personalInfo } = profile;
  const { first_name, last_name, age, city, country, gender, profile_picture } = personalInfo || {};

  const fullName = `${first_name || ''} ${last_name || ''}`.trim();
  const location = [city, country].filter(Boolean).join(', ');
  const defaultAvatar = gender?.toLowerCase() === 'female' 
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmK1zI-O5t55MuIQsbggPX1COZ3rcdwqkUcUWN0DhXw&s=10' 
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT872-NZ6cbftxpfmL1holrOEaJBC3A4khv_mO7QdxoAA&s=10';

  const avatarUrl = permissionStatus === 'Approved' && profile_picture
    ? profile_picture
    : defaultAvatar;

  return (
    <div style={styles.header}>
      <div style={styles.avatarWrapper}>
        <img src={avatarUrl} alt={fullName || 'Profile'} style={styles.avatar} />
      </div>
      <div style={styles.info}>
        <h1 style={styles.name}>{fullName || 'Anonymous'}</h1>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot}></span>
          <span style={styles.statusText}>Active</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[6],
    padding: SPACING[6],
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: COLORS.shadow,
    flexWrap: 'wrap',
  },
  avatarWrapper: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `4px solid ${COLORS.secondary}`,
    flexShrink: 0,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    margin: 0,
    marginBottom: SPACING[2],
  },
  details: {
    display: 'flex',
    gap: SPACING[4],
    flexWrap: 'wrap',
    marginBottom: SPACING[3],
  },
  detailItem: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textGray,
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[1]} ${SPACING[3]}`,
    backgroundColor: 'rgba(139, 30, 63, 0.12)', // ✅ Red/Pink tinted background
    borderRadius: BORDER_RADIUS.full,
    border: `1px solid ${COLORS.secondary}20`, // ✅ Red/Pink border
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22C55E', // Keep green for active status
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.accent, // ✅ Gold text
  },
};