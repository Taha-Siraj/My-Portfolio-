import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';
import { profile } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ab-card').forEach((el, i) => {
        gsap.from(el, {
          y: 90,
          opacity: 0,
          rotate: i % 2 === 0 ? -9 : 9,
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.from('.ab-title .h-char2', {
        yPercent: 120,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ab-title', start: 'top 85%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative overflow-hidden bg-[#f5f0e6] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="ab-title overflow-hidden text-center font-display text-6xl text-[#013900] md:text-8xl">
          {'MEET THE DEV'.split('').map((ch, i) => (
            <span key={i} className="h-char2 inline-block">
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h2>
        <p className="font-hand mt-3 rotate-[-1.5deg] text-center text-3xl text-[#a87c4e]">
          (that's me — taped to the page so i can't escape)
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {/* photo card */}
          <div className="ab-card paper-card relative rotate-[-4deg] p-3 pb-8">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
            <img
              src={profile.avatar}
              alt="Taha Siraj"
              className="h-80 w-full border-4 border-[#101010] object-cover object-top"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <p className="font-hand mt-2 text-center text-3xl">100% authentic dev</p>
          </div>

          {/* sticky note bio */}
          <div className="ab-card relative rotate-[2.5deg] bg-[#f7d000] p-7 shadow-[8px_8px_0_rgba(0,0,0,0.85)]">
            <span className="tape tape-white -top-3 left-8 rotate-[-8deg]" style={{ width: 100 }} />
            <p className="font-display text-xl text-[#101010]">📝 TO-DO: THE BIO</p>
            <ul className="mt-4 space-y-3 text-lg font-semibold text-[#101010]">
              <li>☐ Full-stack dev, Karachi</li>
              <li>☐ MERN is my mother tongue</li>
              <li>☐ 500+ student platform shipped</li>
              <li>☐ Shopify stores that sell</li>
              <li>☑ Currently: @ Next Revolution Tech</li>
            </ul>
            <p className="font-hand mt-4 text-2xl text-[#5a3d1e]">
              hire me and i'll stick around. promise.
            </p>
          </div>

          {/* polaroid stack / facts */}
          <div className="ab-card paper-card relative rotate-[-2deg] p-6">
            <span className="tape tape-green -top-3 right-8 rotate-[6deg]" style={{ width: 100 }} />
            <p className="font-display text-xl text-[#013900]">⚡ QUICK FACTS</p>
            <div className="mt-4 space-y-3">
              {[
                ['BASED IN', 'Karachi, Pakistan'],
                ['FOCUS', 'React / Next / Node'],
                ['STATUS', 'Open to work'],
                ['FUEL', 'Chai + deadlines'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b-[3px] border-dashed border-[#101010]/25 pb-2">
                  <span className="font-display text-sm tracking-wide text-[#a87c4e]">{k}</span>
                  <span className="text-right font-bold text-[#101010]">{v}</span>
                </div>
              ))}
            </div>
            <a
              href={profile.cv}
              download
              className="btn-chunk mt-6 inline-flex items-center gap-2 bg-[#013900] px-6 py-3 font-display text-sm text-[#b6fe00]"
            >
              <Download size={16} /> DOWNLOAD CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
