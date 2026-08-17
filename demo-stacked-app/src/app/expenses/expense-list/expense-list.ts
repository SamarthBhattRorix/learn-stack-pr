import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { ExpenseStore } from '../expense-store';

@Component({
  selector: 'app-expense-list',
  imports: [CurrencyPipe, DatePipe],
  template: `
    <section class="panel">
      <header class="panel-head">
        <h2>All expenses</h2>
        <span class="muted">{{ store.count() }} recorded</span>
      </header>

      <table class="grid">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th class="right">Amount</th>
          </tr>
        </thead>
        <tbody>
          @for (expense of store.expenses(); track expense.id) {
            <tr>
              <td>{{ expense.date | date: 'dd MMM yyyy' }}</td>
              <td>
                {{ expense.title }}
                <span class="badge">{{ expense.category }}</span>
              </td>
              <td class="right">{{ expense.amount | currency: 'INR' }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="3" class="empty">No expenses yet.</td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: `
    .panel-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.125rem;
    }

    .empty {
      text-align: center;
      color: var(--muted);
      padding-block: 2rem;
    }

    .badge {
      display: inline-block;
      margin-left: 0.5rem;
      padding: 0.0625rem 0.5rem;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  `,
})
export class ExpenseList {
  protected readonly store = inject(ExpenseStore);
}
