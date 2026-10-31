import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from './cart.model';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Cart Loaded': props<{ items: CartItem[] }>(),
    'Add Item': props<{ item: CartItem }>(),
    'Remove Item': props<{ bookId: string }>(),
    'Update Quantity': props<{ bookId: string; quantity: number }>(),
    'Clear Cart': emptyProps(),
  },
});
