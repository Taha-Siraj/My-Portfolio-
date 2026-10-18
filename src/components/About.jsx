import { useRef } from 'react';
import { Download, MapPin, Briefcase, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { profile } from '../data/content';

export default function About() {
  const frameRef = useRef(null);

  const onTilt = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`;
  };

  return (
    <section id="about" data-palette="1" className="relative z-10 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Core Dossier"
          title="About Me"
          desc="Developer by craft, dimension-bender by curiosity."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="tilt-scene">
            <div
              ref={frameRef}
              onMouseMove={onTilt}
              onMouseLeave={() => {
                if (frameRef.current)
                  frameRef.current.style.transform =
                    'perspective(1000px) rotateY(0deg) rotateX(0deg)';
              }}
              className="tilt-card relative mx-auto max-w-sm transition-transform duration-200"
              data-hover
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-violet-500/20 to-fuchsia-500/30 blur-2xl" />
              <div className="glass tilt-inner relative overflow-hidden rounded-[1.75rem] p-2">
                <img
                  src={profile.avatar}
                  alt="Taha Siraj"
                  className="h-[420px] w-full rounded-[1.4rem] object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-2 rounded-[1.4rem] bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent" />
              </div>
              <div className="animate-float absolute -right-4 top-8 flex items-center gap-2 rounded-2xl border border-violet-400/30 bg-[#0a0620]/90 px-4 py-2.5 backdrop-blur-md">
                <Sparkles size={16} className="text-violet-300" />
                <span className="font-mono2 text-xs font-semibold text-white">
                  MERN STACK
                </span>
              </div>
              <div
                className="animate-float absolute -left-4 bottom-10 flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-[#0a0620]/90 px-4 py-2.5 backdrop-blur-md"
                style={{ animationDelay: '-3s' }}
              >
                <Briefcase size={16} className="text-cyan-300" />
                <span className="font-mono2 text-xs font-semibold text-white">
                  FULL STACK ENGINEER
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                Turning ideas into{' '}
                <span className="gradient-text">living interfaces</span>
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-white/60">
                I'm <span className="font-semibold text-white">Taha Siraj</span>, a
                Full Stack Developer based in {profile.location}. I specialize in
                the MERN stack — designing and shipping everything from school
                management platforms serving 500+ students to real-time WebGL
                experiences like the one you're looking at right now.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 leading-relaxed text-white/60">
                Currently I'm a{' '}
                <span className="text-cyan-300">
                  Full Stack Engineer & Shopify Developer at Next Revolution Tech
                </span>
                , where I build scalable React/Next.js applications, custom
                Shopify stores and Node.js APIs. My obsession: interfaces that
                feel alive — shaders, motion, depth.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
                <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                  <MapPin size={17} className="shrink-0 text-cyan-300" />
                  <span className="text-white/75">{profile.location}</span>
                </div>
                <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                  <Briefcase size={17} className="shrink-0 text-fuchsia-400" />
                  <span className="text-white/75">Open to freelance & roles</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Problem Solver', 'Clean Code', 'Pixel Obsessed', 'Fast Learner', 'Team Player'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="font-mono2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-200"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <a
                href={profile.cv}
                download
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-[#030014] shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-transform hover:scale-105"
              >
                <Download size={17} />
                Download CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
