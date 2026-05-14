import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa6';
import { PageTransition } from '@/components/ui/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGridCard } from '@/components/movie/MovieGridCard';
import { useMovieQueue } from '@/hooks/useMovieQueue';
import { Button } from '@/components/ui/Button';

export function FavoritesPage(): JSX.Element {
  const queue = useMovieQueue();
  const navigate = useNavigate();

  const favoriteItems = useMemo(
    () =>
      queue.allRatedMovies
        .filter((movie) => movie.decision === 'liked' || movie.decision === 'superliked')
        .sort((left, right) => new Date(right.ratedAt).getTime() - new Date(left.ratedAt).getTime()),
    [queue.allRatedMovies]
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Library"
          title="Movies you kept."
          description="Your liked and super-liked movies are stored locally and shown here as a persistent favorites shelf."
        />
        {favoriteItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteItems.map((movie) => (
              <MovieGridCard
                key={movie.id}
                movie={movie}
                decision={movie.decision}
                ratedAt={movie.ratedAt}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FaHeart />}
            title="No favorites yet"
            description="Like a few movies from the swipe deck and they will appear here automatically."
            actionLabel="Start swiping"
            onAction={() => navigate('/')}
          />
        )}
        <div className="flex justify-start">
          <Button variant="secondary" leadingIcon={<FaStar />} onClick={() => navigate('/')}>
            Go to the deck
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
