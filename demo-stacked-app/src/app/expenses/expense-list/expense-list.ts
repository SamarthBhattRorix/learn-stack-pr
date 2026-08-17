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
            <th>Category</th>
            <th class="right">Amount</th>
            <th class="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (expense of store.expenses(); track expense.id) {
            <tr>
              <td>{{ expense.date | date: 'dd MMM yyyy' }}</td>
              <td>{{ expense.title }}</td>
              <td>{{ expense.category }}</td>
              <td class="right">{{ expense.amount | currency: 'INR' }}</td>
              <td class="right">
                <button type="button" class="danger" (click)="store.remove(expense.id)">
                  Delete
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="empty">No expenses yet.</td>
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

    .danger {
      padding: 0;
      border: 0;
      background: none;
      color: #b91c1c;
      font: inherit;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .danger:hover {
      text-decoration: underline;
    }
  `,
})
export class ExpenseList {
  protected readonly store = inject(ExpenseStore);
}
