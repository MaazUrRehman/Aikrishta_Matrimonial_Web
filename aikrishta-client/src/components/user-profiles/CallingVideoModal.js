'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

export default function CallingVideoModal({ receiverName, onCancel }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.icon}>📹</div>
        
        <h3 style={styles.title}>Calling...</h3>
        
        <p style={styles.status}>
          Calling <strong>{receiverName || "User"}</strong>...
        </p>
        
        <div style={styles.ringingIndicator}>
          <div style={styles.ringingDot}></div>
          <div style={styles.ringingDot}></div>
          <div style={styles.ringingDot}></div>
        </div>
        
        <button
          onClick={onCancel}
          style={styles.cancelButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2, 6, 23, 0.65)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
  },
  container: {
    width: "min(380px, calc(100vw - 2rem))",
    maxWidth: "calc(100vw - 2rem)",
    background: COLORS.primary || "#0F172A",
    borderRadius: BORDER_RADIUS['2xl'] || "24px",
    padding: SPACING[8] || "32px",
    boxShadow: SHADOWS.xl || "0 20px 60px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    textAlign: "center",
    color: COLORS.textWhite || "#FFFFFF",
  },
  icon: {
    width: "80px",
    height: "80px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "rgba(245, 158, 11, 0.12)",
    border: "2px solid rgba(245, 158, 11, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  title: {
    margin: 0,
    color: COLORS.textWhite || "#FFFFFF",
    fontSize: TYPOGRAPHY.fontSize['2xl'] || "24px",
    fontWeight: TYPOGRAPHY.fontWeight.bold || 700,
    letterSpacing: "-0.3px",
  },
  status: {
    marginTop: SPACING[3] || "12px",
    color: "rgba(255,255,255,0.6)",
    fontSize: TYPOGRAPHY.fontSize.base || "16px",
  },
  ringingIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: SPACING[6] || "24px",
  },
  ringingDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: COLORS.accent || "#F59E0B",
    animation: "ringingBounce 1.2s ease-in-out infinite",
  },
  cancelButton: {
    marginTop: SPACING[7] || "28px",
    padding: `${SPACING[3]} ${SPACING[10]}` || "12px 40px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: BORDER_RADIUS.lg || "12px",
    background: "rgba(255, 255, 255, 0.05)",
    color: COLORS.textWhite || "#E2E8F0",
    fontSize: TYPOGRAPHY.fontSize.base || "15px",
    fontWeight: TYPOGRAPHY.fontWeight.semibold || 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: TYPOGRAPHY.fontFamily.body,
  },
};

// Add CSS animations dynamically
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    @keyframes ringingBounce {
      0%, 100% { transform: translateY(0); opacity: 0.3; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}