import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      AuthActions.login,
      AuthActions.register,
      (state): AuthState => ({ ...state, loading: true, error: null })
    ),
    on(
      AuthActions.loginSuccess,
      AuthActions.registerSuccess,
      (state, { user }): AuthState => ({ ...state, user, loading: false, error: null })
    ),
    on(
      AuthActions.loginFailure,
      AuthActions.registerFailure,
      (state, { error }): AuthState => ({ ...state, loading: false, error })
    ),
    on(AuthActions.restoreSession, (state): AuthState => state),
    on(
      AuthActions.sessionRestored,
      (state, { user }): AuthState => ({ ...state, user })
    ),
    on(AuthActions.logout, (): AuthState => initialState)
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectUser,
  selectLoading: selectAuthLoading,
  selectError: selectAuthError,
} = authFeature;
