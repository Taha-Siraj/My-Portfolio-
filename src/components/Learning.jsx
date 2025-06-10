import React, { useEffect, useRef } from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Learning = () => {
  const sectionRef = useRef(null);
  const eduRef = useRef(null);
  const expRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(eduRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.25,
        duration: 0.8,
        ease: 'power3.out',
      }).from(
        expRef.current.children,
        {
          opacity: 0,
          y: 30,
          stagger: 0.25,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-center text-[#4C82CE] tracking-wide drop-shadow-lg">
          My Journey
        </h1>
        <hr className="border-[#8bbbff] border-t-4 mb-14 w-[120px] mx-auto mt-4 rounded-md" />

        <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 items-start gap-y-14 md:gap-y-0 gap-x-14">
          {/* Education Section */}
          <div
            ref={eduRef}
            className="flex flex-col gap-y-12 md:w-1/2 bg-gray-800 bg-opacity-40 rounded-xl p-8 shadow-lg"
          >
            <h2 className="flex items-center gap-x-4 text-3xl text-[#4C82CE] font-extrabold tracking-wide">
              <FaUserGraduate className="text-[#67E8F9] text-4xl" />
              Education
            </h2>

            <div className="space-y-3 border-l-4 border-[#67E8F9] pl-6">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">
                Intermediate (Science General)
              </h3>
              <p className="text-lg text-[#a3bffa] italic">
                Govt. Jinnah College <span className="font-mono">(2023 - 2025)</span>
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-[#67E8F9] pl-6">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">
                Matriculation (Science)
              </h3>
              <p className="text-lg text-[#a3bffa] italic">
                Matchless Public Secondary School <span className="font-mono">(2021 - 2023)</span>
              </p>
            </div>
          </div>

          {/* Learning & Experience Section */}
          <div
            ref={expRef}
            className="flex flex-col gap-y-12 md:w-1/2 bg-gray-800 bg-opacity-40 rounded-xl p-8 shadow-lg"
          >
            <h2 className="flex items-center gap-x-4 text-3xl text-[#4C82CE] font-extrabold tracking-wide">
              <BsPersonWorkspace className="text-[#67E8F9] text-4xl" />
              Learning & Experience
            </h2>

            <div className="space-y-3 border-l-4 border-[#67E8F9] pl-6">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">
                MERN Stack Development
              </h3>
              <p className="text-lg text-[#a3bffa] italic">
                SMIT <span className="font-mono">(2023 - Present)</span>
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-[#67E8F9] pl-6">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">
                Digital Marketing & Freelancing
              </h3>
              <p className="text-lg text-[#a3bffa] italic">
                BanoQabil <span className="font-mono">(2023 - 2024)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-gray-700 rounded-sm w-full max-w-[1300px] mx-auto mt-20" />
    </section>
  );
};

export default Learning;
