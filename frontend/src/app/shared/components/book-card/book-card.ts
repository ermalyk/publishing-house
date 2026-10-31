import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from '../../../core/models/book.model';
import { CartActions } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private readonly store = inject(Store);

  readonly book = input.required<Book>();

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const book = this.book();
    this.store.dispatch(
      CartActions.addItem({
        item: {
          bookId: book._id,
          slug: book.slug,
          title: book.title,
          author: book.author,
          price: book.price,
          coverImage: book.coverImage,
          quantity: 1,
        },
      })
    );
  }
}
