/**
 * 共享類型定義 - 黑道帝國建設遊戲
 * Shared type definitions for the Gang Empire Building Game
 */

import { ReactNode, CSSProperties, ButtonHTMLAttributes, HTMLAttributes } from 'react';

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';

/**
 * Component sizes
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Toast types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast component props
 */
export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

/**
 * Modal component props
 */
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  footer?: ReactNode;
  width?: string | number;
  closable?: boolean;
}

/**
 * Panel placement
 */
export type PanelPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Panel component props
 */
export interface PanelProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  placement?: PanelPlacement;
  width?: string | number;
  closable?: boolean;
}

/**
 * Badge variants
 */
export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  count?: number;
  dot?: boolean;
  max?: number;
}

/**
 * Resource type
 */
export interface Resource {
  label: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
}

/**
 * ResourceDisplay component props
 */
export interface ResourceDisplayProps extends BaseComponentProps {
  resources: Resource[];
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Input component props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Grid component props
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}
