import React, { useEffect, useRef } from 'react';
import { Code2, Settings, ShoppingBag, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    icon: Code2,
    title: 'Full-Stack Web Apps',
    description:
      'Custom end-to-end web applications engineered to scale. Building performant client-side and server-side systems with secure architectures.',
    tech: ['React.js / Next.js', 'Node.js / Express', 'REST APIs', 'PostgreSQL / MongoDB'],
    bullets: [
      'High-performance SPA & SSR web apps',
      'Scalable server logic & API integrations',
      'Optimized query database designs',
      'Responsive, modern tailwind designs'
    ]
  },
  {
    icon: Settings,
    title: 'Custom ERP & Portals',
    description:
      'Tailored internal management systems to optimize operational workflows, track data pipelines, generate automated invoicing, and control roles.',
    tech: ['Invoicing & Reports', 'RBAC Security', 'Admin Dashboards', 'Workflow Automation'],
    bullets: [
      'Interactive analytical admin portals',
      'Automated PDF generating engines',
      'Exam & student portal modules',
      'Interactive performance dashboards'
    ]
  },
  {
    icon: ShoppingBag,
    title: 'Shopify E-Commerce',
    description:
      'Conversion-optimized online stores. Offering theme modifications, custom templates, custom app configurations, and search engine optimization.',
    tech: ['Liquid Customization', 'Conversion Auditing', 'Payment API Setup', 'Page-Speed Tuning'],
    bullets: [
      'Liquid template custom updates',
      'Headless commerce solutions',
      'Cart conversions optimization',
      'Seamless checkout flow setups'
    ]
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fast staggered entrance for service cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 bg-[#060b13] overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Core Solutions ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Services I Offer
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-[#09111e]/55 border border-[#10b981]/15 hover:border-[#10b981]/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] tech-corners flex flex-col justify-between"
              >
                <div>
                  {/* Icon Module */}
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981] mb-6 group-hover:scale-110 group-hover:bg-[#10b981]/20 transition-all duration-300">
                    <IconComponent size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-orbitron font-bold text-white mb-3 tracking-wide group-hover:text-[#10b981] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 font-poppins leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Lists */}
                  <ul className="space-y-2.5 mb-8">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-x-2 text-[11px] sm:text-xs text-gray-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_4px_#10b981]"></span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Footer in Service Box */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#10b981]/20 bg-emerald-950/20 text-[#10b981]/90 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
