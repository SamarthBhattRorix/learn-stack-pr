import { Routes } from '@angular/router';

import { ExpenseForm } from './expenses/expense-form/expense-form';
import { ExpenseList } from './expenses/expense-list/expense-list';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpenseList },
  { path: 'expenses/new', component: ExpenseForm },
  { path: '**', redirectTo: 'expenses' },
];
