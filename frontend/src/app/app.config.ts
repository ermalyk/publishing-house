import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authFeatureKey, authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { booksFeatureKey, booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { cartFeatureKey, cartReducer } from './store/cart/cart.reducer';
import { CartEffects } from './store/cart/cart.effects';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      [authFeatureKey]: authReducer,
      [booksFeatureKey]: booksReducer,
      [cartFeatureKey]: cartReducer,
    }),
    provideEffects([AuthEffects, BooksEffects, CartEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  ],
};
