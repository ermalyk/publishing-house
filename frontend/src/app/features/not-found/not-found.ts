import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section not-found">
      <div class="container">
        <h1>404</h1>
        <p class="text-muted">Страницата, която търсите, не съществува.</p>
        <a class="btn btn-primary" routerLink="/">Към началната страница</a>
      </div>
    </section>
  `,
  styles: [
    `
      .not-found {
        text-align: center;
        padding: 100px 0;
      }
    `,
  ],
})
export class NotFound {}
