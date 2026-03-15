import React, { useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import ConfirmModal from '../components/ConfirmModal';
import { apiFetch } from '../hooks/useApi';

const columns: Column[] = [
  {
    key: 'title_en',
    label: 'Title',
    render: (val) => <span className="font-bold">{val}</span>,
  },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'date', label: 'Date' },
  {
    key: 'is_published',
    label: 'Status',
    render: (val) => (
      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${val ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
        {val ? 'Published' : 'Draft'}
      </span>
    ),
  },
];

const BlogList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    apiFetch('/api/admin/blog').then(setData).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/admin/blog/${deleteTarget.id}`, { method: 'DELETE' });
      setDeleteTarget(null);
      fetchData();
    } catch {} finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <DataTable
        title="Blog Posts"
        columns={columns}
        data={data}
        loading={loading}
        onAdd={() => { window.location.hash = '#/admin/blog/new'; }}
        onEdit={(item) => { window.location.hash = `#/admin/blog/${item.id}`; }}
        onDelete={setDeleteTarget}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title_en}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
};

export default BlogList;
