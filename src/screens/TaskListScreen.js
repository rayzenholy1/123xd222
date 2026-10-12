import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import useTasks from '../hooks/useTasks';

export default function TaskListScreen() {
  const { tasks, loading, refreshing, error, deletingIds, load, add, remove } = useTasks();
  const [text, setText] = useState('');

  const handleAdd = async () => {
    const title = text.trim();
    if (!title) return;
    try {
      await add(title);
      setText('');
    } catch (e) {
      Alert.alert('Не вдалося додати задачу', e.message);
    }
  };

  const confirmDelete = (task) => {
    Alert.alert('Видалити задачу?', task.title, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () =>
          remove(task.id).catch((e) =>
            Alert.alert('Не вдалося видалити', `${e.message}\nЗадачу повернуто в список.`)
          ),
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskFlow</Text>

      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Нова задача..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
        />
        <Pressable style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      {error && (
        <Pressable onPress={() => load()}>
          <Text style={styles.error}>{error}. Натисніть, щоб повторити.</Text>
        </Pressable>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} deleting={deletingIds.includes(item.id)} onDelete={confirmDelete} />
        )}
        refreshing={refreshing}
        onRefresh={() => load(true)}
        ListEmptyComponent={<Text style={styles.empty}>Задач немає</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addRow: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, height: 44 },
  addBtn: {
    width: 44, height: 44, marginLeft: 8, borderRadius: 10,
    backgroundColor: '#3b6cf6', alignItems: 'center', justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 24, lineHeight: 26 },
  error: { color: '#d64545', marginBottom: 8 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
});
