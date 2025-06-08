import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Learning from './components/Learning';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

        
      <main className="flex-grow">
        <Hero />
        <About />
        <Learning />
        <Skills />
        <Projects />
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;