# TaskFlow (React Native)

## Запуск
```
npm install
npx expo install --fix
npx expo start
```

## Структура
- `src/api/tasks.js` — REST-клієнт (GET, POST, DELETE)
- `src/hooks/useTasks.js` — стан задач з API, оптимістичне видалення з відкатом
- `src/utils/validation.js` — валідація даних форми
- `src/db/database.js` — відкриття SQLite та створення таблиці
- `src/db/tasksRepository.js` — запис, читання, видалення в базі
- `src/components/TaskForm.js` — форма: валідація, потім запис у базу
- `src/screens/` — екрани API, форми та збережених задач
