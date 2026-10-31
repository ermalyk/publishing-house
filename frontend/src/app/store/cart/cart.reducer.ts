import { createFeature, createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { CartItem } from './cart.model';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.cartLoaded, (state, { items }): CartState => ({ ...state, items })),
    on(CartActions.addItem, (state, { item }): CartState => {
      const existing = state.items.find((i) => i.bookId === item.bookId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.bookId === item.bookId ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, item] };
    }),
    on(
      CartActions.removeItem,
      (state, { bookId }): CartState => ({
        ...state,
        items: state.items.filter((i) => i.bookId !== bookId),
      })
    ),
    on(
      CartActions.updateQuantity,
      (state, { bookId, quantity }): CartState => ({
        ...state,
        items: state.items
          .map((i) => (i.bookId === bookId ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0),
      })
    ),
    on(CartActions.clearCart, (state): CartState => ({ ...state, items: [] }))
  ),
});

export const { name: cartFeatureKey, reducer: cartReducer, selectItems: selectCartItems } =
  cartFeature;
