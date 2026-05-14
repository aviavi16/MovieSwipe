import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from '@/lib/twMerge';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-accent-400 to-accent-500 text-ink shadow-halo hover:shadow-glow hover:brightness-110',
  secondary:
    'border border-border bg-white/6 text-white hover:border-white/15 hover:bg-white/10',
  ghost: 'text-white/80 hover:bg-white/6 hover:text-white',
  danger:
    'bg-gradient-to-r from-danger-500 to-danger-600 text-white shadow-[0_0_30px_rgba(244,63,94,0.25)] hover:brightness-110'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-sm'
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  children,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={twMerge(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
