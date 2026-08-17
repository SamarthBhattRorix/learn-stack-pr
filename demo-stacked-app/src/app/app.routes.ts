import { Routes } from '@angular/router';

import { ExpenseForm } from './expenses/expense-form/expense-form';
import { ExpenseList } from './expenses/expense-list/expense-list';
import { ExpenseSummary } from './expenses/expense-summary/expense-summary';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpenseList },
  { path: 'expenses/new', component: ExpenseForm },
  { path: 'expenses/summary', component: ExpenseSummary },
  { path: '**', redirectTo: 'expenses' },
];
