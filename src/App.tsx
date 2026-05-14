import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { loadMovieLibrary } from '@/services/movieService';
import { useMovieStore } from '@/store/movieStore';
import { SwipePage } from '@/pages/SwipePage';
import { StatisticsPage } from '@/pages/StatisticsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { DislikedPage } from '@/pages/DislikedPage';
import { AboutPage } from '@/pages/AboutPage';

export function App(): JSX.Element {
  const location = useLocation();
  const hydrated = useMovieStore((state) => state.hydrated);
  const setLibrary = useMovieStore((state) => state.setLibrary);
  const [libraryReady, setLibraryReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadMovieLibrary().then((movies) => {
      if (!active) {
        return;
      }

      setLibrary(movies);
      setLibraryReady(true);
    });

    return () => {
      active = false;
    };
  }, [setLibrary]);

  const isReady = hydrated && libraryReady;

  return (
    <AppShell>
      {!isReady ? (
        <LoadingScreen />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="w-full"
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<SwipePage />} />
              <Route path="/stats" element={<StatisticsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/disliked" element={<DislikedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      )}
    </AppShell>
  );
}
