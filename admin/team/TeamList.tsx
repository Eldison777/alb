import React, { useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import ConfirmModal from '../components/ConfirmModal';
import { apiFetch } from '../hooks/useApi';

const columns: Column[] = [
  {
    key: 'name',
    label: 'Name',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        {row.image_url && (
          <img src={row.image_url} alt={val} className="w-8 h-8 rounded-full object-cover" />
        )}
        <span className="font-bold">{val}</span>
      </div>
    ),
  },
  { key: 'role_en', label: 'Role' },
  { key: 'grid_size', label: 'Grid Size' },
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

const TeamList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    apiFetch('/api/admin/team').then(setData).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/admin/team/${deleteTarget.id}`, { method: 'DELETE' });
      setDeleteTarget(null);
      fetchData();
    } catch {} finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <DataTable
        title="Team Members"
        columns={columns}
        data={data}
        loading={loading}
        onAdd={() => { window.location.hash = '#/admin/team/new'; }}
        onEdit={(item) => { window.location.hash = `#/admin/team/${item.id}`; }}
        onDelete={setDeleteTarget}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
};

export default TeamList;
