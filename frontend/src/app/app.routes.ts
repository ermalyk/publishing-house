import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Млада гвардия — Издателство',
  },
  {
    path: 'knigi',
    loadComponent: () => import('./features/books/books-list').then((m) => m.BooksList),
    data: { type: 'печатна' },
    title: 'Книги — Млада гвардия',
  },
  {
    path: 'knigi/:slug',
    loadComponent: () => import('./features/books/book-detail').then((m) => m.BookDetail),
    title: 'Книга — Млада гвардия',
  },
  {
    path: 'e-knigi',
    loadComponent: () => import('./features/books/books-list').then((m) => m.BooksList),
    data: { type: 'е-книга' },
    title: 'Е-книги — Млада гвардия',
  },
  {
    path: 'tarsene',
    loadComponent: () => import('./features/search/search').then((m) => m.SearchPage),
    title: 'Търсене — Млада гвардия',
  },
  {
    path: 'celi',
    loadComponent: () => import('./features/goals/goals').then((m) => m.Goals),
    title: 'Цели — Млада гвардия',
  },
  {
    path: 'kontakti',
    loadComponent: () => import('./features/contacts/contacts').then((m) => m.Contacts),
    title: 'Контакти — Млада гвардия',
  },
  {
    path: 'kosnica',
    loadComponent: () => import('./features/shop/cart/cart-page').then((m) => m.CartPage),
    title: 'Количка — Млада гвардия',
  },
  {
    path: 'plashtane',
    loadComponent: () => import('./features/shop/checkout/checkout').then((m) => m.Checkout),
    canActivate: [authGuard],
    title: 'Плащане — Млада гвардия',
  },
  {
    path: 'vhod',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Вход — Млада гвардия',
  },
  {
    path: 'registratsiya',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    title: 'Регистрация — Млада гвардия',
  },
  {
    path: 'profil',
    loadComponent: () => import('./features/account/orders/orders').then((m) => m.Orders),
    canActivate: [authGuard],
    title: 'Моят профил — Млада гвардия',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Страницата не е намерена',
  },
];
