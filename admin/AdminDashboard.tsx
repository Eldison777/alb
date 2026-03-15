import React, { useEffect, useState } from 'react';
import { FileText, FolderOpen, Users, HelpCircle } from 'lucide-react';
import { apiFetch } from './hooks/useApi';

interface Counts {
  blog: number;
  projects: number;
  team: number;
  faqs: number;
}

const cards = [
  { key: 'blog', label: 'Blog Posts', icon: FileText, hash: '#/admin/blog' },
  { key: 'projects', label: 'Projects', icon: FolderOpen, hash: '#/admin/projects' },
  { key: 'team', label: 'Team Members', icon: Users, hash: '#/admin/team' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, hash: '#/admin/faqs' },
];

const AdminDashboard: React.FC = () => {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Counts>('/api/admin/dashboard/counts')
      .then(setCounts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight mb-2">Dashboard</h1>
        <p className="opacity-40 text-sm">Manage your AlbShift content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => {
          const Icon = card.icon;
          const count = counts ? (counts as any)[card.key] : 0;
          return (
            <a
              key={card.key}
              href={card.hash}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-crimson-600/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-crimson-600/10 flex items-center justify-center text-crimson-600 group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                {loading ? (
                  <div className="w-4 h-4 border-2 border-crimson-600/30 border-t-crimson-600 rounded-full animate-spin" />
                ) : (
                  <span className="text-3xl font-black tracking-tighter">{count}</span>
                )}
              </div>
              <p className="text-sm font-bold opacity-50 group-hover:opacity-100 transition-opacity">{card.label}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
