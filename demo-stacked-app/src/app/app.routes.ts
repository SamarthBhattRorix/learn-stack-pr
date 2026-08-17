import { Routes } from '@angular/router';

import { ExpenseList } from './expenses/expense-list/expense-list';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpenseList },
  { path: '**', redirectTo: 'expenses' },
];
