import { Link as ScrollLink } from 'react-scroll';
import { socials, profile } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-4 border-black bg-[#0a0a10] px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <ScrollLink
          to="home"
          smooth
          duration={700}
          className="font-pixel cursor-pointer text-sm text-white"
        >
          TAHA<span className="text-[#00e436]">.SIRAJ</span>
        </ScrollLink>

        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="pixel-panel-light flex h-11 w-11 items-center justify-center text-white transition-transform hover:-translate-y-1"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <p className="font-pixel animate-blink text-[10px] text-[#ffec27]">
          ★ TO BE CONTINUED ★
        </p>
        <p className="text-xl text-[#4a4a60]">
          © {new Date().getFullYear()} {profile.name} — built with React + Three.js
        </p>
      </div>
    </footer>
  );
}
