import React from 'react';
import { CalendarDays, Users, BookOpen, Sparkles } from 'lucide-react';

const icons = [CalendarDays, Users, BookOpen];

const Community: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section id="community" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-4xl mx-auto mb-14" data-scroll>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-600/10 text-crimson-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          <Sparkles size={12} /> {t.communitySection.label}
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
          {t.communitySection.title}
          <span className="text-crimson-600">.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl opacity-65 leading-relaxed">
          {t.communitySection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
        <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/5" data-scroll>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {t.communitySection.stats.map((stat: any) => (
              <div key={stat.label} className="rounded-[1.5rem] bg-white/5 border border-white/10 px-4 py-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-crimson-600">{stat.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] opacity-50 font-black">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-[2rem] border border-crimson-600/20 bg-crimson-600/5 p-6 md:p-8">
            <p className="text-xl md:text-2xl font-black leading-snug">
              Build the product. Teach the market. Grow the network.
            </p>
            <p className="mt-4 opacity-65 leading-relaxed">
              The strongest tech brands do more than sell services. They create rooms, resources, and relationships people want to return to.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-scroll-stagger>
          {t.communitySection.pillars.map((pillar: any, index: number) => {
            const Icon = icons[index] || Users;
            return (
              <div
                key={pillar.title}
                className="glass rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-crimson-600/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-crimson-600/10 text-crimson-600 flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">{pillar.title}</h3>
                <p className="opacity-65 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Community;
