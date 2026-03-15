
import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

const FALLBACK_MEMBERS = [
  {
    id: 1, name: "Drilon A.",
    role_en: "Founder & Lead Engineer", role_sq: "Themelues & Inxhinier Kryesor",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    grid_size: "lg:col-span-2 lg:row-span-2",
    bio_en: "SaaS architect with 10+ years experience in distributed systems.",
    bio_sq: "Arkitekt SaaS me 10+ vite përvojë në sisteme të shpërndara.",
    twitter_url: '', linkedin_url: '', github_url: '',
  },
  {
    id: 2, name: "Besa K.",
    role_en: "Lead Product Designer", role_sq: "Dizajnere Kryesore e Produktit",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    grid_size: "lg:col-span-1 lg:row-span-1",
    bio_en: "Crafting pixel-perfect UI systems.",
    bio_sq: "Krijon sisteme UI piksel-perfekte.",
    twitter_url: '', linkedin_url: '', github_url: '',
  },
  {
    id: 3, name: "Arbi H.",
    role_en: "Full-stack Engineer", role_sq: "Inxhinier Full-stack",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    grid_size: "lg:col-span-1 lg:row-span-1",
    bio_en: "TypeScript enthusiast and performance optimizer.",
    bio_sq: "Entuziast i TypeScript dhe optimizues i performancës.",
    twitter_url: '', linkedin_url: '', github_url: '',
  },
  {
    id: 4, name: "Lea M.",
    role_en: "Cloud Architect", role_sq: "Arkitekte Cloud",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    grid_size: "lg:col-span-1 lg:row-span-1",
    bio_en: "Automating infra with high availability.",
    bio_sq: "Automatizim i infrastrukturës me disponueshmëri të lartë.",
    twitter_url: '', linkedin_url: '', github_url: '',
  },
  {
    id: 5, name: "Genti P.",
    role_en: "Frontend Engineer", role_sq: "Inxhinier Frontend",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    grid_size: "lg:col-span-1 lg:row-span-1",
    bio_en: "Building responsive, modern web apps.",
    bio_sq: "Ndërton aplikacione web moderne dhe responsive.",
    twitter_url: '', linkedin_url: '', github_url: '',
  },
];

const Team: React.FC<{ t: any; lang?: 'en' | 'sq' }> = ({ t, lang = 'en' }) => {
  const [members, setMembers] = useState(FALLBACK_MEMBERS);

  useEffect(() => {
    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/team`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (data.length > 0) setMembers(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="py-24">
      <div className="text-center max-w-3xl mx-auto mb-20" data-scroll>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-crimson-600"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.team.label}</span>
          <div className="w-12 h-[1px] bg-crimson-600"></div>
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
          {t.team.title}<span className="text-crimson-600">.</span>
        </h2>
        <p className="text-xl opacity-60 leading-relaxed">
          {t.team.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]" data-scroll-stagger>
        {members.map((member) => {
          const role = lang === 'sq' && member.role_sq ? member.role_sq : member.role_en;
          const bio = lang === 'sq' && member.bio_sq ? member.bio_sq : member.bio_en;
          return (
            <div
              key={member.id}
              className={`group relative glass rounded-[2.5rem] overflow-hidden border dark:border-white/5 border-black/5 hover:border-crimson-600/30 transition-all duration-700 flex flex-col ${member.grid_size}`}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={member.image_url}
                  alt={member.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent dark:opacity-90 opacity-80"></div>
              </div>

              <div className="relative z-10 p-10 mt-auto">
                <span className="text-[10px] font-mono font-black text-crimson-500 uppercase tracking-widest mb-2 block">
                  {role}
                </span>
                <h3 className="text-3xl font-black text-white tracking-tight mb-4 group-hover:text-crimson-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed max-w-[240px] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {bio}
                </p>

                <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  {member.twitter_url ? (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-crimson-500 transition-colors"><Twitter size={18} /></a>
                  ) : (
                    <span className="text-white/40 hover:text-crimson-500 transition-colors cursor-pointer"><Twitter size={18} /></span>
                  )}
                  {member.linkedin_url ? (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-crimson-500 transition-colors"><Linkedin size={18} /></a>
                  ) : (
                    <span className="text-white/40 hover:text-crimson-500 transition-colors cursor-pointer"><Linkedin size={18} /></span>
                  )}
                  {member.github_url ? (
                    <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-crimson-500 transition-colors"><Github size={18} /></a>
                  ) : (
                    <span className="text-white/40 hover:text-crimson-500 transition-colors cursor-pointer"><Github size={18} /></span>
                  )}
                </div>
              </div>

              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-crimson-600 opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
            </div>
          );
        })}

        {/* Join CTA Box */}
        <div className="glass rounded-[2.5rem] p-10 border border-crimson-600/10 flex flex-col justify-center items-center text-center group hover:bg-crimson-600/5 transition-all">
          <div className="w-16 h-16 bg-crimson-600/10 rounded-full flex items-center justify-center text-crimson-600 mb-6 group-hover:scale-110 transition-transform">
            <Linkedin size={28} />
          </div>
          <h3 className="text-2xl font-black mb-4">{t.team.cta}</h3>
          <p className="text-sm opacity-50 mb-8 max-w-[200px]">{t.team.ctaDesc}</p>
          <a href="#" className="font-black text-xs uppercase tracking-widest text-crimson-600 hover:underline">{t.team.applyNow}</a>
        </div>
      </div>
    </div>
  );
};

export default Team;
