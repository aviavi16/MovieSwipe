import { useMemo } from 'react';
import { useMovieStore } from '@/store/movieStore';
import type { Movie, MovieFilters, RatedMovie, SwipeDecision } from '@/types/movie';
import {
  getAllRatedMovies,
  getFavoriteGenres,
  getLikeRatio,
  getRatedMovies,
  getVisibleMovies,
  groupHistoryByDay,
  uniqueGenres
} from '@/utils/movie';

export interface MovieQueueSummary {
  visibleMovies: Movie[];
  currentMovie: Movie | null;
  nextMovies: Movie[];
  likedMovies: Movie[];
  dislikedMovies: Movie[];
  superLikedMovies: Movie[];
  allRatedMovies: Array<Movie & RatedMovie>;
  favoriteGenres: ReturnType<typeof getFavoriteGenres>;
  likeRatio: number;
  totalLiked: number;
  totalDisliked: number;
  totalSuperLiked: number;
  remainingCount: number;
  genreOptions: string[];
  historyByDay: ReturnType<typeof groupHistoryByDay>;
  filters: MovieFilters;
  hydrated: boolean;
  movies: Movie[];
  ratings: Record<string, RatedMovie>;
  history: Array<{ movieId: string; decision: SwipeDecision; timestamp: string }>;
}

export function useMovieQueue(): MovieQueueSummary {
  const movies = useMovieStore((state) => state.movies);
  const deckOrder = useMovieStore((state) => state.deckOrder);
  const ratings = useMovieStore((state) => state.ratings);
  const history = useMovieStore((state) => state.history);
  const filters = useMovieStore((state) => state.filters);
  const hydrated = useMovieStore((state) => state.hydrated);

  return useMemo(() => {
    const visibleMovies = getVisibleMovies(movies, deckOrder, ratings, filters.searchTerm, filters.genre);
    const likedMovies = getRatedMovies(movies, ratings, 'liked');
    const dislikedMovies = getRatedMovies(movies, ratings, 'disliked');
    const superLikedMovies = getRatedMovies(movies, ratings, 'superliked');
    const allRatedMovies = getAllRatedMovies(movies, ratings);
    const favoriteGenres = getFavoriteGenres(movies, ratings);
    const likeRatio = getLikeRatio(likedMovies.length + superLikedMovies.length, dislikedMovies.length);
    const totalLiked = likedMovies.length + superLikedMovies.length;
    const totalDisliked = dislikedMovies.length;
    const totalSuperLiked = superLikedMovies.length;
    const remainingCount = movies.length - allRatedMovies.length;
    const genreOptions = uniqueGenres(movies);
    const historyByDay = groupHistoryByDay(history);

    return {
      visibleMovies,
      currentMovie: visibleMovies[0] ?? null,
      nextMovies: visibleMovies.slice(1, 4),
      likedMovies,
      dislikedMovies,
      superLikedMovies,
      allRatedMovies,
      favoriteGenres,
      likeRatio,
      totalLiked,
      totalDisliked,
      totalSuperLiked,
      remainingCount,
      genreOptions,
      historyByDay,
      filters,
      hydrated,
      movies,
      ratings,
      history
    };
  }, [deckOrder, filters.genre, filters.searchTerm, history, hydrated, movies, ratings]);
}
