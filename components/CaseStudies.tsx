import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const FALLBACK_CASES = [
  {
    id: 1,
    title_en: 'Operations Portal for a Field Services Team',
    title_sq: 'Portal operacionesh per nje ekip field services',
    client_en: 'ServiceFlow',
    client_sq: 'ServiceFlow',
    result_en: 'Cut manual coordination by 65%',
    result_sq: 'Ulja e koordinimit manual me 65%',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title_en: 'AI Lead Intake and Qualification System',
    title_sq: 'Sistem AI per lead intake dhe qualification',
    client_en: 'Growth Partner',
    client_sq: 'Growth Partner',
    result_en: 'Faster lead response in under 5 minutes',
    result_sq: 'Pergjigje me e shpejte per lead-et nen 5 minuta',
    tags: ['AI Automation', 'CRM', 'Workflows'],
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title_en: 'Member Platform for a Technology Community',
    title_sq: 'Platforme anetaresh per nje komunitet teknologjik',
    client_en: 'Community Lab',
    client_sq: 'Community Lab',
    result_en: 'Unified events, content, and member journeys',
    result_sq: 'Evente, content, dhe member journeys ne nje vend',
    tags: ['Platform', 'Events', 'Content'],
    image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    title_en: 'Internal Dashboard for Multi-Team Reporting',
    title_sq: 'Dashboard i brendshem per reporting multi-team',
    client_en: 'OpsScale',
    client_sq: 'OpsScale',
    result_en: 'Reporting time reduced from days to hours',
    result_sq: 'Koha e reporting zbriti nga dite ne ore',
    tags: ['Dashboards', 'APIs', 'Automation'],
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  },
];

const CaseStudies: React.FC<{ t: any; lang?: 'en' | 'sq' }> = ({ t, lang = 'en' }) => {
  const [cases, setCases] = useState(FALLBACK_CASES);

  useEffect(() => {
    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/projects`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (data.length > 0) setCases(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {t.caseStudies.title}
            <span className="text-crimson-600">.</span>
          </h2>
          <p className="text-lg opacity-60">{t.caseStudies.subtitle}</p>
        </div>
        <a href="#contact" className="font-bold text-crimson-600 flex items-center gap-2 hover:gap-3 transition-all">
          {t.caseStudies.viewAll} <ArrowUpRight size={20} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c) => {
          const title = lang === 'sq' && c.title_sq ? c.title_sq : c.title_en;
          const client = lang === 'sq' && c.client_sq ? c.client_sq : c.client_en;
          const result = lang === 'sq' && c.result_sq ? c.result_sq : c.result_en;
          return (
            <div key={c.id} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative">
                <img
                  src={c.image_url}
                  alt={title}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
                  <span className="px-4 py-2 bg-crimson-600 text-white rounded-full font-bold text-sm">
                    {t.caseStudies.viewCase}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-crimson-600">{client}</span>
                    <span className="w-1 h-1 rounded-full bg-current opacity-20" />
                    <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{title}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{result}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(c.tags || []).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded opacity-60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudies;
