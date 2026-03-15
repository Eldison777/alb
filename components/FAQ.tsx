import React, { useState, useEffect } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FALLBACK_FAQS = [
  {
    id: 1,
    question_en: 'What kinds of projects do you take on?',
    question_sq: 'Cfare lloj projektesh merrni persiper?',
    answer_en:
      'We work on marketing websites, custom software products, internal tools, AI automations, and community-driven digital platforms.',
    answer_sq:
      'Punojme ne marketing websites, produkte software custom, internal tools, AI automations, dhe platforma digitale te drejtuara nga komuniteti.',
  },
  {
    id: 2,
    question_en: 'Can you help if we are not sure what to automate yet?',
    question_sq: 'A mund te ndihmoni edhe nese nuk e dime ende cfare te automatizojme?',
    answer_en:
      'Yes. A large part of our job is finding the highest-friction workflows first, then designing automation around clear rules, approvals, and measurable outcomes.',
    answer_sq:
      'Po. Nje pjese e madhe e punes sone eshte gjetja e workflows me me shume friksion dhe me pas dizajnimi i automatizimit me rregulla dhe rezultate te matshme.',
  },
  {
    id: 3,
    question_en: 'Do we own the code and automations after launch?',
    question_sq: 'A e zoterojme kodin dhe automatizimet pas launch-it?',
    answer_en:
      'Yes. Once the engagement is completed and paid, you own the codebase and the delivery artifacts unless we explicitly agree otherwise in writing.',
    answer_sq:
      'Po. Pasi angazhimi te perfundoje dhe te paguhet, ju e zoteroni codebase-in dhe artefaktet e delivery-t pervec rasteve kur biem dakord ndryshe me shkrim.',
  },
  {
    id: 4,
    question_en: 'How long does a typical engagement take?',
    question_sq: 'Sa zgjat zakonisht nje angazhim tipik?',
    answer_en:
      'Smaller websites and launch sprints can move in two to four weeks. Larger product builds or automation systems usually take four to twelve weeks depending on scope.',
    answer_sq:
      'Website-et me te vogla dhe launch sprint-et mund te levizin ne dy deri kater jave. Produktet me te medha ose sistemet e automatizimit zakonisht marrin kater deri dymbedhjete jave.',
  },
  {
    id: 5,
    question_en: 'Do you support clients after launch?',
    question_sq: 'A ofroni support pas launch-it?',
    answer_en:
      'Yes. We offer optimization, maintenance, feature delivery, and roadmap support so the product or automation keeps improving after go-live.',
    answer_sq:
      'Po. Ofrrojme optimizim, mirembajtje, feature delivery, dhe roadmap support qe produkti ose automatizimi te vazhdoje te permiresohet.',
  },
  {
    id: 6,
    question_en: 'Can you also help build a community around our brand or initiative?',
    question_sq: 'A mund te ndihmoni edhe ne ndertimin e komunitetit rreth brandit tone?',
    answer_en:
      'Yes. We can support community strategy, event formats, content planning, and digital systems that make member experiences easier to run.',
    answer_sq:
      'Po. Mund te ndihmojme me strategji komuniteti, formate eventesh, content planning, dhe sisteme digitale qe e bejne eksperiencen e anetareve me te lehte.',
  },
];

const FAQ: React.FC<{ t: any; lang?: 'en' | 'sq' }> = ({ t, lang = 'en' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);

  useEffect(() => {
    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/faqs`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (data.length > 0) setFaqs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto" data-scroll>
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-600/10 text-crimson-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <HelpCircle size={12} fill="currentColor" /> {t.faq.label}
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
          {t.faq.title}
          <span className="text-crimson-600">.</span>
        </h2>
        <p className="opacity-60 text-xl leading-relaxed max-w-2xl mx-auto">{t.faq.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => {
          const question = lang === 'sq' && faq.question_sq ? faq.question_sq : faq.question_en;
          const answer = lang === 'sq' && faq.answer_sq ? faq.answer_sq : faq.answer_en;
          return (
            <div
              key={faq.id}
              className={`group glass rounded-3xl border transition-all duration-500 ${
                openIndex === index ? 'border-crimson-600/30 bg-crimson-600/[0.02]' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <button
                className="w-full px-4 sm:px-8 lg:px-10 py-5 sm:py-7 lg:py-8 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg sm:text-2xl font-black tracking-tight transition-colors ${openIndex === index ? 'text-crimson-600' : 'opacity-80'}`}>
                  {question}
                </span>
                <div
                  className={`shrink-0 ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    openIndex === index ? 'bg-crimson-600 text-white rotate-180' : 'bg-white/5 opacity-40'
                  }`}
                >
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  openIndex === index ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-8 lg:px-10 text-base sm:text-lg opacity-60 leading-relaxed border-t border-white/5 pt-6 sm:pt-8 max-w-3xl">
                  {answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
