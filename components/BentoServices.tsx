import React from 'react';
import { Database, Layout, ShieldCheck, Code, Search, RefreshCw, Layers } from 'lucide-react';

const BentoServices: React.FC<{ t: any }> = ({ t }) => {
  const services = [
    { 
      key: 'saas', 
      Icon: Database, 
      title: t.services.saas.title, 
      desc: t.services.saas.desc, 
      bullets: t.services.saas.bullets,
      size: 'md:col-span-4 lg:col-span-4' 
    },
    { 
      key: 'web', 
      Icon: Layout, 
      title: t.services.web.title, 
      desc: t.services.web.desc, 
      bullets: t.services.web.bullets,
      size: 'md:col-span-2 lg:col-span-2' 
    },
    { 
      key: 'ui', 
      Icon: Code, 
      title: t.services.ui.title, 
      desc: t.services.ui.desc, 
      bullets: t.services.ui.bullets,
      size: 'md:col-span-2 lg:col-span-2' 
    },
    { 
      key: 'devops', 
      Icon: ShieldCheck, 
      title: t.services.devops.title, 
      desc: t.services.devops.desc, 
      bullets: t.services.devops.bullets,
      size: 'md:col-span-4 lg:col-span-4' 
    },
    { 
      key: 'seo', 
      Icon: Search, 
      title: t.services.seo.title, 
      desc: t.services.seo.desc, 
      bullets: t.services.seo.bullets,
      size: 'md:col-span-3 lg:col-span-3' 
    },
    { 
      key: 'growth', 
      Icon: RefreshCw, 
      title: t.services.growth.title, 
      desc: t.services.growth.desc, 
      bullets: t.services.growth.bullets,
      size: 'md:col-span-3 lg:col-span-3' 
    }
  ];

  return (
    <div className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8" data-scroll>
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-crimson-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">Engineering Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Modern Stack<span className="text-crimson-600">.</span><br/>Extreme Scalability<span className="text-crimson-600">.</span>
          </h2>
          <p className="text-xl opacity-60 leading-relaxed">
            We don't just build websites; we architect software ecosystems that grow with your business goals.
          </p>
        </div>
        <div className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-crimson-600/30 transition-all cursor-default hover:scale-105">
          <div className="w-14 h-14 bg-crimson-600 rounded-2xl flex items-center justify-center text-white group-hover:rotate-[360deg] transition-transform duration-1000">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-2xl font-black">2025 Ready</p>
            <p className="text-xs opacity-50 uppercase font-black tracking-widest">Tech standard</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6" data-scroll-stagger>
        {services.map((s) => (
          <div 
            key={s.key} 
            className={`${s.size} glass rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-between group hover:border-crimson-600/40 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden relative`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-crimson-600/10 flex items-center justify-center mb-10 group-hover:bg-crimson-600 group-hover:text-white transition-all duration-700">
                <s.Icon className="text-crimson-600 group-hover:text-white group-hover:scale-110 transition-all duration-500" size={32} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-crimson-600 transition-colors duration-500">{s.title}</h3>
              <p className="opacity-60 mb-10 leading-relaxed text-base lg:text-lg group-hover:opacity-90 transition-opacity">
                {s.desc}
              </p>
            </div>
            <div className="space-y-4 pt-10 border-t border-white/5 group-hover:border-crimson-600/20 transition-colors">
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