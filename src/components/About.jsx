import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(imageRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      }).from(
        textRef.current,
        {
          opacity: 0,
          x: 100,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-[#060b13] overflow-hidden border-t border-[#10b981]/10"
    >
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 cyber-grid-static pointer-events-none opacity-40"></div>

      <div className="relative container mx-auto px-6 max-w-6xl z-10">
        
        {/* Futuristic Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Core Dossier ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 gap-x-12 justify-between items-center">
          
          {/* Futuristic Dossier Image Module */}
          <div
            ref={imageRef}
            className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] flex-shrink-0 tech-corners p-2 bg-slate-950/80 border border-[#10b981]/20 shadow-2xl rounded"
          >
            <div className="absolute inset-0 border border-[#10b981]/10 rounded pointer-events-none m-4"></div>
            <div className="relative h-full w-full overflow-hidden rounded">
              <img
                src="user-profile.jpg"
                alt="Taha Siraj Dossier"
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#10b981]/10 pointer-events-none mix-blend-color"></div>
            </div>
            {/* Visual tech badge overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-[#10b981]/30 text-[10px] font-mono text-[#10b981] px-3 py-1 rounded shadow">
              DCR_ID // TS_982
            </div>
          </div>

          {/* Holographic Text Dossier */}
          <div
            ref={textRef}
            className="lg:w-[62%] flex flex-col gap-y-6 text-gray-300 max-w-3xl"
          >
            <div className="cyber-card p-6 rounded-lg border border-[#10b981]/15 relative">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-[#10b981] uppercase tracking-widest">
                [ Overview ]
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                As a passionate <strong className="text-[#10b981] font-semibold font-orbitron text-sm">MERN Stack Developer</strong>, I specialize in building clean, responsive, and user-friendly web applications. Currently honing my software engineering skills at Saylani Mass IT Training (SMIT) while pursuing my Computer Science degree, I love turning complex logic into seamless full-stack products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="cyber-card p-5 rounded-lg border border-[#10b981]/10">
                <h4 className="font-orbitron text-xs text-[#10b981] uppercase tracking-wider mb-2">
                  // Academic Path
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Pursuing Computer Science at Govt. Jinnah College (2023 - 2025) and professional MERN Stack development at Saylani Mass IT Training (SMIT).
                </p>
              </div>

              <div className="cyber-card p-5 rounded-lg border border-[#10b981]/10">
                <h4 className="font-orbitron text-xs text-[#10b981] uppercase tracking-wider mb-2">
                  // Core Philosophy
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Dedicated to delivering high-performance logical backend architectures paired with pixel-perfect, interactive user interfaces.
                </p>
              </div>
            </div>

            {/* Quick Metadata Table */}
            <div className="cyber-card px-6 py-4 rounded-lg border border-[#10b981]/10 font-mono text-xs text-gray-400 divide-y divide-slate-800">
              <div className="flex justify-between py-2">
                <span className="text-[#10b981]">SPECIALIZATION</span>
                <span className="text-white">MERN & Full-Stack Development</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#10b981]">CORE FRAMEWORKS</span>
                <span className="text-white">React.js, Next.js, Node.js, Express.js, MongoDB</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#10b981]">ACTIVE REGION</span>
                <span className="text-white">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
