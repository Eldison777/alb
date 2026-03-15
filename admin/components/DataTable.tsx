import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data, loading, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-crimson-600/20"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-crimson-600/30 border-t-crimson-600 rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <p className="text-lg font-bold">No items yet</p>
            <p className="text-sm mt-1">Click "Add New" to create one.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {columns.map(col => (
                  <th key={col.key} className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-30">
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.id || i} className="border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 text-sm font-medium">
                      {col.render ? col.render(row[col.key], row) : (
                        <span className="opacity-80">{String(row[col.key] ?? '')}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 rounded-lg hover:bg-white/5 opacity-40 hover:opacity-100 hover:text-crimson-600 transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 rounded-lg hover:bg-red-500/10 opacity-40 hover:opacity-100 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;
