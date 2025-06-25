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

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-800 overflow-x-hidden"
    >
      <h1 className="text-4xl sm:text-5xl font-black text-center text-[#4C83CF]">
        About Me
      </h1>
      <hr className="border-[#8bbbff] border-t-4 mb-12 w-[120px] mx-auto mt-2" />

      <div className="container mx-auto flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 gap-x-10 justify-between px-5 items-center">
        {/* Image Container */}
        <div
          ref={imageRef}
          className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] flex-shrink-0"
        >
          <div className="absolute inset-0 morph-shape z-20 border-8 border-[#4984D0] rounded-lg"></div>
          <div className="relative h-full w-full overflow-hidden morph-shape z-10 rounded-lg">
            <img
              src="Linkdin-profile (2).webp"
              alt="Profile"
              className="h-full w-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Content */}
        <div
          ref={textRef}
          className="text-lg lg:w-[65%] text-gray-300 space-y-6 max-w-3xl"
        >
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
