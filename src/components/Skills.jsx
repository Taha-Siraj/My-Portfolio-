import React from 'react';

const skillsData = {
  Frontend: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)"],
  Styling: ["Tailwind CSS", "Material UI", "Bootstrap"],
  Backend: ["Node.js", "Express.js"],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["GSAP", "React Query", "Axios"],
  "Version Control": ["Git & GitHub"],
  Deployment: ["Vercel", "Netlify"]
};

const SkillCategory = ({ title, skills }) => (
  <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-teal-500/30 transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-teal-400 mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map(skill => (
        <span key={skill} className="bg-gray-700 text-teal-300 px-4 py-2 rounded-full text-sm font-medium shadow">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">Technical Skills 🛠️</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([category, skillList]) => (
            <SkillCategory key={category} title={category} skills={skillList} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;