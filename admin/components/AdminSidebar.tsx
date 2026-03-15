import React from 'react';
import { FileText, FolderOpen, Users, HelpCircle, LayoutDashboard } from 'lucide-react';

const links = [
  { hash: '#/admin', label: 'Dashboard', icon: LayoutDashboard },
  { hash: '#/admin/blog', label: 'Blog Posts', icon: FileText },
  { hash: '#/admin/projects', label: 'Projects', icon: FolderOpen },
  { hash: '#/admin/team', label: 'Team', icon: Users },
  { hash: '#/admin/faqs', label: 'FAQs', icon: HelpCircle },
];

const AdminSidebar: React.FC<{ currentHash: string }> = ({ currentHash }) => {
  const isActive = (hash: string) => {
    if (hash === '#/admin') return currentHash === '#/admin' || currentHash === '#/admin/';
    return currentHash.startsWith(hash);
  };

  return (
    <aside className="w-64 min-h-screen glass border-r border-white/5 p-6 flex flex-col gap-2 shrink-0">
      <a href="#/admin" className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 bg-crimson-600 rounded-lg flex items-center justify-center font-black text-white text-lg">A</div>
        <span className="font-extrabold tracking-tight text-xl">Admin<span className="text-crimson-600">.</span></span>
      </a>
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.hash);
        return (
          <a
            key={link.hash}
            href={link.hash}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              active
                ? 'bg-crimson-600/10 text-crimson-600 border border-crimson-600/20'
                : 'opacity-50 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Icon size={18} />
            {link.label}
          </a>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
