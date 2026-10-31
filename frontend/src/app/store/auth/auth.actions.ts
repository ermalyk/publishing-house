import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginPayload, RegisterPayload, User } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Restore Session': emptyProps(),
    'Session Restored': props<{ user: User }>(),
    Login: props<{ payload: LoginPayload }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    Register: props<{ payload: RegisterPayload }>(),
    'Register Success': props<{ user: User }>(),
    'Register Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
