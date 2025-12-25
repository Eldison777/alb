
import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const ImpactModel: React.FC<{ t: any, theme: 'dark' | 'light' }> = ({ t, theme }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const isDark = theme === 'dark';

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Strategic Impact (20%)', 'Operational Noise (80%)'],
          datasets: [{
            data: [20, 80],
            backgroundColor: ['#dc2626', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'],
            borderColor: 'transparent',
            hoverOffset: 10
          }]
        },
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              titleColor: isDark ? '#ffffff' : '#0a0a0a',
              bodyColor: isDark ? '#9ca3af' : '#4b5563',
              padding: 12,
              cornerRadius: 8,
              displayColors: false
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme, t]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-scroll>
      <div className="glass rounded-[3rem] p-12 border-white/5 relative overflow-hidden flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-[320px] aspect-square relative z-10">
          <canvas ref={chartRef}></canvas>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-crimson-600">80/20</span>
            <span className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Efficiency</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-600/10 blur-[80px] rounded-full"></div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-[1px] bg-crimson-600"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">Optimization Philosophy</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
          {t.impact.title}<span className="text-crimson-600">.</span>
        </h2>
        <p className="text-xl opacity-60 leading-relaxed">
          {t.impact.description}
        </p>
        
        <div className="p-8 rounded-3xl bg-crimson-600/5 border border-crimson-600/20">
          <p className="font-bold text-lg text-crimson-600 leading-relaxed italic">
            "{t.impact.pledge}"
          </p>
          <div className="mt-6 pt-6 border-t border-crimson-600/10 flex items-center justify-between">
            <span className="text-xs uppercase font-black opacity-40 tracking-widest">Transparency Report</span>
            <div className="px-4 py-2 bg-crimson-600 text-white text-xs font-black rounded-full shadow-lg shadow-crimson-600/20">
              {t.impact.metrics}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactModel;
