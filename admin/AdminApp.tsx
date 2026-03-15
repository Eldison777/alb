import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import BlogList from './blog/BlogList';
import BlogForm from './blog/BlogForm';
import ProjectList from './projects/ProjectList';
import ProjectForm from './projects/ProjectForm';
import TeamList from './team/TeamList';
import TeamForm from './team/TeamForm';
import FaqList from './faqs/FaqList';
import FaqForm from './faqs/FaqForm';

const AdminApp: React.FC = () => {
  const { isAuthenticated, login, logout, loading, error } = useAdminAuth();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} loading={loading} error={error} />;
  }

  // Parse the admin sub-route from the hash
  // e.g. #/admin/blog/3 → path = "blog/3"
  const adminPath = hash.replace('#/admin', '').replace(/^\//, '');
  const segments = adminPath.split('/').filter(Boolean);

  let content: React.ReactNode;

  switch (segments[0]) {
    case 'blog':
      content = segments[1] ? <BlogForm id={segments[1]} /> : <BlogList />;
      break;
    case 'projects':
      content = segments[1] ? <ProjectForm id={segments[1]} /> : <ProjectList />;
      break;
    case 'team':
      content = segments[1] ? <TeamForm id={segments[1]} /> : <TeamList />;
      break;
    case 'faqs':
      content = segments[1] ? <FaqForm id={segments[1]} /> : <FaqList />;
      break;
    default:
      content = <AdminDashboard />;
  }

  return (
    <AdminLayout currentHash={hash} onLogout={logout}>
      {content}
    </AdminLayout>
  );
};

export default AdminApp;
