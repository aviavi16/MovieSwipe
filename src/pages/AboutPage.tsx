import { PageTransition } from '@/components/ui/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';

const architectureItems = [
  'React + Vite + TypeScript for a static, deployable frontend.',
  'Zustand with localStorage persistence for ratings, history, and filters.',
  'Framer Motion for drag physics, overlays, animated counters, and page transitions.',
  'TailwindCSS for the dark glassmorphism visual system.',
  'A service boundary that currently loads a local mock dataset and can later switch to TMDB.'
];

export function AboutPage(): JSX.Element {
  return (
    <PageTransition>
      <div className="space-y-6">
        <SectionHeading
          eyebrow="About"
          title="MovieSwipe is built like a real product."
          description="The codebase is structured for growth: reusable UI primitives, a service boundary for movie data, typed state, and a deploy path that works on GitHub Pages."
        />

        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <GlassPanel className="space-y-4 p-5">
            <h3 className="font-display text-xl font-semibold text-white">Architecture</h3>
            <div className="space-y-3">
              {architectureItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/4 p-3 text-sm leading-6 text-white/70">
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="space-y-4 p-5">
            <h3 className="font-display text-xl font-semibold text-white">What ships today</h3>
            <div className="flex flex-wrap gap-2">
              {['Swipe deck', 'Undo', 'Super like', 'Randomize', 'Search', 'Genre filter', 'Stats', 'Liked movies', 'Disliked movies', 'GitHub Pages'].map((item) => (
                <Badge key={item} className="border-white/8 bg-white/6 text-white/75">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="text-sm leading-7 text-white/65">
              The mock dataset is local and deterministic enough for offline development, but the service layer is isolated so you can swap in TMDB later without rewiring the UI.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-accent-300">Stack</p>
                <p className="mt-2 text-sm text-white/70">React, Vite, TypeScript, TailwindCSS, Framer Motion, React Icons, Zustand</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-accent-300">Deployment</p>
                <p className="mt-2 text-sm text-white/70">GitHub Actions build and publish to GitHub Pages on main</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </PageTransition>
  );
}
