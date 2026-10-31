import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';
import { CartActions } from './cart.actions';
import { CartItem } from './cart.model';
import { selectCartItems } from './cart.reducer';

const STORAGE_KEY = 'mg_cart';

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => CartActions.cartLoaded({ items: readCart() }))
    )
  );

  persistCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addItem,
          CartActions.removeItem,
          CartActions.updateQuantity,
          CartActions.clearCart
        ),
        withLatestFrom(this.store.select(selectCartItems)),
        tap(([, items]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)))
      ),
    { dispatch: false }
  );
}
