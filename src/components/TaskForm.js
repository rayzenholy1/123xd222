import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PRIORITIES, validateTask } from '../utils/validation';
import { insertTask } from '../db/tasksRepository';

const LABELS = { low: 'Низький', medium: 'Середній', high: 'Високий' };

export default function TaskForm({ onSaved }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const result = validateTask({ title, description, priority });
    setErrors(result.errors);
    if (!result.valid) return;

    setSaving(true);
    try {
      await insertTask(result.values);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setErrors({});
      onSaved();
    } catch (e) {
      Alert.alert('Не вдалося зберегти', e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Назва</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        value={title}
        onChangeText={setTitle}
        placeholder="Наприклад, підготувати звіт"
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Опис</Text>
      <TextInput
        style={[styles.input, styles.multiline, errors.description && styles.inputError]}
        value={description}
        onChangeText={setDescription}
        placeholder="Необов'язково"
        multiline
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <Text style={styles.label}>Пріоритет</Text>
      <View style={styles.priorityRow}>
        {PRIORITIES.map((p) => (
          <Pressable
            key={p}
            onPress={() => setPriority(p)}
            style={[styles.chip, priority === p && styles.chipActive]}
          >
            <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{LABELS[p]}</Text>
          </Pressable>
        ))}
      </View>
      {errors.priority && <Text style={styles.error}>{errors.priority}</Text>}

      <Pressable style={[styles.submit, saving && styles.submitDisabled]} onPress={handleSubmit} disabled={saving}>
        <Text style={styles.submitText}>{saving ? 'Збереження...' : 'Зберегти в базу'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, borderWidth: 1, borderColor: '#fff' },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  inputError: { borderColor: '#d64545' },
  error: { color: '#d64545', marginTop: 4, fontSize: 13 },
  priorityRow: { flexDirection: 'row' },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#e3e6ec', marginRight: 8 },
  chipActive: { backgroundColor: '#3b6cf6' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  submit: { marginTop: 24, backgroundColor: '#3b6cf6', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
