import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EXPENSE_CATEGORIES, ExpenseCategory } from '../expense.model';
import { ExpenseStore } from '../expense-store';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  template: `
    <section class="panel">
      <header class="panel-head">
        <h2>Add expense</h2>
        <span class="muted">Saved straight into the store</span>
      </header>

      <form class="form" (ngSubmit)="save()">
        <label>
          <span>Title</span>
          <input name="title" type="text" placeholder="Team lunch" [(ngModel)]="title" />
        </label>

        <label>
          <span>Amount</span>
          <input name="amount" type="number" min="1" placeholder="0" [(ngModel)]="amount" />
        </label>

        <label>
          <span>Category</span>
          <select name="category" [(ngModel)]="category">
            @for (option of categories; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </label>

        <label>
          <span>Date</span>
          <input name="date" type="date" [(ngModel)]="date" />
        </label>

        <div class="actions">
          <button type="submit" [disabled]="!canSave()">Save expense</button>
        </div>
      </form>
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

    .form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--muted);
    }

    input,
    select {
      padding: 0.5rem 0.625rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      font: inherit;
      color: var(--text);
      background: var(--surface);
    }

    input:focus,
    select:focus {
      outline: 2px solid var(--accent);
      outline-offset: -1px;
    }

    .actions {
      grid-column: 1 / -1;
    }

    button {
      padding: 0.5rem 1rem;
      border: 0;
      border-radius: 6px;
      background: var(--accent);
      color: #fff;
      font: inherit;
      font-weight: 500;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  `,
})
export class ExpenseForm {
  private readonly store = inject(ExpenseStore);
  private readonly router = inject(Router);

  protected readonly categories = EXPENSE_CATEGORIES;

  protected title = '';
  protected amount: number | null = null;
  protected category: ExpenseCategory = 'Food';
  protected date = new Date().toISOString().slice(0, 10);

  protected canSave(): boolean {
    return this.title.trim().length > 0 && !!this.amount && this.amount > 0;
  }

  protected save(): void {
    if (!this.canSave()) {
      return;
    }

    this.store.add({
      title: this.title.trim(),
      amount: Number(this.amount),
      category: this.category,
      date: this.date,
    });

    this.router.navigate(['/expenses']);
  }
}
