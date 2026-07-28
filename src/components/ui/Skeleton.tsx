import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export function Skeleton({ className, width, height, rounded = 'rounded-lg' }: SkeletonProps) {
  return (
    <div
      className={cn('shimmer-bg', rounded, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
