import React, { useEffect, useRef } from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: 'MERN Stack Development Certification',
    institution: 'Saylani Mass IT Training (SMIT)',
    period: '2024 - 2025',
    desc: 'Intensive full-stack development program learning React.js, Node.js, Express, MongoDB, and modern web APIs.'
  },
  {
    title: 'Intermediate (Computer Science)',
    institution: 'Govt. Jinnah College, Karachi',
    period: '2023 - 2025',
    desc: 'Acquired intermediate knowledge in core computer systems, logical computing, and sciences.'
  },
  {
    title: 'Matriculation (Science)',
    institution: 'Matchless Public Secondary School',
    period: '2021 - 2023',
    desc: 'Completed secondary education with a science curriculum, building foundational logic skills.'
  }
];

const Education = () => {
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
      id="education"
      ref={sectionRef}
      className="relative py-24 bg-[#060b13] text-white overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Academic Chronology ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        {/* Education Timeline/List */}
        <div className="space-y-12">
          {educationData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="cyber-card p-6 md:p-8 rounded-xl border border-[#10b981]/15 relative tech-corners shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column - Academic Details */}
              <div className="flex-grow">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="p-3 bg-emerald-950/40 border border-[#10b981]/30 rounded-lg text-[#10b981]">
                    <FaUserGraduate className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-orbitron font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-emerald-400 font-semibold">{item.institution}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-poppins">
                  {item.desc}
                </p>
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

export default Education;
