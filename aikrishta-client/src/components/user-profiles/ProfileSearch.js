// 'use client';

// import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

// export default function ProfileSearch({ value, onChange, onSearch }) {

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(value);
//   };

//   const handleClear = () => {
//     onChange('');
//     onSearch('');
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <div style={styles.searchWrapper}>
//         <span style={styles.searchIcon}>🔍</span>
//         <input
//           type="text"
//           placeholder="Search by name, city, profession, education..."
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           style={styles.input}
//         />
//         {value && (
//           <button
//             type="button"
//             onClick={handleClear}
//             style={styles.clearBtn}
//             aria-label="Clear search"
//             title="Clear search"
//           >
//             &times;
//           </button>
//         )}
//         <button type="submit" style={styles.searchBtn}>
//           Search
//         </button>
//       </div>
//     </form>
//   );
// }

// const styles = {
//   form: {
//     width: '100%',
//     marginBottom: SPACING[4],
//   },
//   searchWrapper: {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderRadius: BORDER_RADIUS.lg,
//     boxShadow: COLORS.shadow,
//     border: `1px solid ${COLORS.borderLight}`,
//     transition: 'all 0.3s ease',
//     overflow: 'hidden',
//   },
//   searchIcon: {
//     padding: `0 ${SPACING[4]}`,
//     fontSize: TYPOGRAPHY.fontSize.lg,
//     color: COLORS.textLight,
//   },
//   input: {
//     flex: 1,
//     padding: `${SPACING[3]} 0`,
//     border: 'none',
//     outline: 'none',
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     color: COLORS.textDark,
//     backgroundColor: 'transparent',
//   },
//   clearBtn: {
//     padding: `${SPACING[2]} ${SPACING[3]}`,
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     color: COLORS.textLight,
//     fontSize: TYPOGRAPHY.fontSize.base,
//     transition: 'all 0.2s ease',
//   },
//   searchBtn: {
//     padding: `${SPACING[3]} ${SPACING[6]}`,
//     background: COLORS.secondaryGradient,
//     color: COLORS.textWhite,
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: TYPOGRAPHY.fontSize.base,
//     fontWeight: TYPOGRAPHY.fontWeight.medium,
//     fontFamily: TYPOGRAPHY.fontFamily.body,
//     transition: 'all 0.3s ease',
//     ':hover': {
//       opacity: 0.9,
//     },
//   },
// };


















// src/components/profiles/ProfileSearch.js
'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

export default function ProfileSearch({ value, onChange, onSearch }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={{
        ...styles.searchWrapper,
        ...(isFocused && styles.searchWrapperFocused),
      }}>
        <span style={styles.searchIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by name, city, profession, education..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            style={styles.clearBtn}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button type="submit" style={styles.searchBtn}>
          Search
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    width: '100%',
    marginBottom: SPACING[4],
  },
   searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS['2xl'],
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  // ✅ Now borderColor can be changed without conflict
  searchWrapperFocused: {
    borderColor: COLORS.accent,
    boxShadow: `0 0 30px rgba(201, 169, 110, 0.1)`,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  searchIcon: {
    padding: `0 ${SPACING[4]}`,
    width: '24px',
    height: '24px',
    color: 'rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: `${SPACING[3]} 0`,
    border: 'none',
    outline: 'none',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    color: COLORS.textWhite,
    backgroundColor: 'transparent',
    '::placeholder': {
      color: 'rgba(255,255,255,0.3)',
    },
  },
  clearBtn: {
    padding: `${SPACING[2]} ${SPACING[3]}`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.3)',
    fontSize: TYPOGRAPHY.fontSize.base,
    transition: 'all 0.2s ease',
    ':hover': {
      color: COLORS.textWhite,
    },
  },
  searchBtn: {
    padding: `${SPACING[3]} ${SPACING[6]}`,
    background: COLORS.secondary,
    color: COLORS.textWhite,
    border: 'none',
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 15px rgba(139, 30, 63, 0.3)`,
    ':hover': {
      opacity: 0.9,
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px rgba(139, 30, 63, 0.4)`,
    },
  },
};