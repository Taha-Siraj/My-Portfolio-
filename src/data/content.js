import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiShopify,
  SiVercel,
  SiMui,
  SiExpress,
  SiGreensock,
  SiReactquery,
} from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';

export const profile = {
  name: 'Taha Siraj',
  firstName: 'TAHA',
  lastName: 'SIRAJ',
  roles: [
    'MERN Stack Developer',
    'Full Stack Engineer',
    'Shopify Developer',
    'WebGL & Motion Craftsman',
    'UI/UX Enthusiast',
  ],
  tagline:
    'I build immersive, high-performance web experiences — from full-stack MERN applications to real-time WebGL & 3D interfaces that feel alive.',
  location: 'Karachi, Pakistan',
  email: 'tahasiraj610@gmail.com',
  whatsapp: '923083067081',
  github: 'https://github.com/Taha-Siraj',
  linkedin: 'https://www.linkedin.com/in/taha-siraj-2331952a8/',
  cv: '/TahaSiraj-cv.pdf',
  avatar: '/user-profile.jpg',
  stats: [
    { value: 74, suffix: '+', label: 'GitHub Repos' },
    { value: 16, suffix: '+', label: 'Technologies' },
    { value: 25, suffix: '+', label: 'Projects Built' },
    { value: 2, suffix: '+', label: 'Years Experience' },
  ],
};

export const socials = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp}`, icon: FaWhatsapp },
  { label: 'Email', href: `mailto:${profile.email}`, icon: MdEmail },
];

export const skills = [
  { name: 'JavaScript (ES6+)', level: 92, icon: FaJs, color: '#f7df1e' },
  { name: 'TypeScript', level: 85, icon: SiTypescript, color: '#3178c6' },
  { name: 'React.js', level: 94, icon: FaReact, color: '#61dafb' },
  { name: 'Next.js', level: 88, icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', level: 90, icon: FaNodeJs, color: '#68a063' },
  { name: 'Express.js', level: 86, icon: SiExpress, color: '#cccccc' },
  { name: 'Tailwind CSS', level: 93, icon: SiTailwindcss, color: '#38bdf8' },
  { name: 'MongoDB', level: 88, icon: SiMongodb, color: '#4db33d' },
  { name: 'PostgreSQL', level: 84, icon: SiPostgresql, color: '#5b9bd5' },
  { name: 'Redis', level: 78, icon: SiRedis, color: '#d63c2f' },
  { name: 'GSAP / Motion', level: 90, icon: SiGreensock, color: '#88ce02' },
  { name: 'React Query', level: 85, icon: SiReactquery, color: '#ff4154' },
  { name: 'Shopify', level: 87, icon: SiShopify, color: '#96bf48' },
  { name: 'Git & GitHub', level: 90, icon: FaGitAlt, color: '#f05032' },
  { name: 'Vercel', level: 88, icon: SiVercel, color: '#ffffff' },
  { name: 'Material UI', level: 82, icon: SiMui, color: '#007fff' },
];

export const marqueeItems = [
  'React.js',
  'Next.js',
  'Node.js',
  'Three.js',
  'WebGL',
  'TypeScript',
  'GSAP',
  'MongoDB',
  'PostgreSQL',
  'Shopify',
  'Tailwind CSS',
  'Express.js',
];

export const experience = [
  {
    title: 'Full Stack Engineer & Shopify Developer',
    company: 'Next Revolution Tech (NRT)',
    location: 'Karachi, Pakistan',
    period: 'Dec 2025 — Present',
    desc: 'Develop and deploy scalable full-stack applications with React.js / Next.js / Node.js, build customized Shopify stores, and led the development of the WAKISSHA School Management System.',
    tech: ['React.js', 'Next.js', 'Node.js', 'Shopify', 'PostgreSQL'],
  },
  {
    title: 'Web Developer',
    company: 'Codezyratech',
    location: 'Karachi, Pakistan',
    period: 'Sep 2024 — Sep 2025',
    desc: 'Developed responsive frontend applications with React.js / Next.js and optimized system performance using code-splitting and lazy-loading.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
];

export const projects = [
  {
    title: 'WAKISSHA School Management System',
    description:
      'Full-stack school management platform for 500+ students — examination management, fee invoicing, payment tracking, reporting and role-based access control.',
    tech: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'JWT'],
    liveLink: 'https://product-post-allapi.vercel.app/',
    githubLink: 'https://github.com/Taha-Siraj',
    image: '/wakissha.png',
    featured: true,
  },
  {
    title: 'Product Manager App',
    description:
      'Complete inventory management system with full CRUD operations, PostgreSQL integration and a responsive layout built to optimize operational workflows.',
    tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    liveLink: 'https://product-post-allapi.vercel.app/',
    githubLink: 'https://github.com/Taha-Siraj/product_post-allapi',
    image: '/crud.png',
  },
  {
    title: 'TVS Emerald Auralis — Landing Page',
    description:
      'High-converting real estate landing page integrated with WhatsApp, Email and Google Sheets for real-time lead capture, automated reporting and quick tracking.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    liveLink: 'https://tvs-emerald-auralis-alpha.vercel.app/',
    githubLink: 'https://github.com/Taha-Siraj/TVS-EMERALD-AURALIS-',
    image: '/tvs-emerald.png',
  },
  {
    title: 'OpenCodeShare',
    description:
      'Instant code & file sharing platform — zero signup, 50MB direct client-to-Supabase uploads bypassing Vercel API limits, with auto self-destructing shares.',
    tech: ['React.js', 'Tailwind CSS', 'Supabase'],
    liveLink: 'https://opencodeshare.vercel.app/',
    githubLink: 'https://github.com/Taha-Siraj/OpenCodeShare',
    image: '/opencodeshare.png',
  },
  {
    title: 'Facebook Clone',
    description:
      'Pixel-perfect, fully responsive social media interface built with React.js and Tailwind CSS — active feed timelines, profile widgets and GSAP-powered elements.',
    tech: ['React.js', 'Tailwind CSS', 'GSAP'],
    liveLink: 'https://facebook-clone-git-main-taha-sirajs-projects.vercel.app/',
    githubLink: 'https://github.com/Taha-Siraj/Facebook-Clone',
    image: '/facebook.png',
  },
  {
    title: 'Creative Animation Website',
    description:
      'Interactive, animation-focused digital portal with advanced GSAP scroll-triggered effects, custom cursor trails and responsive design systems.',
    tech: ['React.js', 'GSAP'],
    liveLink: 'https://animated-webistes.netlify.app/',
    githubLink: 'https://github.com/Taha-Siraj/Sidcup-Animated-websites-',
    image: '/animated.png',
  },
];

export const services = [
  {
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end MERN applications — React/Next.js frontends wired to Node.js APIs with MongoDB or PostgreSQL, auth, and clean architecture.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Shopify Development',
    desc: 'Custom Shopify themes and store builds — product pages, checkout flows and integrations tuned for conversion.',
    tags: ['Shopify', 'Liquid', 'CRO'],
  },
  {
    title: 'WebGL & 3D Experiences',
    desc: 'Real-time 3D scenes, shaders and scroll-driven motion with Three.js — portfolios and landing pages that feel alive.',
    tags: ['Three.js', 'GLSL', 'GSAP'],
  },
  {
    title: 'REST API Development',
    desc: 'Secure, documented REST APIs with Express — JWT auth, validation, rate-limiting and production-ready error handling.',
    tags: ['Express', 'JWT', 'PostgreSQL'],
  },
  {
    title: 'UI/UX & Motion Design',
    desc: 'Interfaces with intent — responsive layouts, micro-interactions and scroll choreography that guide the eye.',
    tags: ['Tailwind', 'Figma', 'GSAP'],
  },
  {
    title: 'Performance & SEO',
    desc: 'Code-splitting, lazy-loading, image optimization and semantic markup — fast loads and search-friendly structure.',
    tags: ['Vite', 'Next.js', 'Lighthouse'],
  },
];

export const education = [
  {
    title: 'MERN Stack Development Certification',
    institution: 'Saylani Mass IT Training (SMIT)',
    period: '2024 — 2025',
    desc: 'Intensive full-stack development program — React.js, Node.js, Express, MongoDB and modern web APIs.',
  },
  {
    title: 'Intermediate (Computer Science)',
    institution: 'Govt. Jinnah College, Karachi',
    period: '2023 — 2025',
    desc: 'Core computer systems, logical computing and sciences at intermediate level.',
  },
  {
    title: 'Matriculation (Science)',
    institution: 'Matchless Public Secondary School',
    period: '2021 — 2023',
    desc: 'Secondary education with a science curriculum — foundational logic and problem solving.',
  },
];

export const contactInfo = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: MdEmail },
  {
    label: 'WhatsApp',
    value: '+92 308 3067081',
    href: `https://wa.me/${profile.whatsapp}`,
    icon: FaWhatsapp,
  },
  { label: 'Location', value: profile.location, href: null, icon: IoLocationSharp },
];
