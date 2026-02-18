import React, { useEffect } from 'react';
import { PanelProps } from '../types/components';
import './Panel.css';

/**
 * Panel 組件 - 抽屜面板
 * Panel drawer component
 */
export const Panel: React.FC<PanelProps> = ({
  open,
  onClose,
  title,
  placement = 'bottom',
  width = '80%',
  closable = true,
  className = '',
  style,
  children,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, closable, onClose]);

  if (!open) {
    return null;
  }

  const panelWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <>
      <div className="panel-overlay" onClick={closable ? onClose : undefined} />
      <div
        className={`panel panel--${placement} ${className}`}
        style={{
          ...style,
          ...(placement === 'left' || placement === 'right'
            ? { width: panelWidth }
            : { height: panelWidth }),
        }}
      >
        {(title || closable) && (
          <div className="panel__header">
            {title && <h3 className="panel__title">{title}</h3>}
            {closable && (
              <button className="panel__close" onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        )}

        <div className="panel__body">
          {children}
        </div>
      </div>
    </>
  );
};
