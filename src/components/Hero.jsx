import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger);

const bgProjects = [
  'wakissha.png',
  'crud.png',
  'tvs-emerald.png',
  'opencodeshare.png',
  'facebook.png',
  'animated.png'
];

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hero-animate-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05 }
      )
      .fromTo(
        '.hero-animate-title',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.35'
      )
      .fromTo(
        '.hero-animate-role',
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.45 },
        '-=0.35'
      )
      .fromTo(
        '.hero-animate-desc',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.35'
      )
      .fromTo(
        '.hero-animate-cta',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.3'
      )
      .fromTo(
        '.hero-animate-socials a',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
        '-=0.25'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen bg-[#060b13] flex items-center justify-center overflow-hidden cyber-grid pt-28 pb-16 md:py-20"
    >
      {/* Concentric ambient background gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#10b981]/8 rounded-full blur-[90px] pointer-events-none z-0"></div>

      {/* Tilted Background Project Scroll Tracks (170 degrees / -10deg rotate) */}
      <div className="absolute right-[-10%] top-[-10%] bottom-[-10%] w-[100%] md:w-[60%] overflow-hidden pointer-events-none select-none z-0">
        <div className="w-full h-full transform rotate-[-10deg] flex gap-4 justify-center items-center opacity-[0.35]">
          {/* Track 1 */}
          <div className="flex flex-col gap-6 animate-scroll-y w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0">
            {[...bgProjects, ...bgProjects, ...bgProjects].map((img, i) => (
              <div key={i} className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#10b981]/25 bg-[#091522] shadow-[0_0_15px_rgba(16,185,129,0.15)] flex-shrink-0">
                <img src={img} alt="project background" className="w-full h-full object-cover filter brightness-[0.6] contrast-125 grayscale-[20%]" />
              </div>
            ))}
          </div>

          {/* Track 2 */}
          <div className="flex flex-col gap-6 animate-scroll-y-reverse w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0">
            {[...bgProjects, ...bgProjects, ...bgProjects].map((img, i) => (
              <div key={i} className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#10b981]/25 bg-[#091522] shadow-[0_0_15px_rgba(16,185,129,0.15)] flex-shrink-0">
                <img src={img} alt="project background" className="w-full h-full object-cover filter brightness-[0.6] contrast-125 grayscale-[20%]" />
              </div>
            ))}
          </div>

          {/* Track 3 (Visible on larger screens) */}
          <div className="hidden sm:flex flex-col gap-6 animate-scroll-y w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0">
            {[...bgProjects, ...bgProjects, ...bgProjects].map((img, i) => (
              <div key={i} className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#10b981]/25 bg-[#091522] shadow-[0_0_15px_rgba(16,185,129,0.15)] flex-shrink-0">
                <img src={img} alt="project background" className="w-full h-full object-cover filter brightness-[0.6] contrast-125 grayscale-[20%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Ambient fade overlays to smoothly blend the slanted track edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060b13] via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b13] via-transparent to-[#060b13] z-10"></div>
      </div>



      {/* Content container */}
      <div className="container px-2 mx-auto flex items-center justify-start max-w-6xl z-20 h-full relative">
        <div className="w-full md:w-[75%] text-left flex flex-col items-start relative pt-12 md:pt-0">
          
          {/* Availability Badge */}
          <div className="hero-animate-badge flex items-center gap-x-2 px-3.5 py-1.5 bg-[#10b981]/15 border border-[#10b981]/30 rounded-full text-[10px] font-semibold text-[#10b981] tracking-wider mb-6 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_6px_#10b981]"></span>
            Available for New Projects
          </div>

          {/* Title / Name */}
          <h1 className="hero-animate-title text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-white leading-tight tracking-tight mb-2">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#059669] text-glow-emerald">Taha Siraj</span>
          </h1>
          <h2 className="hero-animate-role text-2xl sm:text-3xl md:text-4xl font-orbitron font-extrabold text-white tracking-wide mb-6">
            MERN Stack Developer
          </h2>

          {/* Description */}
          <p className="hero-animate-desc text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-poppins mb-8 max-w-md">
            Passionate MERN Stack Developer skilled in building clean, responsive, and user-friendly web applications using React, Next.js, Tailwind CSS, and Node.js.
          </p>

          {/* CTA Button */}
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            offset={-70}
            className="hero-animate-cta cursor-pointer font-orbitron font-bold tracking-widest text-xs sm:text-sm px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-gray-900 rounded-full flex items-center gap-x-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 uppercase"
          >
            View Projects <FaArrowRight className="text-[10px] sm:text-xs" />
          </ScrollLink>

          {/* Social Icons */}
          <div className="hero-animate-socials flex items-center gap-x-4 mt-8">
            <a
              href="https://www.linkedin.com/in/taha-siraj-2331952a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900/60 border border-white/5 hover:border-[#10b981]/30 text-gray-400 hover:text-white rounded-full transition-all duration-300 text-base shadow"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Taha-Siraj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900/60 border border-white/5 hover:border-[#10b981]/30 text-gray-400 hover:text-white rounded-full transition-all duration-300 text-base shadow"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900/60 border border-white/5 hover:border-[#10b981]/30 text-gray-400 hover:text-white rounded-full transition-all duration-300 text-base shadow"
            >
              <FaTwitter />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
