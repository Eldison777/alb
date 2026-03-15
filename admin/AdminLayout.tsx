import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

interface AdminLayoutProps {
  currentHash: string;
  onLogout: () => void;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentHash, onLogout, children }) => {
  return (
    <div className="flex min-h-screen" style={{ background: '#050505' }}>
      <AdminSidebar currentHash={currentHash} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onLogout={onLogout} />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
