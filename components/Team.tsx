
import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Team: React.FC<{ t: any }> = ({ t }) => {
  const members = [
    {
      name: "Drilon A.",
      role: "Founder & Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      size: "lg:col-span-2 lg:row-span-2",
      bio: "SaaS architect with 10+ years experience in distributed systems."
    },
    {
      name: "Besa K.",
      role: "Lead Product Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      size: "lg:col-span-1 lg:row-span-1",
      bio: "Crafting pixel-perfect UI systems."
    },
    {
      name: "Arbi H.",
      role: "Full-stack Engineer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      size: "lg:col-span-1 lg:row-span-1",
      bio: "TypeScript enthusiast and performance optimizer."
    },
    {
      name: "Lea M.",
      role: "Cloud Architect",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      size: "lg:col-span-1 lg:row-span-1",
      bio: "Automating infra with high availability."
    },
    {
      name: "Genti P.",
      role: "Frontend Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      size: "lg:col-span-1 lg:row-span-1",
      bio: "Building responsive, modern web apps."
    }
  ];

  return (
    <div className="py-24">
      <div className="text-center max-w-3xl mx-auto mb-20" data-scroll>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-crimson-600"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">Human Intelligence</span>
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
        {members.map((member, i) => (
          <div 
            key={i} 
            className={`group relative glass rounded-[2.5rem] overflow-hidden border dark:border-white/5 border-black/5 hover:border-crimson-600/30 transition-all duration-700 flex flex-col ${member.size}`}
          >
            {/* Image Container */}
            <div className="absolute inset-0 z-0">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent dark:opacity-90 opacity-80"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-10 mt-auto">
              <span className="text-[10px] font-mono font-black text-crimson-500 uppercase tracking-widest mb-2 block">
                {member.role}
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight mb-4 group-hover:text-crimson-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-white/60 font-medium leading-relaxed max-w-[240px] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {member.bio}
              </p>
              
              <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                <a href="#" className="text-white/40 hover:text-crimson-500 transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-white/40 hover:text-crimson-500 transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="text-white/40 hover:text-crimson-500 transition-colors"><Github size={18} /></a>
              </div>
            </div>
            
            {/* Corner Decorative Accent */}
            <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-crimson-600 opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
          </div>
        ))}
        
        {/* Join CTA Box */}
        <div className="glass rounded-[2.5rem] p-10 border border-crimson-600/10 flex flex-col justify-center items-center text-center group hover:bg-crimson-600/5 transition-all">
          <div className="w-16 h-16 bg-crimson-600/10 rounded-full flex items-center justify-center text-crimson-600 mb-6 group-hover:scale-110 transition-transform">
             <Linkedin size={28} />
          </div>
          <h3 className="text-2xl font-black mb-4">{t.team.cta}</h3>
          <p className="text-sm opacity-50 mb-8 max-w-[200px]">We're always looking for high-velocity talent.</p>
          <a href="#" className="font-black text-xs uppercase tracking-widest text-crimson-600 hover:underline">Apply Now</a>
        </div>
      </div>
    </div>
  );
};

export default Team;
