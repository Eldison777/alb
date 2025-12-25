import React, { useState } from 'react';
import { Twitter, Linkedin, Github, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const Footer: React.FC<{ t: any }> = ({ t }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      setTimeout(() => {
        setSubscribed(true);
        setEmail('');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="px-6 md:px-12 pb-12 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section - Matching Screenshot */}
        <div className="glass rounded-[3rem] p-12 md:p-20 border border-crimson-600/20 mb-32 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              {t.footer.ctaTitle}<span className="text-crimson-600">.</span>
            </h2>
            <p className="opacity-60 text-lg md:text-xl font-medium max-w-md mx-auto md:mx-0">
              {t.footer.ctaSub}
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="#contact"
              className="px-10 py-5 bg-crimson-600 text-white rounded-[1.2rem] font-black text-xl flex items-center gap-4 hover:bg-crimson-700 transition-all shadow-2xl shadow-crimson-600/40 active:scale-95 group-hover:-translate-y-1"
            >
              {t.nav.cta} <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson-600/[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-crimson-600/[0.08] transition-colors"></div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-crimson-600 rounded-lg flex items-center justify-center font-black text-white text-xl">
                A
              </div>
              <span className="font-extrabold tracking-tight text-2xl">
                AlbShift<span className="text-crimson-600">.</span>
              </span>
            </a>
            <p className="opacity-40 text-base leading-relaxed max-w-sm">
              Premium engineering studio delivering high-performance SaaS solutions and UI systems for the next generation of digital products.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-4 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                {t.footer.newsletter}
              </p>
              {subscribed ? (
                <div className="flex items-center gap-3 text-crimson-600 font-black animate-fade-in bg-crimson-600/5 px-6 py-3 rounded-2xl border border-crimson-600/20 w-fit">
                  <CheckCircle2 size={20} />
                  {t.footer.subSuccess}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm p-1.5 glass rounded-2xl border border-white/5 focus-within:border-crimson-600/30 transition-all">
                  <input
                    required
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-transparent border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-0 focus:outline-none placeholder:opacity-40"
                  />
                  <button
                    disabled={loading}
                    className="px-6 py-2.5 bg-crimson-600 text-white rounded-[0.8rem] font-black text-sm hover:bg-crimson-700 transition-all disabled:opacity-50 shadow-lg shadow-crimson-600/20"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : t.footer.subscribe}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          <div className="space-y-8">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] opacity-30">Company</h4>
            <ul className="space-y-5 text-sm font-bold opacity-60">
              <li><a href="#about" className="hover:text-crimson-600 transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-crimson-600 transition-colors">Our Team</a></li>
              <li><a href="#blog" className="hover:text-crimson-600 transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-crimson-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] opacity-30">Expertise</h4>
            <ul className="space-y-5 text-sm font-bold opacity-60">
              <li><a href="#services" className="hover:text-crimson-600 transition-colors">SaaS Build</a></li>
              <li><a href="#services" className="hover:text-crimson-600 transition-colors">DevOps</a></li>
              <li><a href="#services" className="hover:text-crimson-600 transition-colors">UI Design</a></li>
              <li><a href="#services" className="hover:text-crimson-600 transition-colors">Growth</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] opacity-30">Legal</h4>
            <ul className="space-y-5 text-sm font-bold opacity-60">
              <li><a href="#faq" className="hover:text-crimson-600 transition-colors">Privacy</a></li>
              <li><a href="#faq" className="hover:text-crimson-600 transition-colors">Terms</a></li>
              <li><a href="#faq" className="hover:text-crimson-600 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Final Row */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-8">
            <p className="text-xs opacity-40 font-bold">
              {t.footer.rights}
            </p>
            <div className="hidden md:flex gap-4">
              <a href="#" className="p-2 glass rounded-lg hover:text-crimson-600 transition-colors"><Twitter size={16} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-crimson-600 transition-colors"><Linkedin size={16} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-crimson-600 transition-colors"><Github size={16} /></a>
            </div>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
            <span className="hover:opacity-100 transition-opacity cursor-default">Engineering Excellence</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">Performance First</span>
            <span className="hover:opacity-100 transition-opacity cursor-default">Scale Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;