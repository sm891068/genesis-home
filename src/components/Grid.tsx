import React from 'react';
import { GridProps } from '../types/components';
import './Grid.css';

/**
 * Grid 組件 - 網格佈局
 * Grid layout component
 */
export const Grid: React.FC<GridProps> = ({
  columns = 3,
  gap = 16,
  responsive,
  className = '',
  style,
  children,
  ...rest
}) => {
  const gridStyle: React.CSSProperties = {
    ...style,
    '--grid-columns': columns,
    '--grid-gap': `${gap}px`,
    ...(responsive?.sm && { '--grid-columns-sm': responsive.sm }),
    ...(responsive?.md && { '--grid-columns-md': responsive.md }),
    ...(responsive?.lg && { '--grid-columns-lg': responsive.lg }),
  } as React.CSSProperties;

  const classes = [
    'grid',
    responsive && 'grid--responsive',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={gridStyle} {...rest}>
      {children}
    </div>
  );
};
