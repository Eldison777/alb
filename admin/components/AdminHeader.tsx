import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';

const AdminHeader: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8">
      <a
        href="#"
        className="flex items-center gap-2 text-sm font-bold opacity-40 hover:opacity-100 hover:text-crimson-600 transition-all"
      >
        <ArrowLeft size={16} />
        Back to Site
      </a>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold opacity-50 hover:opacity-100 hover:bg-crimson-600/10 hover:text-crimson-600 transition-all"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
