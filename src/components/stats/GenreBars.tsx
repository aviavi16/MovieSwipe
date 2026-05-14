import { motion } from 'framer-motion';
import type { GenreStat } from '@/types/movie';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface GenreBarsProps {
  data: GenreStat[];
}

export function GenreBars({ data }: GenreBarsProps) {
  const max = Math.max(...data.map((entry) => entry.count), 1);

  return (
    <GlassPanel className="space-y-4 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-300">Favorite genres</p>
        <h3 className="mt-2 text-lg font-semibold text-white">What you keep liking</h3>
      </div>
      <div className="space-y-3">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={entry.genre} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{entry.genre}</span>
                <span className="text-white/45">{entry.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(entry.count / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/45">Like a few movies to see genre trends here.</p>
        )}
      </div>
    </GlassPanel>
  );
}
