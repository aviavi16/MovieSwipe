import type { ReactNode } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
  icon?: ReactNode;
  accent?: string;
}

export function StatCard({ label, value, suffix, hint, icon, accent }: StatCardProps) {
  return (
    <GlassPanel className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-white/60">{label}</p>
          <div className="flex items-end gap-1">
            <AnimatedCounter value={value} className="text-3xl font-semibold text-white" />
            {suffix ? <span className="pb-0.5 text-sm text-white/60">{suffix}</span> : null}
          </div>
          {hint ? <p className="text-xs leading-5 text-white/45">{hint}</p> : null}
        </div>
        {icon ? (
          <div className="rounded-2xl border border-border bg-white/6 p-3 text-xl text-white/85">{icon}</div>
        ) : null}
      </div>
      {accent ? <div className="mt-4 h-1.5 rounded-full bg-white/8"><div className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500" style={{ width: accent }} /></div> : null}
    </GlassPanel>
  );
}
