import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'albshift_admin_token';

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = !!token;

  const login = useCallback(async (password: string) => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return false;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      return true;
    } catch {
      setError('Connection error. Is the backend running?');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
        await fetch(`${apiUrl}/api/admin/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, [token]);

  return { token, isAuthenticated, login, logout, loading, error };
}
