import { Download } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { profile } from '../data/content';

const TRAITS = ['PROBLEM SOLVER', 'CLEAN CODE', 'PIXEL OBSESSED', 'FAST LEARNER', 'TEAM PLAYER'];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="CHARACTER FILE"
          title="HERO BIO"
          desc="The story so far..."
          color="blue"
        />

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="pixel-panel relative mx-auto max-w-sm p-3">
              <div className="border-4 border-black bg-[#0a0a10]">
                <img
                  src={profile.avatar}
                  alt="Taha Siraj"
                  className="h-[400px] w-full object-cover object-top"
                  style={{ imageRendering: 'auto' }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="font-pixel mt-3 flex items-center justify-between bg-black/40 px-2 py-2 text-[9px]">
                <span className="text-[#00e436]">● ONLINE</span>
                <span className="text-[#9a9ab0]">ID: TS-65328</span>
              </div>
              <div className="animate-float absolute -right-3 top-6 border-4 border-black bg-[#ffec27] px-3 py-2">
                <span className="font-pixel text-[9px] text-[#1c1a06]">MERN STACK</span>
              </div>
              <div
                className="animate-float absolute -left-3 bottom-16 border-4 border-black bg-[#29adff] px-3 py-2"
                style={{ animationDelay: '-2.5s' }}
              >
                <span className="font-pixel text-[9px] text-[#06121c]">FULL STACK</span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="pixel-panel p-6 md:p-8">
                <div className="font-pixel text-[10px] text-[#00e436]">
                  ▸ DIALOGUE
                </div>
                <p className="mt-4 text-2xl leading-snug text-[#e8e8f0]">
                  "I'm <span className="text-[#ffec27]">Taha Siraj</span>, a Full
                  Stack Developer from {profile.location}. I build everything
                  from school management platforms serving 500+ students to
                  real-time WebGL worlds — like the island floating behind this
                  page."
                </p>
                <p className="mt-4 text-2xl leading-snug text-[#9a9ab0]">
                  Currently: <span className="text-[#29adff]">Full Stack Engineer
                  & Shopify Developer</span> at Next Revolution Tech. My
                  specialty? Interfaces with game feel — motion, depth and
                  juice.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 flex flex-wrap gap-3">
                {TRAITS.map((t) => (
                  <span key={t} className="pixel-tag font-pixel px-3 py-2 text-[9px] text-[#c9c9d8]">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={profile.cv}
                download
                className="pixel-btn pixel-btn-blue font-pixel mt-8 inline-flex items-center gap-3 px-6 py-4 text-[11px]"
              >
                <Download size={16} />
                DOWNLOAD CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
