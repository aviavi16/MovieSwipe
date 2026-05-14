import { AnimatePresence, motion } from 'framer-motion';
import type { Movie, SwipeDecision } from '@/types/movie';
import { MovieCard } from '@/components/movie/MovieCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { FaFilm } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

interface MovieDeckProps {
  currentMovie: Movie | null;
  nextMovies: Movie[];
  onSwipe: (decision: SwipeDecision) => void;
  onShuffle: () => void;
}

export function MovieDeck({ currentMovie, nextMovies, onSwipe, onShuffle }: MovieDeckProps) {
  const [pendingDecision, setPendingDecision] = useState<SwipeDecision | null>(null);

  useEffect(() => {
    if (!pendingDecision) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setPendingDecision(null);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [pendingDecision]);

  const handleSwipe = (decision: SwipeDecision): void => {
    setPendingDecision(decision);
    onSwipe(decision);
  };

  if (!currentMovie) {
    return (
      <EmptyState
        icon={<FaFilm />}
        title="No movies match your current filter"
        description="Try clearing the search term, broadening the genre filter, or reshuffling the deck."
        actionLabel="Shuffle deck"
        onAction={onShuffle}
      />
    );
  }

  return (
    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="absolute inset-x-6 top-5 h-full rounded-[36px] bg-accent-400/10 blur-3xl" />
        <div className="relative">
          <AnimatePresence mode="wait" custom={pendingDecision}>
            <motion.div
              key={currentMovie.id}
              custom={pendingDecision}
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0, scale: 0.94, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: (decision: SwipeDecision | null) => ({
                  opacity: 0,
                  x: decision === 'liked' ? 520 : decision === 'disliked' ? -520 : 0,
                  y: decision === 'superliked' ? -420 : 0,
                  rotate: decision === 'liked' ? 22 : decision === 'disliked' ? -22 : 0,
                  scale: 0.92,
                  transition: { duration: 0.28, ease: 'easeIn' }
                })
              }}
              exit="exit"
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <MovieCard movie={currentMovie} onSwipe={handleSwipe} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <GlassPanel className="space-y-5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-300">Up Next</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Queue Preview</h3>
          </div>
          <p className="text-sm text-white/50">{nextMovies.length} queued</p>
        </div>
        <div className="space-y-3">
          {nextMovies.length > 0 ? (
            nextMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3"
              >
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster thumbnail`}
                  className="h-16 w-11 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-medium text-white">{movie.title}</h4>
                  <p className="text-xs text-white/50">{movie.year}</p>
                  <p className="mt-1 truncate text-xs text-white/60">{movie.genres.join(' / ')}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/12 bg-white/4 p-6 text-sm text-white/55">
              You are at the end of the visible queue. Shuffle to surface a new order.
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
