import { getDb } from './database';

export async function insertTask({ title, description, priority }) {
  const db = await getDb();
  const result = await db.runAsync(
    'INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)',
    [title, description, priority]
  );
  return result.lastInsertRowId;
}

export async function getAllTasks() {
  const db = await getDb();
  return db.getAllAsync('SELECT * FROM tasks ORDER BY id DESC');
}

export async function deleteTaskById(id) {
  const db = await getDb();
  await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
}
