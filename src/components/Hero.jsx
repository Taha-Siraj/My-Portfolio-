import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link as ScrollLink } from 'react-scroll';


const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3");

      gsap.from(("#icons"), {
        opacity: 0,
        x: -200,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#icons",
          scrub: true,
        }
      })
  }, []);

  return (
    <section id="home" ref={heroRef} className="bg-[#0F172A] text-white py-20 md:py-2 gap-y-10 min-h-screen flex items-center">
      <div className="container px-6 text-center flex flex-col justify-center items-center gap-y-1">
             <h1 ref={titleRef} className="text-5xl md:text-6xl font-black mb-6 text-white">
   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8D46AE] via-[#8D46AE] to-[#4A84D0]">
   Hi, I'm Taha Siraj
  </span>
</h1>

        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8D46AE] via-[#3B82F6] to-[#4A84D0] text-xl md:text-4xl max-w-3xl font-poppins py-2">
          Full Stack Web Developer
        </p>

        <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-poppins">
          Building modern, responsive, and full-stack web applications. Passionate about learning and implementing new technologies to create amazing digital experiences.
        </p>
        <div className=' md:flex block  gap-y-5  justify-center items-center  gap-x-4'>
          <ScrollLink
          to='projects'
          ref={buttonRef}
          smooth={true}
          duration={500}
          offset={-70}  
          className="bg-[#06B6D4] text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
          View My Work
        </ScrollLink>
          <a
          href="./src/assets/download.pdf"
          ref={buttonRef}
          className="bg-[#06B6D4] flex justify-between gap-x-4 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 ">
          Download Resume 
          <FaDownload className="text-3xl" />
        </a>
        </div>
       <div
  id="icons"
  className="absolute top-24 py-2 px-4 md:ml-4 left-1/2 -translate-x-1/2 md:top-60 md:left-0 md:translate-x-0 flex flex-row md:flex-col justify-center items-center gap-5 rounded-3xl h-auto md:h-[200px] w-auto md:w-[100px] border border-[#1a2f5d] bg-white/10 backdrop-blur-md shadow-lg"
>
  <Link to="https://github.com/Taha-Siraj">
    <FaGithub className="text-5xl transition-colors duration-300 hover:text-black" />
  </Link>
  <Link to="https://www.linkedin.com/in/taha-siraj-2331952a8/">
    <FaLinkedin className="text-5xl text-blue-500 transition-colors duration-300 hover:text-blue-600" />
  </Link>
  <Link to="mailto:tahasiraj16@gmail.com">
    <MdEmail className="text-5xl text-[#06B6D4] hover:text-cyan-400" />
  </Link>
</div>

       </div>
    </section>
  );
};

export default Hero;