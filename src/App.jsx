import React from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ribbon from './components/Ribbon';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Chapters from './components/Chapters';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { marqueeItems } from './data/content';

function App() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-[#b6fe00] text-[#101010]">
      <Preloader />
      <Navbar />

      <main className="relative">
        <Hero />
        <Ribbon
          items={['FULL-STACK', 'REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'GSAP', 'MONGODB', 'SHOPIFY']}
          bg="#013900"
          color="#b6fe00"
          rotate={-2}
        />
        <Manifesto />
        <About />
        <Ribbon
          items={marqueeItems.map((m) => m.toUpperCase())}
          bg="#f7d000"
          color="#101010"
          rotate={1.5}
        />
        <Skills />
        <Services />
        <Chapters />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
