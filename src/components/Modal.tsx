import React, { useEffect } from 'react';
import { ModalProps } from '../types/components';
import './Modal.css';

/**
 * Modal 組件 - 對話框
 * Modal dialog component
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  footer,
  width = 600,
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

  const modalWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div className="modal-overlay" onClick={closable ? onClose : undefined}>
      <div
        className={`modal ${className}`}
        style={{ ...style, width: modalWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || closable) && (
          <div className="modal__header">
            {title && <h3 className="modal__title">{title}</h3>}
            {closable && (
              <button className="modal__close" onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal__body">
          {children}
        </div>

        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
