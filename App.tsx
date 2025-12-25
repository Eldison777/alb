
import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoServices from './components/BentoServices';
import ImpactModel from './components/ImpactModel';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'sq'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
    const savedLang = localStorage.getItem('lang') as 'en' | 'sq';
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'sq' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="relative min-h-screen">
      <Navbar lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} t={t} />
      
      <main className="space-y-24 pb-24">
        <Hero t={t} />
        <section id="services" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <BentoServices t={t} />
        </section>
        
        <section id="impact" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <ImpactModel t={t} theme={theme} />
        </section>

        <section id="work" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <CaseStudies t={t} />
        </section>

        <section id="team" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Team t={t} />
        </section>

        <section id="blog" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Blog t={t} />
        </section>

        <section id="faq" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <FAQ t={t} />
        </section>

        <section id="contact" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Contact t={t} />
        </section>
      </main>

      <Footer t={t} />
    </div>
  );
};

export default App;
