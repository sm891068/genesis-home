import React from 'react';
import { BadgeProps } from '../types/components';
import './Badge.css';

/**
 * Badge 組件 - 標籤/徽章
 * Badge component for labels and notifications
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  count,
  dot = false,
  max = 99,
  className = '',
  style,
  children,
}) => {
  const classes = [
    'badge',
    `badge--${variant}`,
    dot && 'badge--dot',
    className
  ].filter(Boolean).join(' ');

  const displayCount = count !== undefined && count > max ? `${max}+` : count;

  return (
    <span className={classes} style={style}>
      {children}
      {dot && <span className="badge__dot" />}
      {count !== undefined && !dot && (
        <span className="badge__count">{displayCount}</span>
      )}
    </span>
  );
};
