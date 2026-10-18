import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const LINKS = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const start = () => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    };
    if (window.__siteReady) start();
    else window.addEventListener('site-ready', start, { once: true });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-1/2 top-4 z-50 w-[94%] max-w-3xl -translate-x-1/2 rounded-2xl transition-all duration-300 md:top-6 ${
          scrolled
            ? 'glass shadow-[0_8px_40px_rgba(34,211,238,0.12)]'
            : 'border border-transparent bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <ScrollLink
            to="home"
            smooth
            duration={600}
            className="font-display cursor-pointer text-lg font-extrabold tracking-tight text-white"
          >
            TAHA<span className="gradient-text">.SIRAJ</span>
          </ScrollLink>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <ScrollLink
                key={l.to}
                to={l.to}
                smooth
                duration={600}
                offset={-80}
                spy
                activeClass="!text-cyan-300"
                className="cursor-pointer rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </ScrollLink>
            ))}
            <ScrollLink
              to="contact"
              smooth
              duration={600}
              offset={-80}
              className="ml-2 cursor-pointer rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-2 text-[13px] font-bold text-[#030014] transition-transform hover:scale-105"
            >
              Hire Me
            </ScrollLink>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-white md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[#030014]/90 backdrop-blur-2xl md:hidden">
          {LINKS.map((l, i) => (
            <ScrollLink
              key={l.to}
              to={l.to}
              smooth
              duration={600}
              offset={-80}
              onClick={() => setOpen(false)}
              className="font-display cursor-pointer py-3 text-3xl font-bold text-white/85 transition-colors hover:text-cyan-300"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </ScrollLink>
          ))}
        </div>
      )}
    </>
  );
}
