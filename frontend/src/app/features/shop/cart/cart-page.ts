import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartActions } from '../../../store/cart/cart.actions';
import { selectCartTotal } from '../../../store/cart/cart.selectors';
import { selectCartItems } from '../../../store/cart/cart.reducer';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private readonly store = inject(Store);

  protected readonly items = toSignal(this.store.select(selectCartItems), {
    initialValue: [],
  });
  protected readonly total = toSignal(this.store.select(selectCartTotal), { initialValue: 0 });

  updateQuantity(bookId: string, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ bookId, quantity }));
  }

  remove(bookId: string): void {
    this.store.dispatch(CartActions.removeItem({ bookId }));
  }

  clear(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
