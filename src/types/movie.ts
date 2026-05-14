export type SwipeDecision = 'liked' | 'disliked' | 'superliked';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  description: string;
  rating: number;
  posterUrl: string;
  runtime: number;
  tagline: string;
}

export interface RatedMovie {
  decision: SwipeDecision;
  ratedAt: string;
}

export interface SwipeHistoryEntry {
  movieId: string;
  decision: SwipeDecision;
  timestamp: string;
}

export interface MovieFilters {
  searchTerm: string;
  genre: string;
}

export interface GenreStat {
  genre: string;
  count: number;
}
