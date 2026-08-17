export type ExpenseCategory = 'Food' | 'Travel' | 'Software' | 'Office' | 'Health';

export interface Expense {
  id: string;
  date: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Travel',
  'Software',
  'Office',
  'Health',
];

export const SEED_EXPENSES: Expense[] = [
  { id: 'e1', date: '2026-08-03', title: 'Team lunch', category: 'Food', amount: 1840 },
  { id: 'e2', date: '2026-08-05', title: 'Cab to client office', category: 'Travel', amount: 460 },
  { id: 'e3', date: '2026-08-08', title: 'Figma seat', category: 'Software', amount: 1250 },
  { id: 'e4', date: '2026-08-11', title: 'Whiteboard markers', category: 'Office', amount: 320 },
  { id: 'e5', date: '2026-08-14', title: 'Flight to Pune', category: 'Travel', amount: 6400 },
  { id: 'e6', date: '2026-08-15', title: 'Annual health checkup', category: 'Health', amount: 2100 },
  { id: 'e7', date: '2026-08-16', title: 'Standing desk mat', category: 'Office', amount: 1490 },
];
