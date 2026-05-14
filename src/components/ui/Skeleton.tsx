import { twMerge } from '@/lib/twMerge';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={twMerge('animate-pulse rounded-2xl bg-white/8', className)} />;
}
