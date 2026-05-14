import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from '@/lib/twMerge';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export function IconButton({ className, icon, label, type = 'button', ...props }: IconButtonProps): JSX.Element {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={twMerge(
        'inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/6 text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
