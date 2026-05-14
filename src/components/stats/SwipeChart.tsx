import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface SwipeChartProps {
  data: Array<{ label: string; count: number }>;
}

export function SwipeChart({ data }: SwipeChartProps) {
  const max = Math.max(...data.map((entry) => entry.count), 1);

  return (
    <GlassPanel className="space-y-4 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-300">Swipe history</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Last 7 days</h3>
      </div>
      <div className="flex items-end gap-2">
        {data.map((entry, index) => (
          <div key={entry.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end justify-center rounded-2xl border border-white/8 bg-white/4 p-2">
              <motion.div
                className="w-full rounded-xl bg-gradient-to-t from-danger-500/80 to-accent-400/90"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((entry.count / max) * 100, entry.count > 0 ? 12 : 0)}%` }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
              />
            </div>
            <div className="text-center text-xs text-white/50">
              <p>{entry.label}</p>
              <p>{entry.count}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
