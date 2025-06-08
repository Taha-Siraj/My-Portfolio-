import React, { useEffect, useState } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs,
  FaGit, FaGithub, FaCode, FaBolt, FaFire, FaWpforms, FaFigma,
  FaTools
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiMui, SiMongodb, SiPostgresql,
  SiVercel, SiNetlify
} from "react-icons/si";

const skillsData = [
  { color: "#E44D26", name: "HTML5", icon: FaHtml5, level: 95 },
  { color: "#1572B6", name: "CSS3", icon: FaCss3Alt, level: 90 },
  { color: "#F7DF1E", name: "JavaScript ", icon: FaJs, level: 85 },
  { color: "#61DAFB", name: "React.js", icon: FaReact, level: 85 },
  { color: "#000000", name: "Next.js", icon: SiNextdotjs, level: 75 },
  { color: "#38BDF8", name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
  { color: "#007FFF", name: "Material UI", icon: SiMui, level: 70 },
  { color: "#7952B3", name: "Bootstrap", icon: FaBootstrap, level: 70 },
  { color: "#47A248", name: "MongoDB", icon: SiMongodb, level: 75 },
  { color: "#336791", name: "PostgreSQL", icon: SiPostgresql, level: 65 },
  { color: "#FFCA28", name: "Firebase", icon: FaFire, level: 80 },
  { color: "#88CE02", name: "GSAP", icon: FaBolt, level: 70 },
  { color: "#0055FF", name: "Framer Motion", icon: FaTools, level: 70 },
  { color: "#26A69A", name: "Formik", icon: FaWpforms, level: 60 },
  { color: "#007ACC", name: "VS Code", icon: FaCode, level: 95 },
  { color: "#F24E1E", name: "Figma", icon: FaFigma, level: 65 },
  { color: "#F05032", name: "Git", icon: FaGit, level: 80 },
  { color: "#181717", name: "GitHub", icon: FaGithub, level: 85 },
  { color: "#000000", name: "Vercel", icon: SiVercel, level: 75 },
  { color: "#00C7B7", name: "Netlify", icon: SiNetlify, level: 75 },
];

const Skills = () => {
  const [animatedLevels, setAnimatedLevels] = useState(skillsData.map(() => 0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedLevels(skillsData.map(skill => skill.level));
    }, 300); // slight delay for animation

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="skills" className="font-poppins py-16 md:py-24 bg-gray-900">
      <h1 className='text-4xl font-black text-[#4C83CF] text-center'>Tech Stack Skills</h1>
      <hr className="border-[#8bbbff] border-t-4 w-[120px] mx-auto mt-1" />

      <div className="container flex flex-wrap gap-6 justify-center items-center py-10 px-10">
        {skillsData.map((skill, index) => {
          const Icons = skill.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-3 w-[260px] bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-teal-500/30 transition-shadow duration-300 hover:border hover:border-[rgb(71,85,105)] hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Icons size={40} color={skill.color} />
                <p className="text-white text-lg font-semibold">{skill.name}</p>
              </div>

              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2446A4] transition-all duration-1000 ease-in-out"
                  style={{ width: `${animatedLevels[index]}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-300">{skill.level}%</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
