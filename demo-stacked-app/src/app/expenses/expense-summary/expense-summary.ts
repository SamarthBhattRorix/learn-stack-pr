import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ExpenseStore } from '../expense-store';

@Component({
  selector: 'app-expense-summary',
  imports: [CurrencyPipe],
  template: `
    <section class="panel">
      <header class="panel-head">
        <h2>Summary</h2>
        <span class="muted">{{ store.count() }} expenses</span>
      </header>

      <p class="total">{{ store.total() | currency: 'INR' }}</p>

      <ul class="breakdown">
        @for (row of store.byCategory(); track row.category) {
          <li>
            <div class="row">
              <span class="label">{{ row.category }}</span>
              <span class="muted">{{ row.amount | currency: 'INR' }} &middot; {{ row.share }}%</span>
            </div>
            <div class="bar"><span [style.width.%]="row.share"></span></div>
          </li>
        } @empty {
          <li class="empty">Nothing to summarise yet.</li>
        }
      </ul>
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

    .total {
      margin: 0 0 1.5rem;
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .breakdown {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 1rem;
    }

    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.375rem;
    }

    .label {
      font-weight: 500;
      font-size: 0.875rem;
    }

    .bar {
      height: 6px;
      border-radius: 999px;
      background: var(--bg);
      overflow: hidden;
    }

    .bar span {
      display: block;
      height: 100%;
      background: var(--accent);
    }

    .empty {
      text-align: center;
      color: var(--muted);
      padding-block: 1rem;
    }
  `,
})
export class ExpenseSummary {
  protected readonly store = inject(ExpenseStore);
}
