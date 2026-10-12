const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Помилка сервера: HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const getTasks = () => request('/todos?_limit=15');

export const createTask = (title) =>
  request('/todos', {
    method: 'POST',
    body: JSON.stringify({ title, completed: false, userId: 1 }),
  });

export const deleteTask = (id) => request(`/todos/${id}`, { method: 'DELETE' });
