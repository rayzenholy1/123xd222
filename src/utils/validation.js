export const PRIORITIES = ['low', 'medium', 'high'];

export function validateTask({ title = '', description = '', priority = 'medium' }) {
  const errors = {};
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (!cleanTitle) errors.title = 'Введіть назву задачі';
  else if (cleanTitle.length < 3) errors.title = 'Назва має містити мінімум 3 символи';
  else if (cleanTitle.length > 100) errors.title = 'Назва не може перевищувати 100 символів';

  if (cleanDescription.length > 500) errors.description = 'Опис не може перевищувати 500 символів';

  if (!PRIORITIES.includes(priority)) errors.priority = 'Оберіть пріоритет';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { title: cleanTitle, description: cleanDescription, priority },
  };
}
