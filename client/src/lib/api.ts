export const API_BASE = '';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  const resp = await fetch(url, { ...options, headers });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(text || resp.statusText);
  }
  return resp.json() as Promise<T>;
}

export async function apiForm<T>(path: string, formData: FormData, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, { ...options, method: options.method || 'POST', body: formData });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(text || resp.statusText);
  }
  return resp.json() as Promise<T>;
}

export type LoginResponse = {
  token: string;
  user: any;
};
