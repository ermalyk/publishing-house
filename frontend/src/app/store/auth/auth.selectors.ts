import { createSelector } from '@ngrx/store';
import { selectUser } from './auth.reducer';

export const selectIsLoggedIn = createSelector(selectUser, (user) => user !== null);
export const selectIsAdmin = createSelector(selectUser, (user) => user?.role === 'admin');
