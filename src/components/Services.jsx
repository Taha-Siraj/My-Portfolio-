import { Code2, ShoppingBag, Boxes, Server, Palette, Gauge } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { services } from '../data/content';

const ICONS = [Code2, ShoppingBag, Boxes, Server, Palette, Gauge];

export default function Services() {
  return (
    <section
      id="services"
      data-palette="5"
      className="relative z-10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services"
          desc="From idea to production — I handle the full journey."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.1} className="h-full">
                <div
                  data-hover
                  className="glass group relative h-full overflow-hidden rounded-[1.75rem] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_16px_50px_rgba(34,211,238,0.16)]"
                >
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/15 text-cyan-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono2 rounded-md bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cyan-200/80"
                      >
                        {t}
                      </span>
                    ))}
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
