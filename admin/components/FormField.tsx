import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'url' | 'textarea' | 'select' | 'number' | 'checkbox';
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text', options, placeholder, required, checked, onCheck }) => {
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors text-sm";

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onCheck?.(e.target.checked)}
          className="w-5 h-5 rounded border-white/10 bg-white/5 accent-crimson-600 cursor-pointer"
        />
        <span className="text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">{label}</span>
      </label>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase opacity-40 px-1 tracking-wider">{label}{required && ' *'}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
};

export default FormField;
