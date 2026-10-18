import { marqueeItems } from '../data/content';

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <section data-palette="1" className="relative z-10 overflow-hidden border-y border-white/10 bg-black/40 py-5 backdrop-blur-md">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg font-bold uppercase tracking-widest text-white/75">
              {item}
            </span>
            <span className="gradient-text text-xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
