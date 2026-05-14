import { motion } from 'framer-motion';
import type { Movie, SwipeDecision } from '@/types/movie';
import { Badge } from '@/components/ui/Badge';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { formatMovieRuntime, rateLabel } from '@/utils/movie';

interface MovieGridCardProps {
  movie: Movie;
  decision: SwipeDecision;
  ratedAt: string;
}

export function MovieGridCard({ movie, decision, ratedAt }: MovieGridCardProps): JSX.Element {
  const accentClass =
    decision === 'disliked'
      ? 'border-danger-400/20 bg-danger-500/15 text-danger-100'
      : decision === 'superliked'
        ? 'border-accent-400/25 bg-accent-400/15 text-accent-50'
        : 'border-accent-400/25 bg-accent-500/15 text-accent-50';

  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassPanel className="h-full overflow-hidden">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img src={movie.posterUrl} alt={`${movie.title} poster`} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent`} />
          <div className="absolute left-3 top-3">
            <Badge className={`border-white/10 bg-white/10 ${accentClass}`}>{rateLabel(decision)}</Badge>
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/60 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
            {movie.rating.toFixed(1)}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">{movie.year}</p>
              </div>
              <p className="text-xs text-white/45">{formatMovieRuntime(movie.runtime)}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/60">{movie.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {movie.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} className="border-white/8 bg-white/6 text-white/70">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-white/40">Rated {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ratedAt))}</p>
        </div>
      </GlassPanel>
    </motion.article>
  );
}
