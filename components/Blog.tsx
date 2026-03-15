import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag } from 'lucide-react';

const FALLBACK_POSTS = [
  {
    id: 1,
    category: 'Build',
    title_en: 'How We Scope Custom Software Without Slowing Teams Down',
    title_sq: 'Si bejme scoping per custom software pa ngadalesuar ekipet',
    date: 'Mar 15, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    category: 'AI',
    title_en: 'Three AI Automations That Save Time in Growing Businesses',
    title_sq: 'Tre AI automations qe kursejne kohe ne bizneset ne rritje',
    date: 'Mar 10, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    category: 'Community',
    title_en: 'Why Tech Communities Matter for Serious Brands',
    title_sq: 'Pse komunitetet tech kane rendesi per brandet serioze',
    date: 'Mar 05, 2026',
    author: 'AlbShift Team',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    category: 'Build',
    title_en: 'What Founders Actually Need From a Product Partner',
    title_sq: 'Cfare u duhet founders nga nje product partner',
    date: 'Feb 28, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
];

const Blog: React.FC<{ t: any; lang?: 'en' | 'sq' }> = ({ t, lang = 'en' }) => {
  const [filter, setFilter] = useState('All');
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  useEffect(() => {
    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/blog`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const categories = [
    { key: 'All', label: t.blog.filterAll },
    { key: 'Build', label: t.blog.filterTech },
    { key: 'AI', label: t.blog.filterDesign },
    { key: 'Community', label: t.blog.filterImpact },
  ];
  const filteredPosts = filter === 'All' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="space-y-16 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10" data-scroll>
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-crimson-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.blog.label}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {t.blog.title}
            <span className="text-crimson-600">.</span>
          </h2>
          <p className="text-xl opacity-60 leading-relaxed">{t.blog.subtitle}</p>
        </div>
        <div className="flex flex-wrap p-1.5 glass rounded-2xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-500 ${
                filter === cat.key ? 'bg-crimson-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-scroll-stagger>
        {filteredPosts.map((post) => {
          const title = lang === 'sq' && post.title_sq ? post.title_sq : post.title_en;
          return (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="group cursor-pointer glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-crimson-600/30 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 flex flex-col h-full"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={post.image_url}
                  alt={title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-crimson-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-xl group-hover:scale-110 transition-transform">
                  <Tag size={10} /> {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-4 group-hover:opacity-60 transition-opacity">
                  {post.date}
                </p>
                <h3 className="font-black text-2xl mb-6 leading-[1.2] group-hover:text-crimson-600 transition-colors duration-500">
                  {title}
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
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
