import React from 'react';
import { ResourceDisplayProps } from '../types/components';
import './ResourceDisplay.css';

/**
 * ResourceDisplay 組件 - 資源顯示
 * ResourceDisplay component for showing game resources
 */
export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  resources,
  orientation = 'horizontal',
  className = '',
  style,
}) => {
  const classes = [
    'resource-display',
    `resource-display--${orientation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {resources.map((resource, index) => (
        <div key={index} className="resource-item">
          {resource.icon && (
            <span className="resource-item__icon">{resource.icon}</span>
          )}
          <div className="resource-item__content">
            <span className="resource-item__label">{resource.label}</span>
            <span
              className="resource-item__value"
              style={resource.color ? { color: resource.color } : undefined}
            >
              {typeof resource.value === 'number'
                ? resource.value.toLocaleString()
                : resource.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
