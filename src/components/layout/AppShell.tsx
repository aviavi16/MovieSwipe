import type { ComponentType, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFilm, FaHeart, FaHouse, FaCircleInfo, FaChartColumn, FaThumbsDown } from 'react-icons/fa6';
import { twMerge } from '@/lib/twMerge';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Swipe', icon: FaHouse },
  { to: '/stats', label: 'Stats', icon: FaChartColumn },
  { to: '/favorites', label: 'Liked', icon: FaHeart },
  { to: '/disliked', label: 'Disliked', icon: FaThumbsDown },
  { to: '/about', label: 'About', icon: FaCircleInfo }
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-aurora-radial text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent-500/12 blur-[140px]" />
        <div className="absolute right-[-8rem] top-36 h-72 w-72 rounded-full bg-danger-500/12 blur-[120px]" />
        <div className="absolute bottom-0 left-[-6rem] h-80 w-80 rounded-full bg-white/6 blur-[130px]" />
      </div>
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 text-ink shadow-halo">
              <FaFilm className="text-lg" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-accent-300/80">MovieSwipe</p>
              <p className="text-sm text-white/50">Cinematic rating studio</p>
            </div>
          </NavLink>
          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <ShellNavLink key={item.to} to={item.to} label={item.label} icon={item.icon} />
            ))}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-ink/85 px-3 py-3 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5 gap-2">
          {navItems.map((item) => (
            <ShellNavLink key={item.to} to={item.to} label={item.label} icon={item.icon} mobile />
          ))}
        </div>
      </nav>
    </div>
  );
}

interface ShellNavLinkProps {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  mobile?: boolean;
}

function ShellNavLink({ to, label, icon: Icon, mobile = false }: ShellNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          'inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70',
          mobile
            ? 'flex-col px-2 py-2 text-[11px] font-medium text-white/55'
            : 'px-4 py-2.5 text-sm text-white/60 hover:border-white/10 hover:bg-white/6',
          isActive ? 'border-white/12 bg-white/10 text-white shadow-glow' : ''
        )
      }
    >
      <Icon className={mobile ? 'text-lg' : 'text-base'} />
      <span>{label}</span>
    </NavLink>
  );
}
