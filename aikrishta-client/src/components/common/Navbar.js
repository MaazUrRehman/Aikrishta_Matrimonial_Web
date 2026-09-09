

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { API } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current path for active tab
  const { logout: authLogout } = useAuth();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [profileData, setProfileData] = useState({
    profileType: null,
    personalInfo: null,
    contactProfessional: null,
    familyBackground: null,
    familyMember: null,
    partnerPreference: null,
  });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAdmin(parsedUser?.role === 'admin' || parsedUser?.isAdmin === true);
    }
  }, []);

  useEffect(() => {
    if (user && !isAdmin) {
      fetchAllProfileData();
    }
  }, [user, isAdmin]);

  const fetchAllProfileData = async () => {
    setLoadingStatus(true);
    try {
      const profileTypeRes = await fetch(API.profile.profileType, { credentials: 'include' });
      const profileType = profileTypeRes.ok ? await profileTypeRes.json() : null;

      const isFamilyMember = profileType?.data?.profile_for === 'Family Member';

      const [
        personalInfoRes,
        contactProfessionalRes,
        familyBackgroundRes,
        familyMemberRes,
        partnerPreferenceRes,
        verificationRes,
      ] = await Promise.all([
        fetch(API.profile.personalInfo, { credentials: 'include' }),
        fetch(API.profile.contactProfessional, { credentials: 'include' }),
        fetch(API.profile.familyBackground, { credentials: 'include' }),
        isFamilyMember ? fetch(API.profile.familyMember, { credentials: 'include' }) : null,
        fetch(API.profile.partnerPreference, { credentials: 'include' }),
        fetch(API.profile.verificationStatus, { credentials: 'include' }),
      ]);

      const personalInfo = personalInfoRes.ok ? await personalInfoRes.json() : null;
      const contactProfessional = contactProfessionalRes.ok ? await contactProfessionalRes.json() : null;
      const familyBackground = familyBackgroundRes.ok ? await familyBackgroundRes.json() : null;
      const familyMember = isFamilyMember && familyMemberRes?.ok ? await familyMemberRes.json() : null;
      const partnerPreference = partnerPreferenceRes.ok ? await partnerPreferenceRes.json() : null;
      const verification = verificationRes.ok ? await verificationRes.json() : null;

      setProfileData({
        profileType: profileType?.data || null,
        personalInfo: personalInfo?.data || null,
        contactProfessional: contactProfessional?.data || null,
        familyBackground: familyBackground?.data || null,
        familyMember: familyMember?.data || null,
        partnerPreference: partnerPreference?.data || null,
      });

      setVerificationStatus(verification?.data || null);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleLogout = async () => {
    try {
      await fetch(API.auth.logout, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // AuthContext ka user + token bhi immediately clear hoga
      authLogout();
    }
  };

  const isVerified = verificationStatus?.profile_status === 'Approved';
  const isPending = verificationStatus?.profile_status === 'Pending' ||
    verificationStatus?.profile_status === 'Phone Pending' ||
    verificationStatus?.profile_status === 'Email Pending' ||
    verificationStatus?.profile_status === 'Documents Pending' ||
    verificationStatus?.profile_status === 'Under Review';

  const getIncompleteForm = () => {
    const {
      profileType,
      familyMember,
      personalInfo,
      contactProfessional,
      familyBackground,
      partnerPreference,
    } = profileData;

    if (!profileType) return "/profile/profile-type";

    if (profileType?.profile_for === "Family Member" && !familyMember) {
      return "/profile/family-member";
    }

    if (!personalInfo) return "/profile/personal-information";
    if (!contactProfessional) return "/profile/contact-professional";
    if (!familyBackground) return "/profile/family-background";
    if (!partnerPreference) return "/profile/partner-preference";

    return null;
  };

  const incompleteFormPath = getIncompleteForm();
  const allFormsComplete = incompleteFormPath === null;

  const adminNavLinks = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Verifications', href: '/admin/verifications' },
    { label: 'Users', href: '/admin/users' },
  ];

  const userNavLinks = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Profiles', href: '/user-profiles' },
    { label: 'AI Match', href: '/ai-match' },
  ];

  const navLinks = isAdmin ? adminNavLinks : userNavLinks;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ✅ Check if link is active
  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href === '/user-profiles' && pathname === '/user-profiles') return true;
    if (href === '/ai-match' && pathname === '/ai-match') return true;
    if (href === '/membership' && pathname === '/membership') return true;
    if (href === '/admin/dashboard' && pathname === '/admin/dashboard') return true;
    if (href === '/admin/verifications' && pathname === '/admin/verifications') return true;
    if (href === '/admin/users' && pathname === '/admin/users') return true;
    return false;
  };

  return (
    <nav style={styles.navbar}>
      <div className="navbar-container" style={styles.container}>
        <Link href={isAdmin ? "/admin/dashboard" : "/"} style={styles.logo}>
          <div style={styles.logoImageWrapper}>
            <Image
              src="/images/aikrishta-logo.png"
              alt="AIKrishta Logo"
              width={180}
              height={180}
              priority
              style={styles.logoImage}
            />
          </div>

        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="nav-links" style={styles.navLinks}>
          {navLinks.map((link, index) => {
            const active = isActive(link.href);
            return (
              <Link
                key={index}
                href={link.href}
                style={{
                  ...styles.navLink,
                  ...(active && styles.navLinkActive),
                }}
              >
                {link.label}
                {active && <span style={styles.activeIndicator}></span>}
              </Link>
            );
          })}
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-nav-menu">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={active ? 'mobile-nav-link mobile-nav-link-active' : 'mobile-nav-link'}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        <div className="navbar-right-section" style={styles.rightSection}>
          {user ? (
            <div style={styles.userSection} ref={dropdownRef}>
              <button
                className="user-btn"
                style={styles.userBtn}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="avatar" style={styles.avatar}>
                  {user.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="user-name" style={styles.userName}>{user.fullName?.split(' ')[0]}</span>
                <span style={styles.dropdownArrow}>▼</span>
              </button>

              {isDropdownOpen && (
                <div style={styles.dropdown}>
                  {!isAdmin && (
                    <>
                      <Link
                        href="/profile"
                        style={styles.dropdownItem}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span style={styles.dropdownIcon}>👤</span>
                        My Profile
                      </Link>

                      {!allFormsComplete && (
                        <Link
                          href={incompleteFormPath}
                          style={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span style={styles.dropdownIcon}>📋</span>
                          Complete Profile
                          <span style={styles.pendingBadge}>
                            Incomplete
                          </span>
                        </Link>
                      )}

                      {allFormsComplete && !isVerified && (
                        <Link
                          href="/profile/profile-verification"
                          style={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span style={styles.dropdownIcon}>🔐</span>
                          Verify Profile
                          <span style={styles.pendingBadge}>
                            Pending
                          </span>
                        </Link>
                      )}

                      {allFormsComplete && isVerified && (
                        <div style={styles.verifiedBadge}>
                          <span>✅</span>
                          Profile Verified
                        </div>
                      )}

                      {!allFormsComplete && <hr style={styles.dropdownDivider} />}
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    style={styles.dropdownItem}
                  >
                    <span style={styles.dropdownIcon}>🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons" style={styles.authButtons}>
              <Link href="/auth/login" style={styles.loginBtn}>
                Login
              </Link>
              <Link href="/auth/register" style={styles.joinBtn}>
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ==================== UPDATED STYLES ====================

const styles = {
  navbar: {
    backgroundColor: COLORS.primary,
    borderBottom: `2px solid ${COLORS.secondary}30`,
    padding: `${SPACING[3]} 0`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: SHADOWS.dark,
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${SPACING[6]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    textDecoration: 'none',
  },

  logoImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  logoImage: {
    height: '80px',
    width: 'auto',
    objectFit: 'contain',
  },

  adminBadge: {
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
    marginLeft: SPACING[2],
  },

  navLinks: {
    display: 'flex',
    gap: SPACING[6],
    alignItems: 'center',
  },

  // ✅ Default nav link style
  navLink: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: `${SPACING[2]} ${SPACING[1]}`,
    ':hover': {
      color: COLORS.accent,
    },
  },

  // ✅ Active nav link style
  navLinkActive: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },

  // ✅ Active indicator (underline)
  activeIndicator: {
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    right: '0',
    height: '3px',
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.full,
    animation: 'slideIn 0.3s ease-out',
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },

  authButtons: {
    display: 'flex',
    gap: SPACING[3],
    alignItems: 'center',
  },

  loginBtn: {
    padding: `${SPACING[2]} ${SPACING[5]}`,
    color: COLORS.textWhite,
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    borderRadius: BORDER_RADIUS.base,
    border: `2px solid ${COLORS.secondary}`,
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: COLORS.secondary,
      color: COLORS.textWhite,
    },
  },

  joinBtn: {
    padding: `${SPACING[2]} ${SPACING[5]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    borderRadius: BORDER_RADIUS.base,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.4)`,
    border: 'none',
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.5)`,
    },
  },

  userSection: {
    position: 'relative',
  },

  userBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    padding: `${SPACING[1]} ${SPACING[3]} ${SPACING[1]} ${SPACING[2]}`,
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `2px solid ${COLORS.secondary}40`,
    borderRadius: BORDER_RADIUS.full,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    ':hover': {
      borderColor: COLORS.accent,
      backgroundColor: `rgba(139, 30, 63, 0.1)`,
    },
  },

  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },

  userName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textWhite,
  },

  dropdownArrow: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    marginLeft: SPACING[1],
  },

  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    minWidth: '240px',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: SHADOWS.xl,
    border: `2px solid ${COLORS.secondary}30`,
    overflow: 'hidden',
    padding: SPACING[1],
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
  },

  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    borderRadius: BORDER_RADIUS.base,
    transition: 'all 0.2s ease',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative',
    ':hover': {
      backgroundColor: `rgba(139, 30, 63, 0.1)`,
      color: COLORS.accent,
    },
  },

  dropdownIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },

  pendingBadge: {
    marginLeft: 'auto',
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.accent,
    backgroundColor: 'rgba(201, 169, 110, 0.15)',
    padding: `${SPACING[0.5]} ${SPACING[2]}`,
    borderRadius: BORDER_RADIUS.full,
  },

  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[3],
    padding: `${SPACING[2]} ${SPACING[4]}`,
    color: '#4ADE80',
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    borderRadius: BORDER_RADIUS.base,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
  },

  dropdownDivider: {
    margin: `${SPACING[1]} ${SPACING[2]}`,
    border: 'none',
    borderTop: `2px solid ${COLORS.secondary}20`,
  },
};

// Add responsive styles and animations
const responsiveStyles = `
  @keyframes slideIn {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .navbar-container {
      flex-wrap: wrap;
      row-gap: 0.5rem;
    }

    .nav-links {
      order: 3;
      width: 100%;
      justify-content: center;
      gap: 0.75rem !important;
      overflow-x: auto;
      padding-bottom: 0.25rem;
      scrollbar-width: thin;
    }

    .nav-links a {
      white-space: nowrap;
    }
  }

  .mobile-menu-toggle,
  .mobile-nav-menu {
    display: none;
  }

  @media (max-width: 768px) {
    .navbar-container {
      position: relative;
      flex-wrap: nowrap;
    }

    .nav-links {
      display: none !important;
    }

    .mobile-menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 42px;
      height: 42px;
      margin-left: auto;
      padding: 8px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 8px;
      cursor: pointer;
    }

    .mobile-menu-toggle span {
      display: block;
      width: 100%;
      height: 2px;
      background: ${COLORS.textWhite};
      border-radius: 2px;
    }

    .mobile-nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1rem 1rem;
      background: ${COLORS.primary};
      border-top: 1px solid ${COLORS.secondary}40;
      border-bottom: 2px solid ${COLORS.secondary}60;
      box-shadow: 0 16px 30px rgba(0,0,0,0.35);
      z-index: 1100;
    }

    .mobile-nav-link {
      display: block;
      padding: 0.75rem 0.5rem;
      color: rgba(255,255,255,0.8);
      font-family: ${TYPOGRAPHY.fontFamily.body};
      font-size: ${TYPOGRAPHY.fontSize.sm};
      font-weight: ${TYPOGRAPHY.fontWeight.medium};
      text-decoration: none;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .mobile-nav-link:last-child {
      border-bottom: none;
    }

    .mobile-nav-link-active {
      color: ${COLORS.accent};
    }
  }

  @media (max-width: 768px) {
    .logo-image {
      height: 60px !important;
    }
  }

  @media (max-width: 640px) {
    .navbar-container {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }

    .logo-image {
      height: 50px !important;
    }
    
    .user-name {
      display: none !important;
    }
    
    .auth-buttons {
      gap: 0.5rem !important;
    }
    
    .login-btn {
      padding: 0.375rem 0.75rem !important;
      font-size: 0.75rem !important;
    }
    
    .join-btn {
      padding: 0.375rem 0.75rem !important;
      font-size: 0.75rem !important;
    }
    
    .user-btn {
      padding: 0.25rem 0.5rem !important;
    }
    
    .avatar {
      width: 32px !important;
      height: 32px !important;
      font-size: 0.875rem !important;
    }
  }
`;

// Inject responsive styles
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}