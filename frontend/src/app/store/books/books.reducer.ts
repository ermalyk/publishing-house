import { createFeature, createReducer, on } from '@ngrx/store';
import { Book } from '../../core/models/book.model';
import { BooksActions } from './books.actions';

export interface BooksState {
  items: Book[];
  total: number;
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;

  selected: Book | null;
  selectedLoading: boolean;

  searchResults: Book[];
  searchLoading: boolean;
}

const initialState: BooksState = {
  items: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,

  selected: null,
  selectedLoading: false,

  searchResults: [],
  searchLoading: false,
};

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialState,
    on(BooksActions.loadBooks, (state): BooksState => ({ ...state, loading: true, error: null })),
    on(
      BooksActions.loadBooksSuccess,
      (state, { response }): BooksState => ({
        ...state,
        items: response.items,
        total: response.total,
        page: response.page,
        pages: response.pages,
        loading: false,
      })
    ),
    on(
      BooksActions.loadBooksFailure,
      (state, { error }): BooksState => ({ ...state, loading: false, error })
    ),

    on(
      BooksActions.loadBook,
      (state): BooksState => ({ ...state, selectedLoading: true, selected: null })
    ),
    on(
      BooksActions.loadBookSuccess,
      (state, { book }): BooksState => ({ ...state, selected: book, selectedLoading: false })
    ),
    on(
      BooksActions.loadBookFailure,
      (state, { error }): BooksState => ({ ...state, selectedLoading: false, error })
    ),

    on(BooksActions.search, (state): BooksState => ({ ...state, searchLoading: true })),
    on(
      BooksActions.searchSuccess,
      (state, { items }): BooksState => ({ ...state, searchResults: items, searchLoading: false })
    ),
    on(BooksActions.searchFailure, (state): BooksState => ({ ...state, searchLoading: false })),
    on(
      BooksActions.clearSearch,
      (state): BooksState => ({ ...state, searchResults: [], searchLoading: false })
    )
  ),
});

export const {
  name: booksFeatureKey,
  reducer: booksReducer,
  selectItems: selectBooks,
  selectTotal: selectBooksTotal,
  selectPage: selectBooksPage,
  selectPages: selectBooksPages,
  selectLoading: selectBooksLoading,
  selectSelected: selectSelectedBook,
  selectSelectedLoading: selectSelectedBookLoading,
  selectSearchResults,
  selectSearchLoading,
} = booksFeature;
