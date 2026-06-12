import React, { useEffect, useRef } from 'react';
import { MdWork } from 'react-icons/md';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'Full Stack Engineer & Shopify Developer',
    company: 'Next Revolution Tech (NRT)',
    location: 'Karachi, Pakistan',
    period: 'Dec 2025 - Present',
    desc: 'Develop and deploy scalable full-stack applications with React.js/Next.js/Node.js, build customized Shopify stores, and led the development of WAKISSHA School Management System.',
    tech: ['React.js', 'Next.js', 'Node.js', 'Shopify', 'PostgreSQL']
  },
  {
    title: 'Web Developer',
    company: 'Codezyratech',
    location: 'Karachi, Pakistan',
    period: 'Sep 2024 - Sep 2025',
    desc: 'Developed responsive frontend applications with React.js/Next.js and optimized system performance using code-splitting and lazy-loading.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 bg-[#060b13] text-white overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Professional Log ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        {/* Experience List */}
        <div className="space-y-12">
          {experienceData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="cyber-card p-6 md:p-8 rounded-xl border border-[#10b981]/15 relative tech-corners shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column - Work Details */}
              <div className="flex-grow">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="p-3 bg-emerald-950/40 border border-[#10b981]/30 rounded-lg text-[#10b981]">
                    <MdWork className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-orbitron font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-emerald-400 font-semibold">{item.company} — <span className="text-gray-400 font-normal">{item.location}</span></p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-poppins mb-6">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#10b981]/25 bg-emerald-950/20 text-[#10b981] rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Period Badge */}
              <div className="flex-shrink-0 md:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 text-xs font-mono text-[#10b981] font-semibold tracking-wider">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
