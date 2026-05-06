import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  disabled?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
  className?: string;
}

const baseStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const outlineStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50',
  secondary: 'bg-white text-gray-700 border border-gray-500 hover:bg-gray-50',
  danger: 'bg-white text-red-500 border border-red-500 hover:bg-red-50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-6 py-2',
};

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  fullWidth = false,
  outline = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${outline ? outlineStyles[variant] : baseStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 14} />}
      {children}
    </button>
  );
}
