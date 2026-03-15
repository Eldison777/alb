import React from 'react';
import { Bot, Workflow, ShieldCheck, ArrowRight } from 'lucide-react';

const icons = [Workflow, Bot, ShieldCheck];

const AIAutomation: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section id="ai" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/5 relative overflow-hidden" data-scroll>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-crimson-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.automation.label}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] max-w-3xl">
              {t.automation.title}
              <span className="text-crimson-600">.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl opacity-70 max-w-2xl leading-relaxed">
              {t.automation.subtitle}
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.automation.checklist.map((item: string) => (
                <div key={item} className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4" data-scroll-stagger>
          {t.automation.cards.map((card: any, index: number) => {
            const Icon = icons[index] || Bot;
            return (
              <div
                key={card.title}
                className="glass rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-crimson-600/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-crimson-600/10 text-crimson-600 flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3">{card.title}</h3>
                <p className="opacity-65 leading-relaxed mb-6">{card.desc}</p>
                <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-crimson-600">
                  Workflow ready <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIAutomation;
