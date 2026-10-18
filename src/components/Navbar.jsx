import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';

const LINKS = [
  { to: 'home', label: 'START' },
  { to: 'about', label: 'HERO' },
  { to: 'skills', label: 'SKILLS' },
  { to: 'experience', label: 'QUESTS' },
  { to: 'projects', label: 'MISSIONS' },
  { to: 'contact', label: 'PARTY' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const start = () => {
      gsap.fromTo(
        navRef.current,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    };
    if (window.__siteReady) start();
    else window.addEventListener('site-ready', start, { once: true });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="pixel-panel fixed left-1/2 top-4 z-50 w-[94%] max-w-4xl -translate-x-1/2 md:top-6"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <ScrollLink
            to="home"
            smooth
            duration={600}
            className="font-pixel cursor-pointer text-xs text-white md:text-sm"
          >
            <span className="mr-2 inline-block h-4 w-4 border-2 border-black bg-[#00e436] align-middle" />
            TAHA<span className="text-[#00e436]">.SIRAJ</span>
          </ScrollLink>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <ScrollLink
                key={l.to}
                to={l.to}
                smooth
                duration={600}
                offset={-90}
                spy
                activeClass="!text-[#ffec27]"
                className="font-pixel cursor-pointer px-3 py-2 text-[10px] text-[#9a9ab0] transition-colors hover:bg-black/30 hover:text-white"
              >
                {l.label}
              </ScrollLink>
            ))}
            <ScrollLink
              to="contact"
              smooth
              duration={600}
              offset={-90}
              className="pixel-btn pixel-btn-yellow font-pixel ml-2 cursor-pointer px-4 py-2 text-[10px]"
            >
              HIRE ME
            </ScrollLink>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="font-pixel px-3 py-2 text-xs text-white md:hidden"
            aria-label="Menu"
          >
            {open ? '[X]' : '[=]'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-[#101018]/95 md:hidden">
          {LINKS.map((l) => (
            <ScrollLink
              key={l.to}
              to={l.to}
              smooth
              duration={600}
              offset={-90}
              onClick={() => setOpen(false)}
              className="font-pixel cursor-pointer border-4 border-black bg-[#1d1d2b] px-8 py-4 text-sm text-white"
            >
              {l.label}
            </ScrollLink>
          ))}
        </div>
      )}
    </>
  );
}
