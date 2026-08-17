import { Injectable, computed, signal } from '@angular/core';

import { Expense, SEED_EXPENSES } from './expense.model';

/**
 * Single source of truth for expenses.
 *
 * PR #1 (stack-1-db) intentionally ships this read-only: the data layer is
 * reviewable and mergeable on its own. Write operations arrive in PR #2.
 */
@Injectable({ providedIn: 'root' })
export class ExpenseStore {
  private readonly items = signal<Expense[]>([...SEED_EXPENSES]);

  readonly expenses = this.items.asReadonly();

  readonly count = computed(() => this.items().length);
}
