import { Skeleton } from '@/components/ui/Skeleton';

export function DaySkeleton() {
  return (
    <div className="mb-6">
      {/* Day header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-bg-border">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-20 h-5" />
        <div className="ml-auto">
          <Skeleton className="w-16 h-4" />
        </div>
      </div>

      {/* 3 activity rows */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="px-4 py-4 border-b border-bg-border/50">
          <div className="flex items-start gap-3">
            {/* Time */}
            <div className="flex-shrink-0 w-14">
              <Skeleton className="w-14 h-4" />
            </div>
            {/* Content */}
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/2 h-4" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-14 h-5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
