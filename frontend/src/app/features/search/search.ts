import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BookCard } from '../../shared/components/book-card/book-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { BooksActions } from '../../store/books/books.actions';
import { selectSearchLoading, selectSearchResults } from '../../store/books/books.reducer';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [BookCard, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchPage {
  private readonly store = inject(Store);

  readonly q = input('');

  protected readonly term = signal('');
  protected readonly results = toSignal(this.store.select(selectSearchResults), {
    initialValue: [],
  });
  protected readonly loading = toSignal(this.store.select(selectSearchLoading), {
    initialValue: false,
  });

  constructor() {
    effect(() => {
      const fromUrl = this.q();
      if (fromUrl && fromUrl !== this.term()) {
        this.term.set(fromUrl);
        this.store.dispatch(BooksActions.search({ term: fromUrl }));
      }
    });
  }

  onInput(value: string): void {
    this.term.set(value);
    this.store.dispatch(BooksActions.search({ term: value }));
  }
}
