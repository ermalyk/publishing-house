import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book, BookListResponse, BookQuery } from '../../core/models/book.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Load Books': props<{ query: BookQuery }>(),
    'Load Books Success': props<{ response: BookListResponse }>(),
    'Load Books Failure': props<{ error: string }>(),

    'Load Book': props<{ slug: string }>(),
    'Load Book Success': props<{ book: Book }>(),
    'Load Book Failure': props<{ error: string }>(),

    Search: props<{ term: string }>(),
    'Search Success': props<{ items: Book[] }>(),
    'Search Failure': props<{ error: string }>(),
    'Clear Search': emptyProps(),
  },
});
