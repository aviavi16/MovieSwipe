import { GlassPanel } from '@/components/ui/GlassPanel';
import { Skeleton } from '@/components/ui/Skeleton';

export function LoadingScreen(): JSX.Element {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <GlassPanel className="w-full max-w-3xl p-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-72" />
            <Skeleton className="h-5 w-96 max-w-full" />
            <div className="flex flex-wrap gap-2 pt-4">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-[30px]" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
