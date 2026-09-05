'use client';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
} from '@/constants/theme';

export const ProgressSteps = ({ steps, currentStep, onStepClick }) => {
  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} style={styles.stepWrapper}>
            <div
              style={{
                ...styles.step,
                background: isActive ? COLORS.secondary : COLORS.border,
                cursor: onStepClick ? 'pointer' : 'default',
                transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
              }}
              onClick={() => onStepClick && onStepClick(index)}
            >
              {isCompleted ? '✅' : index + 1}
            </div>
            <span
              style={{
                ...styles.label,
                color: isActive ? COLORS.secondary : COLORS.textGray,
                fontWeight: isActive ? TYPOGRAPHY.fontWeight.semibold : TYPOGRAPHY.fontWeight.normal,
              }}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                style={{
                  ...styles.line,
                  background: isActive ? COLORS.secondary : COLORS.border,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SPACING[4],
    position: 'relative',
  },

  stepWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },

  step: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    transition: 'all 0.3s ease',
    zIndex: 2,
    position: 'relative',
  },

  label: {
    marginTop: SPACING[2],
    fontSize: TYPOGRAPHY.fontSize.xs,
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

  line: {
    position: 'absolute',
    top: '20px',
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
    height: '3px',
    zIndex: 1,
    transition: 'all 0.3s ease',
  },
};