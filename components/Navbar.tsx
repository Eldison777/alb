
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: string;
  toggleLang: () => void;
  theme: string;
  toggleTheme: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang, theme, toggleTheme, t }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setMobileOpen(false);
      setIsAnimatingOut(false);
    }, 400); // Duration matches animate-reveal-down
  };

  const navItems = [
    { name: t.nav.services, href: "#services" },
    { name: t.process.title, href: "#process" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.team, href: "#team" },
    { name: t.pricing.title, href: "#pricing" },
    { name: t.nav.blog, href: "#blog" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-2 border dark:border-white/10 border-black/10 transition-all duration-700 ${scrolled ? 'shadow-2xl dark:bg-obsidian/90 bg-white/90 py-1' : 'shadow-xl'}`}>
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 bg-crimson-600 rounded-lg flex items-center justify-center font-black text-white text-lg transition-transform group-hover:scale-105">
              A
            </div>
            <span className="font-extrabold tracking-tighter text-xl dark:text-white text-slate-900 transition-colors">
              AlbShift<span className="text-crimson-600">.</span>
            </span>
          </a>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-bold opacity-60 hover:opacity-100 dark:text-white text-slate-900 transition-all tracking-tight hover:text-crimson-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLang}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2 group"
                aria-label="Toggle Language"
              >
                <Globe size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase opacity-60 group-hover:opacity-100">{lang}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
              </button>
            </div>

            <a
              href="#contact"
              className="hidden sm:block px-6 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-[1rem] text-sm font-black transition-all shadow-lg shadow-crimson-600/20 active:scale-95 whitespace-nowrap"
            >
              {t.nav.cta}
            </a>

            <button
              className="md:hidden p-2 opacity-60 hover:opacity-100"
              onClick={() => mobileOpen ? closeMobileMenu() : setMobileOpen(true)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 px-6 pt-3 ${isAnimatingOut ? 'animate-reveal-down' : 'animate-reveal-up'}`}>
          <div className="glass rounded-[2rem] border dark:border-white/10 border-black/10 shadow-2xl flex flex-col p-8 gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xl font-black tracking-tight border-b dark:border-white/5 border-black/5 pb-4 hover:text-crimson-600 transition-colors"
                onClick={closeMobileMenu}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="w-full text-center px-6 py-4 bg-crimson-600 text-white rounded-[1rem] font-black text-lg shadow-2xl shadow-crimson-600/30"
              onClick={closeMobileMenu}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
