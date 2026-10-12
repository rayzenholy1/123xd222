import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { deleteTaskById, getAllTasks } from '../db/tasksRepository';

const COLORS = { low: '#3aa76d', medium: '#e0a526', high: '#d64545' };

export default function SavedTasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setTasks(await getAllTasks());
    } catch (e) {
      Alert.alert('Не вдалося завантажити', e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const confirmDelete = (task) => {
    Alert.alert('Видалити задачу?', task.title, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTaskById(task.id);
            setTasks((prev) => prev.filter((t) => t.id !== task.id));
          } catch (e) {
            Alert.alert('Не вдалося видалити', e.message);
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Збережені задачі</Text>
      <FlatList
        data={tasks}
        keyExtractor={(t) => String(t.id)}
        ListEmptyComponent={<Text style={styles.empty}>У базі ще немає задач</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.badge, { backgroundColor: COLORS[item.priority] }]} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.title}</Text>
              {!!item.description && <Text style={styles.desc}>{item.description}</Text>}
              <Text style={styles.date}>{item.created_at}</Text>
            </View>
            <Pressable onPress={() => confirmDelete(item)} hitSlop={10}>
              <Text style={styles.delete}>Видалити</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8 },
  badge: { width: 6, alignSelf: 'stretch', borderRadius: 3, marginRight: 12 },
  body: { flex: 1, marginRight: 10 },
  title: { fontSize: 16, fontWeight: '600', color: '#222' },
  desc: { color: '#555', marginTop: 4 },
  date: { color: '#999', fontSize: 12, marginTop: 4 },
  delete: { color: '#d64545', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
});
