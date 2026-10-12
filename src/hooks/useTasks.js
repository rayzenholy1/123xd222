import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks } from '../api/tasks';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [deletingIds, setDeletingIds] = useState([]);

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setTasks(await getTasks());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (title) => {
    const created = await createTask(title);
    setTasks((prev) => [{ ...created, id: Date.now() }, ...prev]);
  };

  const remove = async (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;
    const removed = tasks[index];

    setDeletingIds((prev) => [...prev, id]);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (e) {
      setTasks((prev) => {
        const copy = [...prev];
        copy.splice(Math.min(index, copy.length), 0, removed);
        return copy;
      });
      throw e;
    } finally {
      setDeletingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  return { tasks, loading, refreshing, error, deletingIds, load, add, remove };
}
