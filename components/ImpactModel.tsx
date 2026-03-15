import React from 'react';

const ImpactModel: React.FC<{ t: any; theme: 'dark' | 'light' }> = ({ t, theme }) => {
  const secondaryStroke = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-scroll>
      <div className="glass rounded-[3rem] p-12 border-white/5 relative overflow-hidden flex items-center justify-center min-h-[360px] md:min-h-[420px]">
        <div className="relative z-10 w-full max-w-[320px] aspect-square">
          <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
            <circle cx="100" cy="100" r="72" fill="none" stroke={secondaryStroke} strokeWidth="20" />
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke="#dc2626"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="452"
              strokeDashoffset="90"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-crimson-600">80/20</span>
            <span className="text-[10px] uppercase font-bold opacity-50 tracking-widest">{t.impact.efficiency}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-600/10 blur-[80px] rounded-full" />
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-[1px] bg-crimson-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.impact.label}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
          {t.impact.title}
          <span className="text-crimson-600">.</span>
        </h2>
        <p className="text-xl opacity-60 leading-relaxed">{t.impact.description}</p>

        <div className="p-8 rounded-3xl bg-crimson-600/5 border border-crimson-600/20">
          <p className="font-bold text-lg text-crimson-600 leading-relaxed italic">"{t.impact.pledge}"</p>
          <div className="mt-6 pt-6 border-t border-crimson-600/10 flex items-center justify-between gap-4">
            <span className="text-xs uppercase font-black opacity-40 tracking-widest">{t.impact.transparency}</span>
            <div className="px-4 py-2 bg-crimson-600 text-white text-xs font-black rounded-full shadow-lg shadow-crimson-600/20">
              {t.impact.metrics}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactModel;
