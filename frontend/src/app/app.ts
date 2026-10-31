import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { AuthActions } from './store/auth/auth.actions';
import { CartActions } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.restoreSession());
    this.store.dispatch(CartActions.loadCart());
  }
}
