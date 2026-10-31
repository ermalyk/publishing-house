import { createSelector } from '@ngrx/store';
import { selectCartItems } from './cart.reducer';

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.quantity * i.price, 0)
);
