import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookCard } from '../../shared/components/book-card/book-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { BooksActions } from '../../store/books/books.actions';
import { selectBooks, selectBooksLoading } from '../../store/books/books.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCard, Spinner, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly store = inject(Store);

  protected readonly books = toSignal(this.store.select(selectBooks), { initialValue: [] });
  protected readonly loading = toSignal(this.store.select(selectBooksLoading), {
    initialValue: false,
  });

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks({ query: { featured: true, limit: 8 } }));
  }
}
