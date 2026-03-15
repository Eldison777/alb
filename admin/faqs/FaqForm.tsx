import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import FormField from '../components/FormField';
import { apiFetch } from '../hooks/useApi';

const FaqForm: React.FC<{ id?: string }> = ({ id }) => {
  const isNew = !id || id === 'new';
  const [form, setForm] = useState({
    question_en: '', question_sq: '', answer_en: '', answer_sq: '',
    sort_order: '0', is_published: true,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      apiFetch(`/api/admin/faqs/${id}`).then(data => {
        setForm({
          question_en: data.question_en || '',
          question_sq: data.question_sq || '',
          answer_en: data.answer_en || '',
          answer_sq: data.answer_sq || '',
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
        await apiFetch('/api/admin/faqs', { method: 'POST', body: JSON.stringify(body) });
      } else {
        await apiFetch(`/api/admin/faqs/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      }
      window.location.hash = '#/admin/faqs';
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
        <a href="#/admin/faqs" className="p-2 rounded-xl hover:bg-white/5 transition-colors opacity-40 hover:opacity-100">
          <ArrowLeft size={20} />
        </a>
        <h2 className="text-2xl font-black tracking-tight">{isNew ? 'New FAQ' : 'Edit FAQ'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Question (English)" value={form.question_en} onChange={set('question_en')} type="textarea" required />
          <FormField label="Question (Albanian)" value={form.question_sq} onChange={set('question_sq')} type="textarea" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Answer (English)" value={form.answer_en} onChange={set('answer_en')} type="textarea" required />
          <FormField label="Answer (Albanian)" value={form.answer_sq} onChange={set('answer_sq')} type="textarea" />
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

export default FaqForm;
