import { useState, useCallback } from 'react';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  return localStorage.getItem('albshift_admin_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

export async function apiFetch<T = any>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...options?.headers },
  });
  if (res.status === 401) {
    localStorage.removeItem('albshift_admin_token');
    window.location.hash = '#/admin/login';
    throw new Error('Session expired');
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export function useApi<T = any>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await apiFetch<T>(path);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  return { data, loading, error, refetch: fetch_ };
}
