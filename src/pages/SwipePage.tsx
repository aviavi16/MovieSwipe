import { useCallback, useMemo } from 'react';
import { FaHourglassHalf, FaHeart, FaRotateLeft, FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { MovieFilters } from '@/components/movie/MovieFilters';
import { MovieDeck } from '@/components/movie/MovieDeck';
import { PageTransition } from '@/components/ui/PageTransition';
import { useMovieQueue } from '@/hooks/useMovieQueue';
import { useMovieStore } from '@/store/movieStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function SwipePage() {
  const queue = useMovieQueue();
  const rateMovie = useMovieStore((state) => state.rateMovie);
  const undoLastSwipe = useMovieStore((state) => state.undoLastSwipe);
  const shuffleDeck = useMovieStore((state) => state.shuffleDeck);
  const setSearchTerm = useMovieStore((state) => state.setSearchTerm);
  const setGenreFilter = useMovieStore((state) => state.setGenreFilter);
  const clearFilters = useMovieStore((state) => state.clearFilters);

  const handleSwipe = useCallback(
    (decision: 'liked' | 'disliked' | 'superliked'): void => {
      if (!queue.currentMovie) {
        return;
      }

      rateMovie(queue.currentMovie.id, decision);
    },
    [queue.currentMovie, rateMovie]
  );

  const keyboardBindings = useMemo(
    () => ({
      ArrowLeft: () => handleSwipe('disliked'),
      ArrowRight: () => handleSwipe('liked'),
      ArrowUp: () => handleSwipe('superliked'),
      Backspace: undoLastSwipe,
      r: shuffleDeck
    }),
    [handleSwipe, undoLastSwipe, shuffleDeck]
  );

  useKeyboardShortcuts(keyboardBindings, { enabled: queue.hydrated });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Swipe deck"
              title="Rate movies with one gesture."
              description="Drag the card, tap the action buttons, or use the keyboard. Your likes and dislikes persist locally and restore on refresh."
            />
            <MovieFilters
              searchTerm={queue.filters.searchTerm}
              genre={queue.filters.genre}
              genres={queue.genreOptions}
              onSearchTermChange={setSearchTerm}
              onGenreChange={setGenreFilter}
              onShuffle={shuffleDeck}
              onClear={clearFilters}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <StatCard
              label="Remaining"
              value={queue.remainingCount}
              hint="Movies still waiting for a swipe."
              icon={<FaHourglassHalf />}
            />
            <StatCard
              label="Liked"
              value={queue.totalLiked}
              hint="Includes super likes."
              icon={<FaHeart />}
            />
          </div>
        </div>

        <MovieDeck
          currentMovie={queue.currentMovie}
          nextMovies={queue.nextMovies}
          onSwipe={handleSwipe}
          onShuffle={shuffleDeck}
        />

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Button variant="danger" size="lg" leadingIcon={<FaThumbsDown />} onClick={() => handleSwipe('disliked')}>
              Dislike
            </Button>
            <Button variant="secondary" size="lg" leadingIcon={<FaRotateLeft />} onClick={undoLastSwipe}>
              Undo
            </Button>
            <Button variant="secondary" size="lg" leadingIcon={<FaStar />} onClick={() => handleSwipe('superliked')}>
              Super like
            </Button>
            <Button variant="primary" size="lg" leadingIcon={<FaThumbsUp />} onClick={() => handleSwipe('liked')}>
              Like
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-[28px] border border-white/8 bg-white/4 p-4 text-sm text-white/60">
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">left dislike</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">right like</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">up super like</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">Backspace undo</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">R shuffle</span>
          </div>
        </div>

        {!queue.hydrated ? (
          <div className="rounded-[30px] border border-white/8 bg-white/4 p-6 text-sm text-white/55">
            Restoring your swipe history...
          </div>
        ) : null}
      </div>
    </PageTransition>
  );
}
