import React from 'react';
import { Bell, Sun, Moon, Command } from 'lucide-react';

const PAGES = ['home', 'about', 'lab', 'studio', 'contact'];

const LABELS = {
  home: 'HOME',
  about: 'ABOUT',
  lab: 'LAB',
  studio: 'STUDIO',
  contact: 'CONTACT',
};

export default function Header({ page, go, theme, toggleTheme, onPalette, onUpdates }) {
  return (
    <header className="fixed left-1/2 top-9 z-50 flex w-[min(96vw,860px)] -translate-x-1/2 items-center justify-between gap-2 md:top-10">
      {/* monogram + current page */}
      <button onClick={() => go('home')} className="flex shrink-0 items-center gap-2" aria-label="Home">
        <span className="flex">
          <span className="flex h-9 w-9 items-center justify-center border-2 border-[var(--fg)] text-sm font-bold">T</span>
          <span className="flex h-9 w-9 items-center justify-center border-2 border-l-0 border-[var(--fg)] text-sm font-bold">S</span>
        </span>
        {page !== 'home' && (
          <span className="pill hidden rounded-full px-3 py-1.5 text-xs font-medium sm:block">
            {LABELS[page]}
          </span>
        )}
      </button>

      {/* center nav pill */}
      <nav className="pill flex items-center gap-0.5 overflow-x-auto rounded-full p-1">
        {PAGES.map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:text-sm ${
              page === p
                ? 'bg-[var(--fg)] text-[var(--bg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            {LABELS[p]}
          </button>
        ))}
        <button
          onClick={onPalette}
          className="ml-1 flex shrink-0 items-center gap-1 rounded-full border border-[var(--line)] px-2.5 py-1.5 text-[var(--muted)] hover:text-[var(--fg)]"
          aria-label="Command palette"
        >
          <Command size={13} />
          <span className="mono hidden text-[10px] md:inline">K</span>
        </button>
      </nav>

      {/* right controls */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={onUpdates}
          className="pill flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--fg)]"
          aria-label="Updates"
        >
          <Bell size={16} />
        </button>
        <button
          onClick={toggleTheme}
          className="pill flex h-9 items-center gap-1 rounded-full px-2 text-[var(--muted)] hover:text-[var(--fg)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span className="mono hidden text-[10px] md:inline">
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </span>
        </button>
      </div>
    </header>
  );
}
