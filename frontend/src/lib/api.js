const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || 'Something went wrong');
  return body;
}
export const api = {
  list: params => request(`/employees?${new URLSearchParams(params)}`),
  stats: () => request('/employees/stats'),
  get: id => request(`/employees/${id}`),
  create: data => request('/employees', { method:'POST', body:JSON.stringify(data) }),
  update: (id,data) => request(`/employees/${id}`, { method:'PUT', body:JSON.stringify(data) }),
  remove: id => request(`/employees/${id}`, { method:'DELETE' }),
  health: () => request('/health')
};