import React, { useState } from 'react';
import { ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC<{ t: any }> = ({ t }) => {
  const [filter, setFilter] = useState('All');
  
  const posts = [
    { id: 1, category: 'Tech', title: "Why Next.js 15 is a Game Changer for SaaS", date: "Mar 15, 2025", author: "Drilon A.", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800" },
    { id: 2, category: 'Design', title: "Designing for Conversion: The 80/20 Rule", date: "Mar 10, 2025", author: "Besart K.", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, category: 'Impact', title: "How Open Source Drives Commercial Innovation", date: "Mar 05, 2025", author: "AlbShift Team", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    { id: 4, category: 'Tech', title: "Scaling PostgreSQL to 1M Concurrent Users", date: "Feb 28, 2025", author: "Drilon A.", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800" },
  ];

  const categories = ['All', 'Tech', 'Design', 'Impact'];
  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="space-y-16 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10" data-scroll>
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-crimson-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">Resource Hub</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Engineering Intel<span className="text-crimson-600">.</span></h2>
          <p className="text-xl opacity-60 leading-relaxed">Thoughts on architecture, optimization, and digital strategy.</p>
        </div>
        <div className="flex p-1.5 glass rounded-2xl border border-white/5">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-500 ${filter === cat ? 'bg-crimson-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-scroll-stagger>
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-crimson-600/30 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-700 flex flex-col h-full"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-crimson-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-xl group-hover:scale-110 transition-transform">
                <Tag size={10} /> {post.category}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-4 group-hover:opacity-60 transition-opacity">{post.date}</p>
              <h3 className="font-black text-2xl mb-6 leading-[1.2] group-hover:text-crimson-600 transition-colors duration-500">
                {post.title}
              </h3>
              <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-crimson-600/20 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-crimson-600/20 text-crimson-600 flex items-center justify-center text-xs font-black group-hover:bg-crimson-600 group-hover:text-white transition-all duration-500">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-sm opacity-50 font-bold group-hover:opacity-100 transition-opacity">{post.author}</span>
                </div>
                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-crimson-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;