import React, { useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import ConfirmModal from '../components/ConfirmModal';
import { apiFetch } from '../hooks/useApi';

const columns: Column[] = [
  {
    key: 'question_en',
    label: 'Question',
    render: (val) => <span className="font-bold">{val && val.length > 60 ? val.slice(0, 60) + '...' : val}</span>,
  },
  {
    key: 'answer_en',
    label: 'Answer',
    render: (val) => <span className="opacity-60">{val && val.length > 80 ? val.slice(0, 80) + '...' : val}</span>,
  },
  { key: 'sort_order', label: 'Order' },
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

const FaqList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    apiFetch('/api/admin/faqs').then(setData).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/admin/faqs/${deleteTarget.id}`, { method: 'DELETE' });
      setDeleteTarget(null);
      fetchData();
    } catch {} finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <DataTable
        title="FAQs"
        columns={columns}
        data={data}
        loading={loading}
        onAdd={() => { window.location.hash = '#/admin/faqs/new'; }}
        onEdit={(item) => { window.location.hash = `#/admin/faqs/${item.id}`; }}
        onDelete={setDeleteTarget}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete FAQ"
        message={`Are you sure you want to delete this FAQ? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
};

export default FaqList;
