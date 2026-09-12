
// src/app/auth/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { API } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(API.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      const user = data.data.user;
      const token = data.data.accessToken || data.token || data.accessToken || data.jwt;

      login(user, token);

      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <Image
            src="/images/aikrishta-logo.png"
            alt="AIKrishta Logo"
            width={88}
            height={88}
            style={styles.logo}
          />
          <h1 style={styles.title}>Welcome <span style={styles.highlight}>Back</span></h1>
          <p style={styles.subtitle}>Sign in to continue your journey</p>
        </div>

        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>✉️</span>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.boxShadow = `0 0 30px rgba(201, 169, 110, 0.05)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.boxShadow = `0 0 30px rgba(201, 169, 110, 0.05)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={styles.options}>
            <Link href="/auth/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            style={styles.btnPrimary} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(139, 30, 63, 0.5)`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(139, 30, 63, 0.3)`;
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p style={styles.footerText}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING[6],
    background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
  },
  card: {
    maxWidth: '520px',
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    padding: SPACING[12],
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    border: `1px solid rgba(255,255,255,0.06)`,
    backdropFilter: 'blur(10px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: SPACING[8],
  },
  logo: {
    width: 'clamp(64px, 18vw, 88px)',
    height: 'clamp(64px, 18vw, 88px)',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
    marginBottom: SPACING[2],
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING[1],
  },
  highlight: {
    color: COLORS.accent,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: SPACING[4],
    textAlign: 'center',
    border: `1px solid rgba(239, 68, 68, 0.15)`,
  },
  errorIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[5],
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING[1],
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING[2],
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: 'rgba(255,255,255,0.7)',
  },
  labelIcon: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  input: {
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid rgba(255,255,255,0.06)`,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    outline: 'none',
    color: COLORS.textWhite,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.2)',
    },
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: SPACING[1],
  },
  forgotLink: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: COLORS.accent,
    },
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING[2],
    padding: `${SPACING[3]} ${SPACING[6]}`,
    backgroundColor: COLORS.secondary,
    color: COLORS.textWhite,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    border: 'none',
    borderRadius: BORDER_RADIUS.lg,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 20px rgba(139, 30, 63, 0.3)`,
    marginTop: SPACING[2],
    width: '100%',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
  },
  spinner: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: `2px solid ${COLORS.textWhite}`,
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  footerText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: SPACING[6],
  },
  link: {
    color: COLORS.accent,
    textDecoration: 'none',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    transition: 'color 0.3s ease',
    ':hover': {
      color: COLORS.secondary,
    },
  },
};
