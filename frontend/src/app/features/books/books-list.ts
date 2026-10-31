import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookCategory, BookType } from '../../core/models/book.model';
import { BookCard } from '../../shared/components/book-card/book-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { BooksActions } from '../../store/books/books.actions';
import { selectBooks, selectBooksLoading, selectBooksPage, selectBooksPages } from '../../store/books/books.reducer';

const CATEGORIES: BookCategory[] = [
  'история',
  'публицистика',
  'художествена литература',
  'мемоари',
  'поезия',
  'друго',
];

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [BookCard, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected readonly type: BookType = this.route.snapshot.data['type'] ?? 'печатна';
  protected readonly categories = CATEGORIES;

  protected readonly books = toSignal(this.store.select(selectBooks), { initialValue: [] });
  protected readonly loading = toSignal(this.store.select(selectBooksLoading), {
    initialValue: false,
  });
  protected readonly page = toSignal(this.store.select(selectBooksPage), { initialValue: 1 });
  protected readonly pages = toSignal(this.store.select(selectBooksPages), { initialValue: 1 });
  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.pages() }, (_, i) => i + 1)
  );

  protected readonly activeCategory = signal<BookCategory | null>(null);

  protected readonly pageTitle = this.type === 'е-книга' ? 'Е-книги' : 'Книги';

  ngOnInit(): void {
    this.load(1);
  }

  selectCategory(category: BookCategory | null): void {
    this.activeCategory.set(category);
    this.load(1);
  }

  goToPage(page: number): void {
    this.load(page);
  }

  private load(page: number): void {
    this.store.dispatch(
      BooksActions.loadBooks({
        query: {
          type: this.type,
          category: this.activeCategory() ?? undefined,
          page,
          limit: 12,
        },
      })
    );
  }
}
