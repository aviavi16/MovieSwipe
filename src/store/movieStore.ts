import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie, MovieFilters, RatedMovie, SwipeDecision, SwipeHistoryEntry } from '@/types/movie';
import { STORAGE_KEYS } from '@/utils/storage';
import { shuffleArray } from '@/utils/movie';

interface MovieStoreState {
  movies: Movie[];
  deckOrder: string[];
  ratings: Record<string, RatedMovie>;
  history: SwipeHistoryEntry[];
  filters: MovieFilters;
  hydrated: boolean;
  setLibrary: (movies: Movie[]) => void;
  shuffleDeck: () => void;
  rateMovie: (movieId: string, decision: SwipeDecision) => void;
  undoLastSwipe: () => void;
  setSearchTerm: (searchTerm: string) => void;
  setGenreFilter: (genre: string) => void;
  clearFilters: () => void;
  markHydrated: () => void;
}

function createInitialOrder(movies: Movie[]): string[] {
  return shuffleArray(movies.map((movie) => movie.id));
}

export const useMovieStore = create<MovieStoreState>()(
  persist(
    (set) => ({
      movies: [],
      deckOrder: [],
      ratings: {},
      history: [],
      filters: { searchTerm: '', genre: 'All' },
      hydrated: false,
      setLibrary: (movies) =>
        set((state) => {
          const movieIds = new Set(movies.map((movie) => movie.id));
          const seen = new Set<string>();
          const previousOrder = state.deckOrder.filter(
            (movieId) => movieIds.has(movieId) && !seen.has(movieId) && seen.add(movieId)
          );
          const nextOrder =
            previousOrder.length > 0
              ? [
                  ...previousOrder,
                  ...movies.map((movie) => movie.id).filter((movieId) => !previousOrder.includes(movieId))
                ]
              : createInitialOrder(movies);

          const nextRatings = Object.fromEntries(
            Object.entries(state.ratings).filter(([movieId]) => movieIds.has(movieId))
          );
          const nextHistory = state.history.filter((entry) => movieIds.has(entry.movieId));

          return {
            movies,
            deckOrder: nextOrder,
            ratings: nextRatings,
            history: nextHistory
          };
        }),
      shuffleDeck: () =>
        set((state) => ({
          deckOrder: shuffleArray(state.deckOrder.length > 0 ? state.deckOrder : state.movies.map((movie) => movie.id))
        })),
      rateMovie: (movieId, decision) =>
        set((state) => {
          if (state.ratings[movieId]) {
            return state;
          }

          const timestamp = new Date().toISOString();
          return {
            ratings: {
              ...state.ratings,
              [movieId]: { decision, ratedAt: timestamp }
            },
            history: [...state.history, { movieId, decision, timestamp }]
          };
        }),
      undoLastSwipe: () =>
        set((state) => {
          const lastEntry = state.history.at(-1);
          if (!lastEntry) {
            return state;
          }

          const { [lastEntry.movieId]: _removedRating, ...remainingRatings } = state.ratings;
          return {
            ratings: remainingRatings,
            history: state.history.slice(0, -1)
          };
        }),
      setSearchTerm: (searchTerm) => set((state) => ({ filters: { ...state.filters, searchTerm } })),
      setGenreFilter: (genre) => set((state) => ({ filters: { ...state.filters, genre } })),
      clearFilters: () => set({ filters: { searchTerm: '', genre: 'All' } }),
      markHydrated: () => set({ hydrated: true })
    }),
    {
      name: STORAGE_KEYS.movieSwipe,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        deckOrder: state.deckOrder,
        ratings: state.ratings,
        history: state.history,
        filters: state.filters
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      }
    }
  )
);
