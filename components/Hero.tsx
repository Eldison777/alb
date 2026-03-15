import React from 'react';
import { ArrowRight, Bot, Code2, Users2 } from 'lucide-react';

const cards = [
  {
    icon: Code2,
    eyebrow: 'Software',
    title: 'Digital products and internal tools',
  },
  {
    icon: Bot,
    eyebrow: 'AI Automation',
    title: 'Workflows that remove repetitive friction',
  },
  {
    icon: Users2,
    eyebrow: 'Community',
    title: 'Programs that turn audiences into ecosystems',
  },
];

const Hero: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section id="home" className="relative pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-10 items-start">
          <div className="max-w-4xl">
            <div className="intro-up inline-flex items-center max-w-full px-4 py-2 rounded-full border border-crimson-600/20 bg-crimson-600/[0.06] text-crimson-500 text-[10px] font-black uppercase tracking-[0.28em] mb-6 sm:mb-8">
              <span className="break-words">{t.hero.badge}</span>
            </div>

            <h1 className="intro-up intro-delay-1 text-[2.7rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-black tracking-[-0.05em] leading-[0.94] mb-5 sm:mb-7">
              Build modern software.
              <span className="block text-white/55">Automate the work no one should do by hand.</span>
            </h1>

            <p className="intro-up intro-delay-2 text-base sm:text-xl md:text-2xl text-white/72 max-w-2xl leading-relaxed mb-8 sm:mb-10">
              {t.hero.subheadline}
            </p>

            <div className="intro-up intro-delay-3 flex flex-wrap gap-2.5 mb-8 sm:mb-10">
              {t.hero.trust.map((item: string) => (
                <span
                  key={item}
                  className="px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="intro-up intro-delay-4 flex flex-col sm:flex-row gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <a
                href="#contact"
                className="group h-14 sm:h-16 px-7 rounded-[1.25rem] bg-crimson-600 text-white font-black text-lg inline-flex items-center justify-center gap-3 shadow-[0_16px_50px_-20px_rgba(220,38,38,0.8)] hover:bg-crimson-700 transition-all hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="h-14 sm:h-16 px-7 rounded-[1.25rem] border border-white/10 bg-white/[0.04] font-black text-lg inline-flex items-center justify-center text-white/92 hover:bg-white/[0.08] transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="intro-up intro-delay-4 grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {[
                { label: t.hero.metric1, value: '2-10' },
                { label: t.hero.metric2, value: '80%' },
                { label: t.hero.metric3, value: '<12h' },
                { label: t.hero.metric4, value: 'Year 1' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-5 sm:py-5">
                  <div className="text-2xl sm:text-3xl font-black text-crimson-500">{metric.value}</div>
                  <div className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/45 font-black leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`intro-up rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6 transition-all duration-300 hover:border-crimson-600/30 hover:bg-white/[0.06] ${
                    index === 0 ? 'xl:translate-y-6' : index === 2 ? 'xl:-translate-y-6' : ''
                  }`}
                  style={{ animationDelay: `${0.15 + index * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-crimson-600/12 text-crimson-500 flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-black mb-3">{card.eyebrow}</div>
                  <h3 className="text-2xl sm:text-[1.9rem] font-black tracking-[-0.04em] leading-tight">{card.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute top-24 right-[8%] w-44 h-44 bg-crimson-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-52 h-52 bg-crimson-600/8 blur-[110px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Hero;
