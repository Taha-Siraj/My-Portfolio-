import { marqueeItems } from '../data/content';

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <section className="relative z-10 overflow-hidden border-y-4 border-black bg-[#00e436] py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-pixel text-[11px] text-[#061206]">{item.toUpperCase()}</span>
            <span className="inline-block h-3 w-3 rotate-45 border-2 border-black bg-[#ffec27]" />
          </span>
        ))}
      </div>
    </section>
  );
}
