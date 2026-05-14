import type { HTMLAttributes } from 'react';
import { twMerge } from '@/lib/twMerge';

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        'rounded-[28px] border border-border bg-panel/90 backdrop-blur-2xl shadow-glow',
        className
      )}
      {...props}
    />
  );
}
