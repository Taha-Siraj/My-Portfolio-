import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';

const LINKS = [
  { to: 'about', label: 'ABOUT' },
  { to: 'skills', label: 'SKILLS' },
  { to: 'projects', label: 'WORK' },
  { to: 'experience', label: 'JOURNEY' },
  { to: 'contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const start = () => {
      gsap.fromTo(
        navRef.current,
        { y: -90, rotate: -2, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' }
      );
    };
    if (window.__siteReady) start();
    else window.addEventListener('site-ready', start, { once: true });
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed left-0 right-0 top-4 z-[80] px-4" style={{ opacity: 0 }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <ScrollLink
            to="home"
            smooth
            duration={600}
            className="sticker-dark rotate-[-3deg] cursor-pointer px-4 py-2.5"
          >
            <span className="font-display text-lg text-white">
              TAHA<span className="text-[#b6fe00]">.SIRAJ</span>
            </span>
          </ScrollLink>

          <div className="hidden items-center gap-2 md:flex">
            {LINKS.map((l, i) => (
              <ScrollLink
                key={l.to}
                to={l.to}
                smooth
                duration={650}
                offset={-70}
                spy
                activeClass="!bg-[#013900] !text-[#b6fe00]"
                className="sticker cursor-pointer px-4 py-2 font-display text-sm tracking-wide text-[#013900] transition-transform hover:-rotate-3 hover:scale-105"
                style={{ transform: `rotate(${i % 2 === 0 ? 1.5 : -1.5}deg)` }}
              >
                {l.label}
              </ScrollLink>
            ))}
            <ScrollLink
              to="contact"
              smooth
              duration={650}
              offset={-70}
              className="btn-chunk cursor-pointer bg-[#fa8005] px-5 py-2.5 font-display text-sm text-white"
            >
              HIRE ME
            </ScrollLink>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="sticker px-4 py-2 font-display text-sm text-[#013900] md:hidden"
            aria-label="Menu"
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[75] flex flex-col items-center justify-center gap-4 bg-[#013900]/97 md:hidden">
          {LINKS.map((l, i) => (
            <ScrollLink
              key={l.to}
              to={l.to}
              smooth
              duration={600}
              offset={-70}
              onClick={() => setOpen(false)}
              className="sticker cursor-pointer px-8 py-3 font-display text-2xl text-[#013900]"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
            >
              {l.label}
            </ScrollLink>
          ))}
        </div>
      )}
    </>
  );
}
