import { Injectable, computed, signal } from '@angular/core';

import { Expense, ExpenseCategory, SEED_EXPENSES } from './expense.model';

/**
 * Single source of truth for expenses.
 *
 * PR #1 (stack-1-db) shipped the read side. PR #2 (stack-2-api) adds the
 * write side on top of it. PR #3 (stack-3-ui) adds derived selectors.
 */
@Injectable({ providedIn: 'root' })
export class ExpenseStore {
  private readonly items = signal<Expense[]>([...SEED_EXPENSES]);

  readonly expenses = this.items.asReadonly();

  readonly count = computed(() => this.items().length);

  readonly total = computed(() => this.items().reduce((sum, expense) => sum + expense.amount, 0));

  readonly byCategory = computed(() => {
    const totals = new Map<ExpenseCategory, number>();

    for (const expense of this.items()) {
      totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount);
    }

    const grandTotal = this.total();

    return [...totals.entries()]
      .map(([category, amount]) => ({
        category,
        amount,
        share: grandTotal === 0 ? 0 : Math.round((amount / grandTotal) * 100),
      }))
      .sort((a, b) => b.amount - a.amount);
  });

  add(draft: Omit<Expense, 'id'>): void {
    const expense: Expense = { ...draft, id: crypto.randomUUID() };
    this.items.update((current) => [...current, expense]);
  }

  remove(id: string): void {
    this.items.update((current) => current.filter((expense) => expense.id !== id));
  }
}
