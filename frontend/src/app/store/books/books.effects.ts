import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { BooksService } from '../../core/services/books.service';
import { BooksActions } from './books.actions';

@Injectable()
export class BooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly booksService = inject(BooksService);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      switchMap(({ query }) =>
        this.booksService.list(query).pipe(
          map((response) => BooksActions.loadBooksSuccess({ response })),
          catchError((err: HttpErrorResponse) =>
            of(BooksActions.loadBooksFailure({ error: err.error?.message ?? 'Грешка при зареждане.' }))
          )
        )
      )
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBook),
      switchMap(({ slug }) =>
        this.booksService.getBySlug(slug).pipe(
          map(({ book }) => BooksActions.loadBookSuccess({ book })),
          catchError((err: HttpErrorResponse) =>
            of(BooksActions.loadBookFailure({ error: err.error?.message ?? 'Книгата не е намерена.' }))
          )
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.search),
      debounceTime(250),
      distinctUntilChanged((a, b) => a.term === b.term),
      switchMap(({ term }) => {
        if (!term.trim()) {
          return of(BooksActions.searchSuccess({ items: [] }));
        }
        return this.booksService.search(term).pipe(
          map(({ items }) => BooksActions.searchSuccess({ items })),
          catchError((err: HttpErrorResponse) =>
            of(BooksActions.searchFailure({ error: err.error?.message ?? 'Грешка при търсене.' }))
          )
        );
      })
    )
  );
}
