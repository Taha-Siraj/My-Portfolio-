import { BriefcaseBusiness, CalendarDays } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section
      id="experience"
      data-palette="3"
      className="relative z-10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Professional Log"
          title="Experience"
          desc="Where I've shipped real products for real users."
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500 opacity-40 md:left-1/2 md:-translate-x-1/2" />

          {experience.map((item, i) => (
            <Reveal
              key={item.company}
              className={`relative mb-12 pl-14 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? 'md:pr-14 md:text-right'
                  : 'md:ml-auto md:pl-14'
              }`}
            >
              <div
                className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-[#0a0620] shadow-[0_0_20px_rgba(34,211,238,0.4)] ${
                  i % 2 === 0
                    ? 'left-0 md:left-auto md:-right-5'
                    : 'left-0 md:-left-5'
                }`}
              >
                <BriefcaseBusiness size={17} className="text-cyan-300" />
              </div>

              <div
                data-hover
                className="glass group rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:shadow-[0_12px_44px_rgba(255,0,255,0.14)] md:p-7"
              >
                <span className="font-mono2 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3.5 py-1 text-[11px] font-semibold text-cyan-200">
                  <CalendarDays size={12} />
                  {item.period}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-fuchsia-300">
                  {item.company}
                  <span className="font-normal text-white/40"> — {item.location}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
