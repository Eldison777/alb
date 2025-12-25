import React from 'react';
import { Search, Zap, Shield, Rocket } from 'lucide-react';

const Process: React.FC<{ t: any }> = ({ t }) => {
    const icons = [Search, Zap, Shield, Rocket];

    return (
        <section id="process" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
            <div className="flex flex-col items-center text-center mb-16" data-scroll>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-crimson-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">Workflow</span>
                    <div className="w-12 h-[1px] bg-crimson-600"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                    {t.process.title}<span className="text-crimson-600">.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-scroll-stagger>
                {t.process.steps.map((step: any, index: number) => {
                    const Icon = icons[index];
                    return (
                        <div
                            key={step.id}
                            className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-crimson-600/40 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                            <div className="flex flex-col h-full">
                                <div className="text-4xl font-black opacity-10 mb-8 group-hover:opacity-20 transition-opacity">
                                    {step.id}
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-crimson-600/10 flex items-center justify-center mb-8 group-hover:bg-crimson-600 group-hover:text-white transition-all duration-500">
                                    <Icon size={24} className="text-crimson-600 group-hover:text-white" />
                                </div>

                                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-crimson-600 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="opacity-60 leading-relaxed text-sm group-hover:opacity-90 transition-opacity">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Process;
