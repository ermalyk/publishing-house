import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Spinner } from '../../shared/components/spinner/spinner';
import { CartActions } from '../../store/cart/cart.actions';
import { BooksActions } from '../../store/books/books.actions';
import { selectSelectedBook, selectSelectedBookLoading } from '../../store/books/books.reducer';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [Spinner, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected readonly book = toSignal(this.store.select(selectSelectedBook), {
    initialValue: null,
  });
  protected readonly loading = toSignal(this.store.select(selectSelectedBookLoading), {
    initialValue: false,
  });

  protected readonly quantity = signal(1);
  protected readonly added = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.store.dispatch(BooksActions.loadBook({ slug }));
    }
  }

  changeQuantity(delta: number): void {
    this.quantity.update((q) => Math.max(1, q + delta));
  }

  addToCart(): void {
    const book = this.book();
    if (!book) return;

    this.store.dispatch(
      CartActions.addItem({
        item: {
          bookId: book._id,
          slug: book.slug,
          title: book.title,
          author: book.author,
          price: book.price,
          coverImage: book.coverImage,
          quantity: this.quantity(),
        },
      })
    );

    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }
}
