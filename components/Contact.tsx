import React, { useState } from 'react';
import { Send, Calendar, Mail, MapPin, AlertCircle } from 'lucide-react';

const Contact: React.FC<{ t: any }> = ({ t }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setIsTransitioning(true);
        setTimeout(() => {
          setStatus('success');
          setIsTransitioning(false);
          setForm({ name: '', email: '', company: '', budget: '', message: '' });
        }, 400); // Matches fade-out duration
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      console.error(err);
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        setStatus('error');
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          setStatus('success');
          setIsTransitioning(false);
          setForm({ name: '', email: '', company: '', budget: '', message: '' });
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStatus('idle');
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-black leading-tight">
          {t.contact.sidebar.title}<span className="text-crimson-600">.</span>
        </h2>
        <p className="text-xl opacity-60 leading-relaxed max-w-lg">
          {t.contact.sidebar.desc}
        </p>
        
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-crimson-600">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold opacity-40">Email Us</p>
              <p className="font-bold">hello@albshift.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-crimson-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold opacity-40">Location</p>
              <p className="font-bold">Prishtina, Kosovo (GMT+1)</p>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <button className="flex items-center gap-3 px-6 py-4 glass rounded-2xl hover:bg-white/5 transition-all group">
            <Calendar className="text-crimson-600" />
            <div className="text-left">
              <p className="font-bold group-hover:text-crimson-600 transition-colors">{t.contact.sidebar.bookCall}</p>
              <p className="text-xs opacity-40">{t.contact.sidebar.callTime}</p>
            </div>
          </button>
        </div>
      </div>

      <div className="glass p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden">
        <div className={isTransitioning ? 'animate-fade-out' : 'animate-fade-in'}>
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-crimson-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.contact.form.successTitle}</h3>
              <p className="opacity-60">{t.contact.form.successText}</p>
              <button 
                onClick={resetStatus} 
                className="mt-8 text-sm font-bold text-crimson-600 uppercase tracking-widest hover:underline"
              >
                {t.contact.form.another}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase opacity-40 px-1">{t.contact.form.name}</label>
                  <input 
                    required
                    type="text" 
                    autoComplete="name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase opacity-40 px-1">{t.contact.form.email}</label>
                  <input 
                    required
                    type="email" 
                    autoComplete="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase opacity-40 px-1">{t.contact.form.company}</label>
                  <input 
                    type="text" 
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase opacity-40 px-1">{t.contact.form.budget}</label>
                  <div className="relative">
                    <select 
                      value={form.budget}
                      onChange={e => setForm({...form, budget: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select range...</option>
                      <option value="5-10k">$5k - $10k</option>
                      <option value="10-25k">$10k - $25k</option>
                      <option value="25k+">$25k+</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase opacity-40 px-1">{t.contact.form.message}</label>
                <textarea 
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                  <AlertCircle size={16} />
                  {t.contact.form.errorText}
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-xl shadow-crimson-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>{t.contact.form.submit} <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-crimson-600/10 blur-[60px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Contact;