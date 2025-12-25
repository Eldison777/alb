
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies: React.FC<{ t: any }> = ({ t }) => {
  const cases = [
    {
      title: "Fintech Platform",
      client: "NeoBank Europe",
      result: "+42% Conversion",
      tags: ["Next.js", "Go", "AWS"],
      image: "https://picsum.photos/seed/fin/800/600"
    },
    {
      title: "E-commerce Engine",
      client: "Luxury Global",
      result: "-60% Load Time",
      tags: ["React", "Shopify", "Tailwind"],
      image: "https://picsum.photos/seed/shop/800/600"
    },
    {
      title: "SaaS Dashboard",
      client: "Cloud Analytics",
      result: "99.9% Reliability",
      tags: ["TypeScript", "Node", "Redis"],
      image: "https://picsum.photos/seed/saas/800/600"
    },
    {
      title: "Design System",
      client: "GovTech Hub",
      result: "2x Velocity",
      tags: ["Figma", "Stitches", "Storybook"],
      image: "https://picsum.photos/seed/ds/800/600"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Case Studies<span className="text-crimson-600">.</span></h2>
          <p className="text-lg opacity-60">High-impact delivery for ambitious teams.</p>
        </div>
        <a href="#" className="font-bold text-crimson-600 flex items-center gap-2 hover:gap-3 transition-all">
          View all projects <ArrowUpRight size={20} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative">
              <img 
                src={c.image} 
                alt={c.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
                <span className="px-4 py-2 bg-crimson-600 text-white rounded-full font-bold text-sm">
                  View Case Study
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-crimson-600">{c.client}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{c.title}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{c.result}</h3>
                <div className="flex gap-2">
                  {c.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded opacity-60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
