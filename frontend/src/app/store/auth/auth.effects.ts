import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      map(() => this.authService.user()),
      filter((user): user is NonNullable<typeof user> => user !== null),
      map((user) => AuthActions.sessionRestored({ user }))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map(({ user }) => AuthActions.loginSuccess({ user })),
          catchError((err: HttpErrorResponse) =>
            of(AuthActions.loginFailure({ error: err.error?.message ?? 'Грешка при вход.' }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map(({ user }) => AuthActions.registerSuccess({ user })),
          catchError((err: HttpErrorResponse) =>
            of(AuthActions.registerFailure({ error: err.error?.message ?? 'Грешка при регистрация.' }))
          )
        )
      )
    )
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/profil']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
