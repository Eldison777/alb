import React, { useRef } from 'react';
import { Zap, ArrowRight, Play } from 'lucide-react';

const Hero: React.FC<{ t: any }> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" ref={containerRef} className="relative pt-40 lg:pt-64 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border dark:border-white/10 border-black/10 glass text-crimson-600 text-[10px] font-black uppercase tracking-[0.25em] mb-12 animate-reveal-up">
          <Zap size={14} className="animate-pulse" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Dynamic Headline - Simplified to prevent jitter */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12 max-w-6xl animate-reveal-up">
          {t.hero.headline.split(' ').map((word: string, i: number) => {
            const cleanWord = word.toLowerCase().replace(/[.,!]/g, '');
            const isAccent = cleanWord === 'saas' || cleanWord === 'velocity' || cleanWord === 'produkte' || cleanWord === 'shpejtësi';
            return (
              <span key={i} className="inline-block mr-4 md:mr-6 last:mr-0">
                <span className={isAccent ? "text-crimson-600 italic font-black" : "dark:text-white text-slate-950 transition-colors"}>
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Subheadline with simple fade-in */}
        <p className="text-xl md:text-2xl opacity-60 dark:text-white text-slate-900 max-w-2xl mb-16 leading-relaxed font-medium animate-reveal-up" style={{ animationDelay: '0.2s' }}>
          {t.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 mb-36 animate-reveal-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#contact"
            className="group px-10 py-5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-2xl font-black text-xl flex items-center gap-3 transition-all shadow-2xl shadow-crimson-600/20 active:scale-95"
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#work"
            className="group px-10 py-5 glass dark:hover:bg-white/5 hover:bg-black/5 rounded-2xl font-black text-xl flex items-center gap-4 transition-all active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-crimson-600/20 flex items-center justify-center text-crimson-600">
              <Play size={16} fill="currentColor" />
            </div>
            <span className="dark:text-white text-slate-900 transition-colors">{t.hero.ctaSecondary}</span>
          </a>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl border-t dark:border-white/5 border-black/5 pt-20 animate-reveal-up" style={{ animationDelay: '0.6s' }}>
          {[
            { label: t.hero.metric1, val: "99/100" },
            { label: t.hero.metric2, val: "99.9%" },
            { label: t.hero.metric3, val: "8 Wks" },
            { label: "Client NPS", val: "98/100" }
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center group">
              <span className="text-4xl lg:text-6xl font-black text-crimson-600 mb-3 group-hover:text-crimson-500 transition-colors">
                {m.val}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30 dark:text-white text-slate-900 transition-colors">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-crimson-600/[0.03] blur-[150px] rounded-full animate-pulse-soft pointer-events-none"></div>
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-crimson-600/[0.02] blur-[150px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Hero;