import { Link as ScrollLink } from 'react-scroll';
import { Heart } from 'lucide-react';
import { socials, profile } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 px-6 py-12 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 text-center">
        <ScrollLink
          to="home"
          smooth
          duration={700}
          className="font-display cursor-pointer text-2xl font-extrabold text-white"
        >
          TAHA<span className="gradient-text">.SIRAJ</span>
        </ScrollLink>

        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-all hover:-translate-y-1 hover:text-white hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]"
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>

        <p className="font-mono2 flex items-center gap-1.5 text-xs text-white/40">
          Crafted with <Heart size={13} className="text-fuchsia-400" /> using
          React, Three.js & WebGL
        </p>
        <p className="font-mono2 text-[11px] text-white/30">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
