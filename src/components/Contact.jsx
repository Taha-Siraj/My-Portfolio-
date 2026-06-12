import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const subject = e.target.elements.subject.value;
    const message = e.target.elements.message.value;

    const waText = encodeURIComponent(
      `Hello Taha,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`
    );
    const waUrl = `https://wa.me/923083067081?text=${waText}`;
    
    window.open(waUrl, '_blank');
  };

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
      className="relative py-24 bg-[#060b13] overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-20 z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Transmission Node ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Contact Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        <div className="bg-slate-950/60 p-6 md:p-12 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-stretch w-full gap-12 tech-corners shadow-2xl">
          
          {/* Left Side - Communication Logs */}
          <div
            ref={leftRef}
            className="flex flex-col justify-between md:w-1/2 gap-8"
          >
            <div>
              <div className="text-[10px] font-mono text-[#10b981] mb-2 tracking-widest">// COMMS_STATUS: CONNECTED</div>
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-4">Let's Connect!</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed font-poppins max-w-md">
                Have a project, an idea, or just want to discuss some tech? My terminal is always listening. 
                Submit your metadata packets, and I will establish a link. 🚀
              </p>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <a
                href="mailto:tahasiraj610@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-[#10b981] transition-colors duration-300 group"
              >
                <div className="p-2 bg-slate-900 border border-slate-800 rounded group-hover:border-[#10b981]/40">
                  <MdEmail className="text-xl text-[#10b981]" />
                </div>
                <span className="break-all text-xs">tahasiraj610@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-3 text-gray-400">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <IoLocationSharp className="text-[#10b981] text-xl" />
                </div>
                <span className="text-xs">Karachi, Pakistan // UTC+5</span>
              </div>
            </div>

            {/* Social terminal icons */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-800/80">
              <a
                href="https://github.com/Taha-Siraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 bg-slate-900 border border-slate-800 hover:border-[#10b981]/40 text-gray-400 hover:text-white rounded-lg transition-all duration-300 text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/taha-siraj-2331952a8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 bg-slate-900 border border-slate-800 hover:border-[#10b981]/40 text-gray-400 hover:text-white rounded-lg transition-all duration-300 text-xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:tahasiraj16@gmail.com"
                aria-label="Email"
                className="p-3 bg-slate-900 border border-slate-800 hover:border-[#10b981]/40 text-gray-400 hover:text-white rounded-lg transition-all duration-300 text-xl"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* Right Side - Packet Transmission Form */}
          <form
            ref={rightRef}
            className="md:w-1/2 flex flex-col gap-4 font-mono"
            onSubmit={handleSubmit}
          >
            <div className="text-[10px] text-[#10b981] uppercase tracking-widest mb-1">// Transmission Stream</div>
            
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-xs text-[#10b981]">&gt;</span>
              <input
                type="text"
                name="name"
                placeholder="USER_NAME"
                className="py-3 px-8 w-full bg-slate-900/40 text-white placeholder-slate-600 outline-none border border-slate-800 focus:border-[#10b981]/50 rounded transition-colors text-xs"
                required
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-xs text-[#10b981]">&gt;</span>
              <input
                type="email"
                name="email"
                placeholder="USER_EMAIL"
                className="py-3 px-8 w-full bg-slate-900/40 text-white placeholder-slate-600 outline-none border border-slate-800 focus:border-[#10b981]/50 rounded transition-colors text-xs"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-3.5 text-xs text-[#10b981]">&gt;</span>
              <input
                type="text"
                name="subject"
                placeholder="PACKET_SUBJECT"
                className="py-3 px-8 w-full bg-slate-900/40 text-white placeholder-slate-600 outline-none border border-slate-800 focus:border-[#10b981]/50 rounded transition-colors text-xs"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-4 text-xs text-[#10b981]">&gt;</span>
              <textarea
                name="message"
                placeholder="MESSAGE_BODY"
                rows={4}
                className="py-3 px-8 w-full bg-slate-900/40 text-white placeholder-slate-600 outline-none border border-slate-800 focus:border-[#10b981]/50 rounded transition-colors text-xs resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-2 font-orbitron font-semibold tracking-widest text-xs uppercase px-6 py-3.5 rounded bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:bg-[#10b981] hover:text-gray-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 w-full text-center tech-corners cursor-pointer"
            >
              Transmit Packet
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
