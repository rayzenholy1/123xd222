import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ task, deleting, onDelete }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.title, task.completed && styles.done]} numberOfLines={2}>
        {task.title}
      </Text>
      {deleting ? (
        <ActivityIndicator color="#d64545" />
      ) : (
        <Pressable onPress={() => onDelete(task)} hitSlop={10} style={styles.btn}>
          <Text style={styles.btnText}>Видалити</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 14, marginBottom: 8, borderRadius: 10,
  },
  title: { flex: 1, fontSize: 16, color: '#222', marginRight: 10 },
  done: { textDecorationLine: 'line-through', color: '#999' },
  btn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#fdecec' },
  btnText: { color: '#d64545', fontWeight: '600' },
});
