import movieData from '@/data/movies.json';
import type { Movie } from '@/types/movie';
import { uniqueGenres } from '@/utils/movie';

export async function loadMovieLibrary(): Promise<Movie[]> {
  return movieData as Movie[];
}

export function getMovieGenres(movies: Movie[]): string[] {
  return uniqueGenres(movies);
}
