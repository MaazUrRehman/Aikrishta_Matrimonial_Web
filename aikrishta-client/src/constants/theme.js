// src/constants/theme.js

export const COLORS = {
  // ===== PRIMARY - Dark Blue (Background) =====
  primary: '#1A2A4A',
  primaryDark: '#0D1A33',
  primaryLight: '#2B4A7A',
  primaryLightest: '#E8EEF6',
  primaryGradient: 'linear-gradient(135deg, #1A2A4A 0%, #0D1A33 100%)',
  
  // ===== SECONDARY - Pink/Burgundy (Buttons, Highlights) =====
  secondary: '#8B1E3F',
  secondaryDark: '#6B1530',
  secondaryLight: '#A84766',
  secondaryLightest: '#F5E6EB',
  secondaryGradient: 'linear-gradient(135deg, #8B1E3F 0%, #6B1530 100%)',
  
  // ===== ACCENT - Gold (Fonts, Headings) =====
  accent: '#C9A96E',
  accentLight: '#E8D5B7',
  accentDark: '#B8954A',
  accentGradient: 'linear-gradient(135deg, #C9A96E 0%, #B8954A 100%)',
  
  // ===== BACKGROUNDS =====
  white: '#FFFFFF',
  cream: '#FFF8F3',
  lightBg: '#F5F7FA',
  dark: '#0D1A33',
  
  // ===== TEXT =====
  textDark: '#1A2A4A',
  textGray: '#6B7A8A',
  textLight: '#9AABBB',
  textWhite: '#FFFFFF',
  textGold: '#C9A96E',
  textPink: '#8B1E3F',
  
  // ===== STATUS =====
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#F57C00',
  info: '#1976D2',
  
  // ===== BORDER & SHADOW =====
  border: '#D0D8E0',
  borderLight: '#E8ECF0',
  
  // ===== SHADOWS =====
  shadow: '0 4px 20px rgba(26, 42, 74, 0.1)',
  shadowPink: '0 4px 20px rgba(139, 30, 63, 0.3)',
  shadowGold: '0 4px 20px rgba(201, 169, 110, 0.3)',
  shadowDark: '0 8px 32px rgba(0, 0, 0, 0.15)',
  
  // ===== GRADIENTS =====
  gradients: {
    primary: 'linear-gradient(135deg, #1A2A4A 0%, #0D1A33 100%)',
    secondary: 'linear-gradient(135deg, #8B1E3F 0%, #6B1530 100%)',
    accent: 'linear-gradient(135deg, #C9A96E 0%, #B8954A 100%)',
    hero: 'linear-gradient(135deg, #1A2A4A 0%, #0A1528 100%)',
  }
};

export const TYPOGRAPHY = {
  fontFamily: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '5.5rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  }
};

export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

export const BORDER_RADIUS = {
  none: '0',
  sm: '0.25rem',
  base: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const TRANSITION = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  slower: '500ms ease-in-out',
};

export const SHADOWS = {
  sm: '0 1px 3px rgba(0,0,0,0.08)',
  base: '0 4px 20px rgba(26, 42, 74, 0.1)',
  md: '0 8px 30px rgba(26, 42, 74, 0.15)',
  lg: '0 16px 48px rgba(26, 42, 74, 0.2)',
  xl: '0 24px 64px rgba(26, 42, 74, 0.25)',
  pink: '0 4px 20px rgba(139, 30, 63, 0.3)',
  gold: '0 4px 20px rgba(201, 169, 110, 0.3)',
  dark: '0 8px 32px rgba(0, 0, 0, 0.12)',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  overlay: 1090,
  max: 9999,
};

export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  transition: TRANSITION,
  shadows: SHADOWS,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
};

export default THEME;