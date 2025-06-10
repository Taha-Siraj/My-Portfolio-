import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(leftRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      }).from(
        rightRef.current,
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
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#334155] overflow-x-hidden"
    >
      <div className="container mx-auto px-6 lg:px-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4C83CF] mb-3">
          Contact Me
        </h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[120px] mx-auto rounded-md" />

        <div className="bg-[#1E293B] flex flex-col md:flex-row justify-between items-start md:py-10 rounded-xl border border-[#475569] w-full gap-10">
          {/* Left Side */}
          <div
            ref={leftRef}
            className="flex flex-col gap-y-6 py-10 px-8 md:px-16 md:w-1/2"
          >
            <h2 className="text-3xl font-black text-[#4C83CF] mb-4">Let's Connect!</h2>
            <p className="text-lg text-gray-400 max-w-md mx-auto md:mx-0">
              Have a project, an idea, or just want to say hi? My inbox is always open.
              Whether you have a question or just want to connect, I'll get back to you! 🚀
            </p>

            <div className="flex flex-col gap-y-3 mt-6 max-w-md mx-auto md:mx-0">
              <Link
                to="mailto:tahasiraj610@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <MdEmail className="text-3xl text-cyan-400" />
                <span className="break-all">tahasiraj610@gmail.com</span>
              </Link>
              <div className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <IoLocationSharp className="text-cyan-400 text-3xl" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-start items-center gap-8 mt-8 text-[#9CA3AF]">
              <a
                href="https://github.com/Taha-Siraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-4xl hover:text-[#06B6D4] hover:scale-110 transition-transform duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/taha-siraj-2331952a8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-4xl hover:text-[#06B6D4] hover:scale-110 transition-transform duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:tahasiraj16@gmail.com"
                aria-label="Email"
                className="text-4xl hover:text-[#06B6D4] hover:scale-110 transition-transform duration-300"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            ref={rightRef}
            className="px-8 md:px-16 py-8 md:w-1/2 flex flex-col gap-5 max-w-lg mx-auto md:mx-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400 transition-colors duration-300"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400 transition-colors duration-300"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400 transition-colors duration-300"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400 transition-colors duration-300 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-transparent border-2 border-[#06B6D4] text-black hover:text-[#06B6D4] rounded-full px-6 py-3 font-semibold transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
