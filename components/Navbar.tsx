import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Menu, Moon, Sun, X } from 'lucide-react';

interface NavbarProps {
  lang: string;
  toggleLang: () => void;
  theme: string;
  toggleTheme: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang, theme, toggleTheme, t }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems = [
    { label: t.nav.services, href: '#services', index: '01' },
    { label: t.nav.ai, href: '#ai', index: '02' },
    { label: t.nav.work, href: '#work', index: '03' },
    { label: t.nav.community, href: '#community', index: '04' },
    { label: t.nav.team, href: '#team', index: '05' },
    { label: t.nav.blog, href: '#blog', index: '06' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 sm:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-[1.5rem] border dark:border-white/10 border-black/10 px-4 sm:px-5 py-3 flex items-center justify-between">
            <a href="#home" className="flex items-center shrink-0">
              <img src="/albshift_logo.svg" alt="AlbShift" className="h-8 sm:h-9 w-auto object-contain" />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-bold tracking-tight opacity-70 hover:opacity-100 hover:text-crimson-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleLang}
                className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Language"
              >
                <Globe size={17} className="opacity-75" />
              </button>
              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-700" />}
              </button>
              <a
                href="#contact"
                className="hidden md:inline-flex items-center justify-center px-5 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white text-sm font-black transition-colors"
              >
                {t.nav.cta}
              </a>
              <button
                className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-[130] transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#090909]/96 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 px-5 pt-5 pb-8 flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <img src="/albshift_logo.svg" alt="AlbShift" className="h-9 w-auto object-contain mb-3" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-crimson-600 font-black">Build. Automate. Gather.</p>
            </div>
            <button
              className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-3 mb-8">
            <button
              onClick={toggleLang}
              className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-left font-black tracking-tight"
            >
              {lang === 'en' ? 'English' : 'Shqip'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
          </div>

          <div className="space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-5"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-black mb-2">{item.index}</div>
                  <div className="text-[1.85rem] leading-none font-black tracking-[-0.04em]">{item.label}</div>
                </div>
                <ArrowRight size={20} className="text-white/30 group-hover:text-crimson-600 transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="rounded-[1.8rem] border border-crimson-600/20 bg-crimson-600/8 p-5 mb-4">
              <p className="text-lg font-black tracking-tight mb-2">For ambitious teams building products and momentum.</p>
              <p className="text-sm text-white/60 leading-relaxed">
                Software systems, AI automation, and community experiences designed to make your brand more useful and more visible.
              </p>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="h-14 rounded-[1.4rem] bg-crimson-600 text-white flex items-center justify-center text-base font-black"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
