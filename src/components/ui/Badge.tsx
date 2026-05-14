import type { HTMLAttributes } from 'react';
import { twMerge } from '@/lib/twMerge';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>): JSX.Element {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full border border-border bg-white/6 px-2.5 py-1 text-xs font-medium text-white/80',
        className
      )}
      {...props}
    />
  );
}
