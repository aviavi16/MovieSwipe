import { FaMagnifyingGlass, FaShuffle, FaXmark } from 'react-icons/fa6';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface MovieFiltersProps {
  searchTerm: string;
  genre: string;
  genres: string[];
  onSearchTermChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onShuffle: () => void;
  onClear: () => void;
}

export function MovieFilters({
  searchTerm,
  genre,
  genres,
  onSearchTermChange,
  onGenreChange,
  onShuffle,
  onClear
}: MovieFiltersProps): JSX.Element {
  return (
    <GlassPanel className="p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(180px,0.4fr)_auto_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Search movies</span>
          <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search title, description, or genre"
            className="h-12 w-full rounded-2xl border border-border bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent-400/45 focus:bg-white/7"
          />
        </label>
        <label className="block">
          <span className="sr-only">Filter by genre</span>
          <select
            value={genre}
            onChange={(event) => onGenreChange(event.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-white/5 px-4 text-sm text-white outline-none transition focus:border-accent-400/45"
          >
            {genres.map((option) => (
              <option key={option} value={option} className="bg-ink">
                {option}
              </option>
            ))}
          </select>
        </label>
        <Button variant="secondary" leadingIcon={<FaShuffle />} onClick={onShuffle}>
          Shuffle
        </Button>
        <Button variant="ghost" leadingIcon={<FaXmark />} onClick={onClear}>
          Clear
        </Button>
      </div>
    </GlassPanel>
  );
}
