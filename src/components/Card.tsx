import React from 'react';
import { CardProps } from '../types/components';
import './Card.css';

/**
 * Card 組件 - 卡片容器，支持可交互狀態
 * Card component with interactive states
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  footer,
  hoverable = false,
  clickable = false,
  selected = false,
  onClick,
  className = '',
  style,
  children,
}) => {
  const classes = [
    'card',
    hoverable && 'card--hoverable',
    clickable && 'card--clickable',
    selected && 'card--selected',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <div className={classes} style={style} onClick={handleClick}>
      {(title || subtitle) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card__body">
        {children}
      </div>
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};
