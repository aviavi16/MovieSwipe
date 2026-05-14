import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaThumbsDown } from 'react-icons/fa6';
import { PageTransition } from '@/components/ui/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGridCard } from '@/components/movie/MovieGridCard';
import { useMovieQueue } from '@/hooks/useMovieQueue';
import { Button } from '@/components/ui/Button';

export function DislikedPage(): JSX.Element {
  const queue = useMovieQueue();
  const navigate = useNavigate();

  const dislikedItems = useMemo(
    () =>
      queue.allRatedMovies
        .filter((movie) => movie.decision === 'disliked')
        .sort((left, right) => new Date(right.ratedAt).getTime() - new Date(left.ratedAt).getTime()),
    [queue.allRatedMovies]
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Library"
          title="Movies you passed on."
          description="The disliked shelf keeps a full audit trail so you can revisit your decisions later if taste changes."
        />
        {dislikedItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {dislikedItems.map((movie) => (
              <MovieGridCard key={movie.id} movie={movie} decision={movie.decision} ratedAt={movie.ratedAt} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FaBan />}
            title="No dislikes yet"
            description="Once you swipe left, those movies will appear here with timestamps and a persistent history."
            actionLabel="Open swipe deck"
            onAction={() => navigate('/')}
          />
        )}
        <div className="flex justify-start">
          <Button variant="secondary" leadingIcon={<FaThumbsDown />} onClick={() => navigate('/')}>
            Back to swiping
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
