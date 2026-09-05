'use client';

import { useState, useRef, useEffect } from 'react';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
} from '@/constants/theme';

export const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  autoFocus = true,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (value) {
      const digits = value.split('');
      const newOtp = Array(length).fill('');
      digits.forEach((digit, index) => {
        if (index < length) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
    }
  }, [value, length]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    
    // Only allow digits
    if (val && !/^\d*$/.test(val)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1); // Take only last character
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Auto advance to next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index, e) => {
    // Move back on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move forward on arrow right
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move back on arrow left
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    
    if (!/^\d*$/.test(pastedData)) {
      return;
    }

    const digits = pastedData.split('');
    const newOtp = Array(length).fill('');
    digits.forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Focus on next empty field or last field
    const nextEmptyIndex = newOtp.findIndex(val => val === '');
    if (nextEmptyIndex === -1) {
      inputRefs.current[length - 1]?.focus();
      onComplete?.(otpString);
    } else {
      inputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  return (
    <div style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          style={{
            ...styles.input,
            ...(otp[index] && styles.inputFilled),
            ...(disabled && styles.inputDisabled),
          }}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: SPACING[2],
    justifyContent: 'center',
    padding: SPACING[2],
  },

  input: {
    width: '48px',
    height: '56px',
    textAlign: 'center',
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    border: `2px solid ${COLORS.border}`,
    borderRadius: BORDER_RADIUS.base,
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: COLORS.white,
    color: COLORS.textDark,
    '&:focus': {
      borderColor: COLORS.secondary,
      boxShadow: `0 0 0 3px ${COLORS.secondary}25`,
      transform: 'scale(1.05)',
    },
  },

  inputFilled: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.backgroundLight,
  },

  inputDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    '&:focus': {
      transform: 'none',
      boxShadow: 'none',
    },
  },
};