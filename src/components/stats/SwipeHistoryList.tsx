import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import type { SwipeDecision } from '@/types/movie';
import { rateLabel } from '@/utils/movie';

interface SwipeHistoryListProps {
  items: Array<{ movieId: string; decision: SwipeDecision; timestamp: string }>;
  lookup: Map<string, { title: string; year: number }>;
}

export function SwipeHistoryList({ items, lookup }: SwipeHistoryListProps): JSX.Element {
  return (
    <GlassPanel className="space-y-4 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-300">Recent activity</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Swipe log</h3>
      </div>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.slice(-10).reverse().map((entry) => {
            const movie = lookup.get(entry.movieId);
            return (
              <div key={`${entry.movieId}-${entry.timestamp}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/4 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{movie?.title ?? 'Unknown movie'}</p>
                  <p className="text-xs text-white/45">{movie?.year ?? '—'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="border-white/10 bg-white/10 text-white/75">{rateLabel(entry.decision)}</Badge>
                  <span className="text-xs text-white/45">
                    {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(entry.timestamp))}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-white/45">Your swipe history will appear here after the first rating.</p>
        )}
      </div>
    </GlassPanel>
  );
}
