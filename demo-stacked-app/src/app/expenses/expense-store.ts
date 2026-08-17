import { Injectable, computed, signal } from '@angular/core';

import { Expense, SEED_EXPENSES } from './expense.model';

/**
 * Single source of truth for expenses.
 *
 * PR #1 (stack-1-db) shipped the read side. PR #2 (stack-2-api) adds the
 * write side on top of it.
 */
@Injectable({ providedIn: 'root' })
export class ExpenseStore {
  private readonly items = signal<Expense[]>([...SEED_EXPENSES]);

  readonly expenses = this.items.asReadonly();

  readonly count = computed(() => this.items().length);

  add(draft: Omit<Expense, 'id'>): void {
    const expense: Expense = { ...draft, id: crypto.randomUUID() };
    this.items.update((current) => [...current, expense]);
  }

  remove(id: string): void {
    this.items.update((current) => current.filter((expense) => expense.id !== id));
  }
}
