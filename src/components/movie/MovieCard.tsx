import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Movie, SwipeDecision } from '@/types/movie';
import { Badge } from '@/components/ui/Badge';
import { twMerge } from '@/lib/twMerge';
import { formatMovieRuntime } from '@/utils/movie';
import { FaStar } from 'react-icons/fa6';

interface MovieCardProps {
  movie: Movie;
  onSwipe: (decision: SwipeDecision) => void;
  className?: string;
}

export function MovieCard({ movie, onSwipe, className }: MovieCardProps): JSX.Element {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [0, 90, 180], [0, 0.7, 1]);
  const dislikeOpacity = useTransform(x, [-180, -90, 0], [1, 0.7, 0]);
  const superLikeOpacity = useTransform(y, [-220, -90, 0], [1, 0.55, 0]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const swipeStrength = Math.max(Math.abs(info.offset.x), Math.abs(info.velocity.x * 0.25));
    const verticalStrength = Math.max(Math.abs(info.offset.y), Math.abs(info.velocity.y * 0.25));

    if (info.offset.y < -140 && verticalStrength > swipeStrength * 0.8) {
      onSwipe('superliked');
      return;
    }

    if (swipeStrength > 150 && info.offset.x > 0) {
      onSwipe('liked');
      return;
    }

    if (swipeStrength > 150 && info.offset.x < 0) {
      onSwipe('disliked');
    }
  };

  return (
    <motion.article
      className={twMerge(
        'relative aspect-[2/3] w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-[0_30px_70px_rgba(0,0,0,0.55)]',
        className
      )}
      style={{ x, y, rotate }}
      drag
      dragElastic={0.14}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="absolute inset-0">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-start justify-start p-5"
        style={{ opacity: likeOpacity }}
      >
        <div className="rounded-3xl border-2 border-accent-400 bg-accent-400/15 px-4 py-2 text-lg font-black tracking-[0.25em] text-accent-200 shadow-halo">
          LIKE
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-start justify-end p-5"
        style={{ opacity: dislikeOpacity }}
      >
        <div className="rounded-3xl border-2 border-danger-400 bg-danger-500/15 px-4 py-2 text-lg font-black tracking-[0.25em] text-danger-200">
          DISLIKE
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center p-5"
        style={{ opacity: superLikeOpacity }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-xl">
          <FaStar className="text-accent-300" />
          SUPER LIKE
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {movie.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} className="border-white/10 bg-black/35 text-white/80 backdrop-blur-md">
              {genre}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 rounded-[28px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-300/80">{movie.year}</p>
              <h3 className="text-2xl font-semibold text-white">{movie.title}</h3>
            </div>
            <Badge className="border-accent-400/30 bg-accent-400/15 text-accent-100">
              {movie.rating.toFixed(1)}
            </Badge>
          </div>
          <p className="text-sm leading-6 text-white/70">{movie.description}</p>
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>{movie.tagline}</span>
            <span>{formatMovieRuntime(movie.runtime)}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
