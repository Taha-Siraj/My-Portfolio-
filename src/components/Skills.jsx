import React, { useEffect, useRef } from 'react';
import {
  FaJs, FaReact, FaBootstrap, FaGit, FaGithub, FaBolt, FaShopify, FaNodeJs
} from "react-icons/fa";
import {
  SiTailwindcss, SiMui, SiPostgresql, SiVercel, SiNextdotjs, SiTypescript, SiMongodb, SiRedis, SiReactquery
} from "react-icons/si";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { color: "#F7DF1E", name: "JavaScript (ES6+)", icon: FaJs, level: 90 },
  { color: "#3178C6", name: "TypeScript", icon: SiTypescript, level: 85 },
  { color: "#61DAFB", name: "React.js", icon: FaReact, level: 90 },
  { color: "#000000", name: "Next.js", icon: SiNextdotjs, level: 85 },
  { color: "#339933", name: "Node.js", icon: FaNodeJs, level: 85 },
  { color: "#38BDF8", name: "Tailwind CSS", icon: SiTailwindcss, level: 95 },
  { color: "#47A248", name: "MongoDB", icon: SiMongodb, level: 80 },
  { color: "#336791", name: "PostgreSQL", icon: SiPostgresql, level: 75 },
  { color: "#06B6D4", name: "GSAP", icon: FaBolt, level: 80 },
  { color: "#2296F3", name: "React Query", icon: SiReactquery, level: 80 },
  { color: "#DC382D", name: "Redis", icon: SiRedis, level: 60 },
  { color: "#95BF47", name: "Shopify", icon: FaShopify, level: 75 },
  { color: "#F05032", name: "Git", icon: FaGit, level: 85 },
  { color: "#181717", name: "GitHub", icon: FaGithub, level: 85 },
  { color: "#000000", name: "Vercel", icon: SiVercel, level: 85 },
  { color: "#007FFF", name: "Material UI", icon: SiMui, level: 75 },
];

const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const skillBars = containerRef.current.querySelectorAll('.skill-bar');

    skillBars.forEach((bar, index) => {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: bar.dataset.level + '%',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.05,
        }
      );
    });
  }, []);

  return (
    <section 
      id="skills" 
      className="font-poppins py-24 bg-[#060b13] overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Tech Stack Capabilities ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Skills Inventory
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skillsData.map(({ color, name, icon: Icon, level }, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 bg-slate-950/60 rounded-xl p-5 border border-slate-800 hover:border-[#10b981]/30 transition-all duration-300 hover:-translate-y-1 relative group shadow-md"
              style={{
                '--hover-glow': color
              }}
            >
              {/* Subtle hover card indicator */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
                }}
              ></div>

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ color: color }}
                  >
                    <Icon size={24} />
                  </div>
                  <p className="text-white text-sm font-orbitron font-bold tracking-wide">{name}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono tracking-wider">{level}%</span>
              </div>

              {/* Glowing High Tech Segment Progress Bar */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/80 p-[1px] z-10">
                <div
                  className="skill-bar h-full rounded-full"
                  data-level={level}
                  style={{ 
                    width: '0%',
                    background: `linear-gradient(to right, ${color}cc, ${color}ff)`,
                    boxShadow: `0 0 8px ${color}80`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
