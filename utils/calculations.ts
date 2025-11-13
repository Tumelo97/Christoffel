// utils/calculations.ts
import { MenuItem, Course } from '../types';

export const getTotalItems = (items: MenuItem[]) => items.length;

export const getAveragePriceByCourse = (items: MenuItem[], course: Course) => {
  const filtered = items.filter(i => i.course === course);
  if (filtered.length === 0) return 0;
  const sum = filtered.reduce((acc, i) => acc + i.price, 0);
  return sum / filtered.length;
};

export const getItemsByCourse = (items: MenuItem[], course: Course | 'All') => {
  if (course === 'All') return items;
  return items.filter(i => i.course === course);
};