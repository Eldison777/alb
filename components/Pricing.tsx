import React from 'react';
import { Check, Star, ArrowUpRight, Zap } from 'lucide-react';

const Pricing: React.FC<{ t: any }> = ({ t }) => {
  const tiers = [
    {
      name: t.pricing.starter,
      price: "$2,900",
      weeks: "2-4",
      features: ["Single Page App", "Next.js + Tailwind", "SEO Basic", "1 Month Support"],
      cta: t.pricing.cta,
      popular: false
    },
    {
      name: t.pricing.growth,
      price: "$5,500",
      weeks: "4-8",
      features: ["Full SaaS MVP", "Auth + Database", "Stripe Integration", "3 Months Support", "Analytics Setup"],
      cta: t.pricing.cta,
      popular: true
    },
    {
      name: t.pricing.scale,
      price: "$12,000",
      weeks: "8-12",
      features: ["Enterprise Architecture", "Design System", "Multi-tenant logic", "Dedicated DevOps", "Priority Support"],
      cta: t.pricing.cta,
      popular: false
    }
  ];

  return (
    <div className="relative py-24">
      <div className="text-center max-w-3xl mx-auto mb-24" data-scroll>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-600/10 text-crimson-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <Star size={12} fill="currentColor" /> {t.pricing.badge}
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">{t.pricing.title}<span className="text-crimson-600">.</span></h2>
        <p className="text-xl opacity-60 leading-relaxed">
          {t.pricing.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 relative z-10" data-scroll-stagger>
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`group relative glass rounded-[3rem] p-12 border transition-all duration-700 cursor-default ${tier.popular ? 'border-crimson-600/50 scale-105 z-10 shadow-[0_40px_100px_-20px_rgba(220,38,38,0.2)] hover:scale-[1.07]' : 'border-white/5 opacity-90 hover:opacity-100 hover:border-crimson-600/30 hover:scale-[1.02] hover:-translate-y-2'}`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-crimson-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-2xl flex items-center gap-2 animate-bounce">
                <Zap size={10} fill="currentColor" /> {t.pricing.topChoice}
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-2xl font-black mb-2 tracking-tight group-hover:text-crimson-600 transition-colors duration-500">{tier.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-crimson-600">{tier.price}</span>
                <span className="text-sm opacity-40 font-bold uppercase tracking-widest">/ Project</span>
              </div>
            </div>

            <div className="mb-10 p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group-hover:border-crimson-600/20 transition-all duration-500">
              <div>
                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">{t.pricing.timeline}</p>
                <p className="font-black text-lg">{tier.weeks} {t.pricing.weeks}</p>
              </div>
              <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:text-crimson-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" size={24} />
            </div>

            <ul className="space-y-5 mb-12">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-4 text-base font-medium group/feat">
                  <div className="w-5 h-5 rounded-full bg-crimson-600/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/feat:bg-crimson-600 transition-colors">
                    <Check size={12} className="text-crimson-600 group-hover/feat:text-white" strokeWidth={3} />
                  </div>
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`block w-full text-center py-5 rounded-2xl font-black text-lg transition-all duration-500 ${tier.popular ? 'bg-crimson-600 text-white shadow-xl shadow-crimson-600/30 hover:shadow-crimson-600/50 hover:bg-crimson-700' : 'glass hover:bg-white/10 hover:border-crimson-600/20 hover:text-crimson-600'}`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-crimson-600/[0.03] blur-[140px] rounded-full -z-10 animate-pulse-soft pointer-events-none"></div>
    </div>
  );
};

export default Pricing;