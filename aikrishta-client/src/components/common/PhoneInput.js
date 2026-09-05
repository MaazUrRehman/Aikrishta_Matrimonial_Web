// components/common/PhoneInput.js
'use client';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
} from '@/constants/theme';

export const PhoneInputComponent = ({
  value = '',
  onChange,
  disabled = false,
  required = false,
  placeholder = 'Enter phone number',
  defaultCountry = 'PK',
  style = {},
}) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <PhoneInput
        international
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        style={styles.phoneInput}
        className="custom-phone-input"
      />
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },

  phoneInput: {
    width: '100%',
    padding: `${SPACING[3]} ${SPACING[4]}`,
    border: `1px solid ${COLORS.border}`,
    borderRadius: BORDER_RADIUS.base,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    backgroundColor: COLORS.white,
    color: COLORS.textDark,
    outline: 'none',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: COLORS.secondary,
      boxShadow: `0 0 0 3px ${COLORS.secondary}25`,
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
};