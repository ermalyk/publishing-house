import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="spinner" role="status" aria-label="Зареждане"></div>`,
  styles: [
    `
      .spinner {
        width: 34px;
        height: 34px;
        margin: 40px auto;
        border-radius: 50%;
        border: 3px solid var(--color-primary-pale);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class Spinner {}
