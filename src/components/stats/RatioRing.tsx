import { motion, useReducedMotion } from 'framer-motion';

interface RatioRingProps {
  value: number;
}

export function RatioRing({ value }: RatioRingProps) {
  const reducedMotion = useReducedMotion();
  const normalized = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 128 128" className="h-40 w-40 -rotate-90">
        <circle cx="64" cy="64" r="54" className="fill-none stroke-white/10" strokeWidth="12" />
        <motion.circle
          cx="64"
          cy="64"
          r="54"
          className="fill-none stroke-accent-400"
          strokeLinecap="round"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={reducedMotion ? false : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Like ratio</p>
          <p className="mt-1 text-3xl font-semibold text-white">{Math.round(normalized)}%</p>
        </div>
      </div>
    </div>
  );
}
