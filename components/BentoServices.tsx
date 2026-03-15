import React from 'react';
import { Bot, LayoutDashboard, PencilRuler, Rocket, PlugZap, Users, Layers } from 'lucide-react';

const BentoServices: React.FC<{ t: any }> = ({ t }) => {
  const services = [
    { 
      key: 'software',
      Icon: LayoutDashboard,
      title: t.services.software.title,
      desc: t.services.software.desc,
      bullets: t.services.software.bullets,
      size: 'md:col-span-3 lg:col-span-3'
    },
    { 
      key: 'automation',
      Icon: Bot,
      title: t.services.automation.title,
      desc: t.services.automation.desc,
      bullets: t.services.automation.bullets,
      size: 'md:col-span-3 lg:col-span-3'
    },
    { 
      key: 'mvp',
      Icon: Rocket,
      title: t.services.mvp.title,
      desc: t.services.mvp.desc,
      bullets: t.services.mvp.bullets,
      size: 'md:col-span-2 lg:col-span-2'
    },
    { 
      key: 'design',
      Icon: PencilRuler,
      title: t.services.design.title,
      desc: t.services.design.desc,
      bullets: t.services.design.bullets,
      size: 'md:col-span-2 lg:col-span-2'
    },
    { 
      key: 'integration',
      Icon: PlugZap,
      title: t.services.integration.title,
      desc: t.services.integration.desc,
      bullets: t.services.integration.bullets,
      size: 'md:col-span-3 lg:col-span-3'
    },
    { 
      key: 'community',
      Icon: Users,
      title: t.services.community.title,
      desc: t.services.community.desc,
      bullets: t.services.community.bullets,
      size: 'md:col-span-3 lg:col-span-3'
    }
  ];

  return (
    <div className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-20 gap-8" data-scroll>
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-crimson-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.bentoServices.label}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {t.bentoServices.heading1}<span className="text-crimson-600">.</span><br/>{t.bentoServices.heading2}<span className="text-crimson-600">.</span>
          </h2>
          <p className="text-xl opacity-60 leading-relaxed">
            {t.bentoServices.desc}
          </p>
        </div>
        <div className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-crimson-600/30 transition-all cursor-default hover:scale-105">
          <div className="w-14 h-14 bg-crimson-600 rounded-2xl flex items-center justify-center text-white group-hover:rotate-[360deg] transition-transform duration-1000">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-2xl font-black">{t.bentoServices.readyYear}</p>
            <p className="text-xs opacity-50 uppercase font-black tracking-widest">{t.bentoServices.techStandard}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6" data-scroll-stagger>
        {services.map((s) => (
          <div 
            key={s.key} 
            className={`${s.size} glass rounded-[2.5rem] p-6 sm:p-8 lg:p-10 border border-white/5 flex flex-col justify-between group hover:border-crimson-600/40 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden relative`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-crimson-600/10 flex items-center justify-center mb-6 sm:mb-10 group-hover:bg-crimson-600 group-hover:text-white transition-all duration-700">
                <s.Icon className="text-crimson-600 group-hover:text-white group-hover:scale-110 transition-all duration-500" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 tracking-tight group-hover:text-crimson-600 transition-colors duration-500">{s.title}</h3>
              <p className="opacity-60 mb-6 sm:mb-10 leading-relaxed text-base lg:text-lg group-hover:opacity-90 transition-opacity">
                {s.desc}
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-10 border-t border-white/5 group-hover:border-crimson-600/20 transition-colors">
              {s.bullets.map((b: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-crimson-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoServices;
