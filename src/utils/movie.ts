import type { GenreStat, Movie, RatedMovie, SwipeDecision, SwipeHistoryEntry } from '@/types/movie';

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function matchesMovieSearch(movie: Movie, searchTerm: string): boolean {
  const query = searchTerm.trim().toLowerCase();
  if (!query) {
    return true;
  }

  const searchable = [movie.title, movie.description, movie.tagline, movie.genres.join(' ')]
    .join(' ')
    .toLowerCase();

  return searchable.includes(query);
}

export function matchesGenre(movie: Movie, genre: string): boolean {
  return genre === 'All' || movie.genres.includes(genre);
}

export function getVisibleMovies(
  movies: Movie[],
  deckOrder: string[],
  ratings: Record<string, RatedMovie>,
  searchTerm: string,
  genre: string
): Movie[] {
  const movieMap = new Map(movies.map((movie) => [movie.id, movie]));

  return deckOrder
    .map((movieId) => movieMap.get(movieId))
    .filter((movie): movie is Movie => Boolean(movie))
    .filter((movie) => !ratings[movie.id])
    .filter((movie) => matchesMovieSearch(movie, searchTerm))
    .filter((movie) => matchesGenre(movie, genre));
}

export function getRatedMovies(
  movies: Movie[],
  ratings: Record<string, RatedMovie>,
  decision: SwipeDecision
): Movie[] {
  const movieMap = new Map(movies.map((movie) => [movie.id, movie]));

  return Object.entries(ratings)
    .filter(([, rating]) => rating.decision === decision)
    .map(([movieId]) => movieMap.get(movieId))
    .filter((movie): movie is Movie => Boolean(movie));
}

export function getAllRatedMovies(
  movies: Movie[],
  ratings: Record<string, RatedMovie>
): Array<Movie & RatedMovie> {
  const movieMap = new Map(movies.map((movie) => [movie.id, movie]));

  return Object.entries(ratings)
    .map(([movieId, rating]) => {
      const movie = movieMap.get(movieId);
      return movie ? { ...movie, ...rating } : null;
    })
    .filter((movie): movie is Movie & RatedMovie => Boolean(movie));
}

export function getFavoriteGenres(movies: Movie[], ratings: Record<string, RatedMovie>): GenreStat[] {
  const liked = getAllRatedMovies(movies, ratings).filter(
    (movie) => movie.decision === 'liked' || movie.decision === 'superliked'
  );
  const counts = new Map<string, number>();

  for (const movie of liked) {
    for (const genre of movie.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 6);
}

export function getLikeRatio(liked: number, disliked: number): number {
  const total = liked + disliked;
  if (total === 0) {
    return 0;
  }

  return (liked / total) * 100;
}

export function groupHistoryByDay(history: SwipeHistoryEntry[]): Array<{ label: string; count: number }> {
  const bucket = new Map<string, number>();
  const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offset);
    bucket.set(date.toDateString(), 0);
  }

  for (const entry of history) {
    const entryDate = new Date(entry.timestamp);
    entryDate.setHours(0, 0, 0, 0);
    const key = entryDate.toDateString();
    bucket.set(key, (bucket.get(key) ?? 0) + 1);
  }

  return [...bucket.entries()].map(([dateKey, count]) => ({
    label: dayFormatter.format(new Date(dateKey)),
    count
  }));
}

export function formatMovieRuntime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function uniqueGenres(movies: Movie[]): string[] {
  return ['All', ...new Set(movies.flatMap((movie) => movie.genres))].sort((left, right) => {
    if (left === 'All') return -1;
    if (right === 'All') return 1;
    return left.localeCompare(right);
  });
}

export function rateLabel(decision: SwipeDecision): string {
  switch (decision) {
    case 'liked':
      return 'Liked';
    case 'disliked':
      return 'Disliked';
    case 'superliked':
      return 'Super liked';
    default:
      return decision;
  }
}
