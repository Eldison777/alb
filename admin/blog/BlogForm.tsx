import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import FormField from '../components/FormField';
import { apiFetch } from '../hooks/useApi';

const CATEGORIES = [
  { value: 'Build', label: 'Build' },
  { value: 'AI', label: 'AI' },
  { value: 'Community', label: 'Community' },
  { value: 'Business', label: 'Business' },
];

const BlogForm: React.FC<{ id?: string }> = ({ id }) => {
  const isNew = !id || id === 'new';
  const [form, setForm] = useState({
    title_en: '', title_sq: '', category: 'Build', date: '', author: '',
    image_url: '', content_en: '', content_sq: '', sort_order: '0', is_published: true,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      apiFetch(`/api/admin/blog/${id}`).then(data => {
        setForm({
          title_en: data.title_en || '',
          title_sq: data.title_sq || '',
          category: data.category || 'Build',
          date: data.date || '',
          author: data.author || '',
          image_url: data.image_url || '',
          content_en: data.content_en || '',
          content_sq: data.content_sq || '',
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
        await apiFetch('/api/admin/blog', { method: 'POST', body: JSON.stringify(body) });
      } else {
        await apiFetch(`/api/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      }
      window.location.hash = '#/admin/blog';
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
        <a href="#/admin/blog" className="p-2 rounded-xl hover:bg-white/5 transition-colors opacity-40 hover:opacity-100">
          <ArrowLeft size={20} />
        </a>
        <h2 className="text-2xl font-black tracking-tight">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Title (English)" value={form.title_en} onChange={set('title_en')} required />
          <FormField label="Title (Albanian)" value={form.title_sq} onChange={set('title_sq')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="Category" value={form.category} onChange={set('category')} type="select" options={CATEGORIES} />
          <FormField label="Date" value={form.date} onChange={set('date')} placeholder="Mar 15, 2026" required />
          <FormField label="Author" value={form.author} onChange={set('author')} required />
        </div>
        <FormField label="Image URL" value={form.image_url} onChange={set('image_url')} type="url" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Content (English)" value={form.content_en} onChange={set('content_en')} type="textarea" />
          <FormField label="Content (Albanian)" value={form.content_sq} onChange={set('content_sq')} type="textarea" />
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

export default BlogForm;
