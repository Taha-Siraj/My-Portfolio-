import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-800">
       <h1 className="text-5xl font-black text-center  text-[#4C83CF]">About Me</h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[120px] mx-auto mt-2" />
      <div className="container flex gap-y-6 flex-col lg:flex-row justify-between  px-5 items-center ">
      <div className='relative h-[350px] w-[350px] '>
        <div className='absolute inset-0 morph-shape z-20 border-8 border-[#4984D0] '></div>
       <div className='relative  h-full w-full overflow-hidden  morph-shape     z-10'>
        <img
        src="./src/assets/Linkdin-profile (2).webp"
          className='h-full w-full object-cover'
            alt="Profile"
          />
        </div>
      </div>

        <div className="text-lg lg:w-[65%] text-gray-300 space-y-6">
          <p>
            As a passionate and committed MERN Stack Developer, I specialize in building clean, responsive, and interactive web experiences. From HTML & CSS to React.js, Node.js, and MongoDB, I bring life to ideas with code — crafting real-world solutions with strong UI/UX foundations.
          </p>
          <p>
            Currently enrolled at Saylani Mass IT Training (SMIT) and pursuing Computer Science at Jinnah Govt College, I've already built multiple full-stack projects, including custom CRUD apps, animated websites using GSAP, and seamless API integrations with React Query and Axios.
          </p>
       <p>
            My journey in web development is driven by a passion for learning and a commitment to excellence. I thrive on challenges and continuously seek opportunities to enhance my skills and contribute to innovative projects. Whether it's collaborating with teams or working independently, I am dedicated to delivering high-quality code and exceptional user experiences.
          </p>
          <p>
            Let's connect and explore how we can create something amazing together!
       </p>
        </div>
       
      </div>
    </section>
  );
};

export default About;