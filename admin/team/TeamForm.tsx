import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import FormField from '../components/FormField';
import { apiFetch } from '../hooks/useApi';

const GRID_OPTIONS = [
  { value: 'lg:col-span-1 lg:row-span-1', label: 'Small (1x1)' },
  { value: 'lg:col-span-2 lg:row-span-2', label: 'Large (2x2)' },
  { value: 'lg:col-span-2 lg:row-span-1', label: 'Wide (2x1)' },
];

const TeamForm: React.FC<{ id?: string }> = ({ id }) => {
  const isNew = !id || id === 'new';
  const [form, setForm] = useState({
    name: '', role_en: '', role_sq: '', bio_en: '', bio_sq: '',
    image_url: '', grid_size: 'lg:col-span-1 lg:row-span-1',
    twitter_url: '', linkedin_url: '', github_url: '',
    sort_order: '0', is_published: true,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      apiFetch(`/api/admin/team/${id}`).then(data => {
        setForm({
          name: data.name || '',
          role_en: data.role_en || '',
          role_sq: data.role_sq || '',
          bio_en: data.bio_en || '',
          bio_sq: data.bio_sq || '',
          image_url: data.image_url || '',
          grid_size: data.grid_size || 'lg:col-span-1 lg:row-span-1',
          twitter_url: data.twitter_url || '',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || '',
          sort_order: String(data.sort_order || 0),
          is_published: data.is_published !== false,
        });
      }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const body = { ...form, sort_order: Number(form.sort_order) };
      if (isNew) {
        await apiFetch('/api/admin/team', { method: 'POST', body: JSON.stringify(body) });
      } else {
        await apiFetch(`/api/admin/team/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      }
      window.location.hash = '#/admin/team';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const set = (key: string) => (val: string) => setForm(f => ({ ...f, [key]: val }));

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-crimson-600/30 border-t-crimson-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <a href="#/admin/team" className="p-2 rounded-xl hover:bg-white/5 transition-colors opacity-40 hover:opacity-100">
          <ArrowLeft size={20} />
        </a>
        <h2 className="text-2xl font-black tracking-tight">{isNew ? 'New Team Member' : 'Edit Team Member'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-8 space-y-6">
        <FormField label="Name" value={form.name} onChange={set('name')} required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Role (English)" value={form.role_en} onChange={set('role_en')} required />
          <FormField label="Role (Albanian)" value={form.role_sq} onChange={set('role_sq')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Bio (English)" value={form.bio_en} onChange={set('bio_en')} type="textarea" />
          <FormField label="Bio (Albanian)" value={form.bio_sq} onChange={set('bio_sq')} type="textarea" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Image URL" value={form.image_url} onChange={set('image_url')} type="url" />
          <FormField label="Grid Size" value={form.grid_size} onChange={set('grid_size')} type="select" options={GRID_OPTIONS} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="Twitter URL" value={form.twitter_url} onChange={set('twitter_url')} type="url" />
          <FormField label="LinkedIn URL" value={form.linkedin_url} onChange={set('linkedin_url')} type="url" />
          <FormField label="GitHub URL" value={form.github_url} onChange={set('github_url')} type="url" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <FormField label="Sort Order" value={form.sort_order} onChange={set('sort_order')} type="number" />
          <FormField
            label="Published"
            value=""
            onChange={() => {}}
            type="checkbox"
            checked={form.is_published}
            onCheck={(v) => setForm(f => ({ ...f, is_published: v }))}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-crimson-600/20"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
            {isNew ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
