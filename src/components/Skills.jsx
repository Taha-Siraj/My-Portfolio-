import React from 'react';

// Updated skillsData with icon URLs integrated
const skillsData = {
  Frontend: [
    { name: "HTML5", icon: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" },
    { name: "CSS3", icon: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" },
    { name: "JavaScript (ES6+)", icon: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" },
    { name: "React.js", icon: "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" },
    { name: "Next.js", icon: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" },
  ],
  Styling: [
    { name: "Tailwind CSS", icon: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" },
    { name: "Material UI", icon: "https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" },
    { name: "Bootstrap", icon: "https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" },
  ],
  Backend: [
    { name: "Node.js", icon: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" },
    { name: "Express.js", icon: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" },
  ],
  Databases: [
    { name: "MongoDB", icon: "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" },
    { name: "PostgreSQL", icon: "https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" },
    { name: "Firebase", icon: "https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" },
  ],
  Tools: [
    { name: "GSAP", icon: "https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" },
    { name: "Framer Motion", icon: "https://img.shields.io/badge/Framer%20Motion-E10098?style=for-the-badge&logo=framer&logoColor=white" },
    { name: "Formik", icon: "https://img.shields.io/badge/Formik-1877F2?style=for-the-badge&logo=formik&logoColor=white" },
    { name: "VS Code", icon: "https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" },
    { name: "Figma", icon: "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" },
  ],
  "Version Control": [
    { name: "Git", icon: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" },
    { name: "GitHub", icon: "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" },
  ],
  Deployment: [
    { name: "Vercel", icon: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" },
    { name: "Netlify", icon: "https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" },
  ]
};
const SkillCategory = ({ title, skills }) => (
  <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-teal-500/30 transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-teal-400 mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map(skill => (
        <img className='text-4xl' key={skill.name} src={skill.icon} alt={`${skill.name} icon`} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Increased text size from 3xl to 4xl */}
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Technical Skills 🛠️</h2>
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