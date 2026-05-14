import { useMemo } from 'react';
import { FaChartPie, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { PageTransition } from '@/components/ui/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { RatioRing } from '@/components/stats/RatioRing';
import { GenreBars } from '@/components/stats/GenreBars';
import { SwipeChart } from '@/components/stats/SwipeChart';
import { SwipeHistoryList } from '@/components/stats/SwipeHistoryList';
import { useMovieQueue } from '@/hooks/useMovieQueue';

export function StatisticsPage(): JSX.Element {
  const queue = useMovieQueue();
  const movieLookup = useMemo(() => new Map(queue.movies.map((movie) => [movie.id, movie])), [queue.movies]);

  return (
    <PageTransition>
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Analytics"
          title="Your swipe patterns, visualized."
          description="See how many movies you like, how your taste breaks down by genre, and what your recent activity looks like over time."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total liked" value={queue.totalLiked} icon={<FaHeart />} hint="Likes + super likes" />
          <StatCard label="Total disliked" value={queue.totalDisliked} icon={<FaRegHeart />} hint="Movies sent away" />
          <StatCard label="Super likes" value={queue.totalSuperLiked} icon={<FaStar />} hint="Reserved for standouts" />
          <StatCard
            label="Rated total"
            value={queue.totalLiked + queue.totalDisliked}
            icon={<FaChartPie />}
            hint="Movies already archived"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <StatCard
              label="Like ratio"
              value={Math.round(queue.likeRatio)}
              suffix="%"
              hint="Higher means your deck is leaning positive."
              accent={`${Math.max(Math.round(queue.likeRatio), 10)}%`}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <RatioRing value={queue.likeRatio} />
              <GenreBars data={queue.favoriteGenres} />
            </div>
          </div>
          <div className="space-y-4">
            <SwipeChart data={queue.historyByDay} />
            <SwipeHistoryList items={queue.history} lookup={movieLookup} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
