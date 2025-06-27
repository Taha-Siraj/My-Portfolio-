import React, { useEffect, useRef } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs,
  FaGit, FaGithub, FaCode, FaBolt, FaFire, FaWpforms, FaFigma,
  FaTools
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiMui, SiMongodb, SiPostgresql,
  SiVercel, SiNetlify
} from "react-icons/si";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { color: "#E44D26", name: "HTML5", icon: FaHtml5, level: 95 },
  { color: "#1572B6", name: "CSS3", icon: FaCss3Alt, level: 90 },
  { color: "#F7DF1E", name: "JavaScript", icon: FaJs, level: 85 },
  { color: "#61DAFB", name: "React.js", icon: FaReact, level: 85 },
  { color: "#38BDF8", name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
  { color: "#007FFF", name: "Material UI", icon: SiMui, level: 70 },
  { color: "#7952B3", name: "Bootstrap", icon: FaBootstrap, level: 70 },
  { color: "#336791", name: "PostgreSQL", icon: SiPostgresql, level: 65 },
  { color: "#FFCA28", name: "Firebase", icon: FaFire, level: 80 },
  { color: "#88CE02", name: "GSAP", icon: FaBolt, level: 70 },
  { color: "#0055FF", name: "Framer Motion", icon: FaTools, level: 70 },
  { color: "#26A69A", name: "Formik", icon: FaWpforms, level: 60 },
  { color: "#007ACC", name: "VS Code", icon: FaCode, level: 95 },
  { color: "#F05032", name: "Git", icon: FaGit, level: 80 },
  { color: "#181717", name: "GitHub", icon: FaGithub, level: 85 },
  { color: "#000000", name: "Vercel", icon: SiVercel, level: 75 },
  { color: "#00C7B7", name: "Netlify", icon: SiNetlify, level: 75 },
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            // markers: true, // Uncomment for debugging
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <section id="skills" className="font-poppins py-16 md:py-24 bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#4C83CF] text-center mb-2">
        Tech Stack Skills
      </h1>
      <hr className="border-[#8bbbff] border-t-4 w-[120px] mx-auto mb-10 rounded-md" />

      <div
        ref={containerRef}
        className="container mx-auto flex flex-wrap justify-center gap-8 px-6"
      >
        {skillsData.map(({ color, name, icon: Icon, level }, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 w-full sm:w-[260px] bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-teal-500/40 transition-shadow duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Icon size={40} color={color} />
              <p className="text-white text-lg font-semibold tracking-wide">{name}</p>
            </div>

            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
              <div
                className="skill-bar h-full rounded-full bg-[#2446A4]"
                data-level={level}
                style={{ width: '0%' }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-300 font-mono">{level}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
