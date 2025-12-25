
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ: React.FC<{ t: any }> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is your typical project timeline?", a: "Standard MVP development takes between 6 to 12 weeks depending on complexity. Marketing websites can be delivered in as little as 3 weeks." },
    { q: "Do I own the source code?", a: "Absolutely. Once final payment is made, you own 100% of the intellectual property and source code. No vendor lock-in." },
    { q: "Which tech stack do you recommend?", a: "We primarily work with TypeScript, React/Next.js for the frontend, and Node.js or Go for the backend. We use PostgreSQL for data and AWS/Vercel for deployment." },
    { q: "Do you offer post-launch maintenance?", a: "Yes, we provide monthly maintenance packages that cover security patches, performance monitoring, and continuous minor iterations." },
    { q: "How do we communicate during the build?", a: "We use a dedicated Slack channel for your project and hold weekly syncs. You also get access to a private dashboard for real-time progress tracking." },
    { q: "What is the 80/20 model exactly?", a: "It's our engineering philosophy where we identify the 20% of features that drive 80% of business value, ensuring we ship fast and iterate based on real user data." }
  ];

  return (
    <div className="max-w-5xl mx-auto" data-scroll>
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-600/10 text-crimson-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <HelpCircle size={12} fill="currentColor" /> Knowledge Base
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Everything else<span className="text-crimson-600">.</span></h2>
        <p className="opacity-60 text-xl leading-relaxed max-w-2xl mx-auto">
          Common queries about our process, stack, and long-term support model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`group glass rounded-3xl border transition-all duration-500 ${openIndex === i ? 'border-crimson-600/30 bg-crimson-600/[0.02]' : 'border-white/5 hover:border-white/10'}`}
          >
            <button 
              className="w-full px-10 py-8 flex items-center justify-between text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className={`text-2xl font-black tracking-tight transition-colors ${openIndex === i ? 'text-crimson-600' : 'opacity-80'}`}>
                {faq.q}
              </span>
              <div className={`shrink-0 ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${openIndex === i ? 'bg-crimson-600 text-white rotate-180' : 'bg-white/5 opacity-40'}`}>
                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
              <div className="px-10 text-lg opacity-60 leading-relaxed border-t border-white/5 pt-8 max-w-3xl">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
