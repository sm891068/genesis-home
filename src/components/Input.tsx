import React from 'react';
import { InputProps } from '../types/components';
import './Input.css';

/**
 * Input 組件 - 輸入框
 * Input component with label and validation
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...rest
}) => {
  const wrapperClasses = [
    'input-wrapper',
    fullWidth && 'input-wrapper--full-width',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'input',
    error && 'input--error',
    icon && `input--icon-${iconPosition}`
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && <label className="input__label">{label}</label>}
      
      <div className="input__container">
        {icon && iconPosition === 'left' && (
          <span className="input__icon input__icon--left">{icon}</span>
        )}
        
        <input
          className={inputClasses}
          {...rest}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input__icon input__icon--right">{icon}</span>
        )}
      </div>
      
      {error && <span className="input__error">{error}</span>}
      {helperText && !error && <span className="input__helper">{helperText}</span>}
    </div>
  );
};
