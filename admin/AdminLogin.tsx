import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>;
  loading: boolean;
  error: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, loading, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#050505' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-crimson-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl mx-auto mb-6">
            A
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Admin Access</h1>
          <p className="opacity-40 text-sm">AlbShift Content Management</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase opacity-40 px-1 tracking-wider">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-crimson-600/50 transition-colors text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-crimson-600 hover:bg-crimson-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-xl shadow-crimson-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-xs opacity-20 mt-8">
          <a href="#" className="hover:text-crimson-600 transition-colors">Back to site</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
