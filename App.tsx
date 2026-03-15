
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoServices from './components/BentoServices';
import AIAutomation from './components/AIAutomation';
import ImpactModel from './components/ImpactModel';
import CaseStudies from './components/CaseStudies';
import Community from './components/Community';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Pricing from './components/Pricing';
import Process from './components/Process';
import Footer from './components/Footer';
import BlogArticle from './components/BlogArticle';

const AdminApp = lazy(() => import('./admin/AdminApp'));

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'sq'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [hash, setHash] = useState(window.location.hash);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
    const savedLang = localStorage.getItem('lang') as 'en' | 'sq';
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
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
    document.documentElement.lang = newLang;
  };

  const t = useMemo(() => translations[lang], [lang]);

  if (pathname.startsWith('/blog/')) {
    return <BlogArticle t={t} lang={lang} />;
  }

  // Admin route: #/admin or #/admin/*
  if (hash.startsWith('#/admin')) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading admin...</div>}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} t={t} />

      <main className="space-y-24 pb-24">
        <Hero t={t} />
        <section id="services" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <BentoServices t={t} />
        </section>

        <AIAutomation t={t} />

        <section id="about" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <ImpactModel t={t} theme={theme} />
        </section>

        <Process t={t} />

        <section id="work" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <CaseStudies t={t} lang={lang} />
        </section>

        <Community t={t} />

        <section id="team" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Team t={t} lang={lang} />
        </section>

        <section id="blog" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Blog t={t} lang={lang} />
        </section>

        <section id="faq" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <FAQ t={t} lang={lang} />
        </section>

        <section id="pricing" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
          <Pricing t={t} />
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
