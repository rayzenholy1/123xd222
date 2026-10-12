import React, { useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import TaskListScreen from './src/screens/TaskListScreen';
import FormScreen from './src/screens/FormScreen';
import SavedTasksScreen from './src/screens/SavedTasksScreen';

const TABS = [
  { key: 'api', label: 'API' },
  { key: 'form', label: 'Форма' },
  { key: 'saved', label: 'База' },
];

export default function App() {
  const [tab, setTab] = useState('api');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        {tab === 'api' && <TaskListScreen />}
        {tab === 'form' && <FormScreen onSaved={() => setTab('saved')} />}
        {tab === 'saved' && <SavedTasksScreen />}
      </View>
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f5f7' },
  screen: { flex: 1 },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e3e6ec' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabText: { color: '#888', fontWeight: '600' },
  tabTextActive: { color: '#3b6cf6' },
});
