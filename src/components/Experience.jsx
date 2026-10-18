import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="QUEST LOG"
          title="QUESTS"
          desc="Main story quests completed so far."
          color="green"
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[22px] top-0 w-1 bg-black md:left-1/2 md:-translate-x-1/2" />

          {experience.map((item, i) => {
            const active = i === 0;
            return (
              <Reveal
                key={item.company}
                className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                <div
                  className={`absolute top-2 flex h-7 w-7 items-center justify-center border-[3px] border-black ${
                    i % 2 === 0
                      ? 'left-[10px] md:left-auto md:-right-[14px]'
                      : 'left-[10px] md:-left-[14px]'
                  }`}
                  style={{ background: active ? '#00e436' : '#4a4a60' }}
                >
                  <span className="font-pixel text-[8px] text-black">
                    {active ? '▶' : '✓'}
                  </span>
                </div>

                <div className="pixel-panel p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="font-pixel border-2 border-black px-2.5 py-1.5 text-[8px]"
                      style={{
                        background: active ? '#00e436' : '#4a4a60',
                        color: active ? '#061206' : '#e8e8f0',
                      }}
                    >
                      {active ? '● IN PROGRESS' : '✓ COMPLETED'}
                    </span>
                    <span className="font-pixel text-[8px] text-[#9a9ab0]">
                      {item.period.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-pixel mt-4 text-xs leading-relaxed text-white md:text-sm">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-xl text-[#ffec27]">{item.company}</p>
                  <p className="mt-3 text-xl leading-snug text-[#9a9ab0]">{item.desc}</p>
                  <div className="mt-4 border-t-[3px] border-black/50 pt-3">
                    <span className="font-pixel text-[8px] text-[#9a9ab0]">
                      REWARDS:{' '}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="pixel-tag px-2.5 py-1 text-lg text-[#c9c9d8]">
                          +{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
