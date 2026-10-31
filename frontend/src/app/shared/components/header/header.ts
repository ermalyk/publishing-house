import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from '../../../core/models/book.model';
import { AuthService } from '../../../core/services/auth.service';
import { AuthActions } from '../../../store/auth/auth.actions';
import { BooksActions } from '../../../store/books/books.actions';
import { selectSearchLoading, selectSearchResults } from '../../../store/books/books.reducer';
import { selectCartCount } from '../../../store/cart/cart.selectors';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly auth = inject(AuthService);

  protected readonly cartCount = toSignal(this.store.select(selectCartCount), { initialValue: 0 });
  protected readonly menuOpen = signal(false);

  protected readonly searchOpen = signal(false);
  protected readonly searchTerm = signal('');
  protected readonly searchResults = toSignal(this.store.select(selectSearchResults), {
    initialValue: [],
  });
  protected readonly searchLoading = toSignal(this.store.select(selectSearchLoading), {
    initialValue: false,
  });

  protected readonly navLinks = [
    { path: '/knigi', label: 'Книги' },
    { path: '/e-knigi', label: 'Е-книги' },
    { path: '/celi', label: 'Цели' },
    { path: '/kontakti', label: 'Контакти' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (!this.searchOpen()) {
      this.resetSearch();
    }
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.store.dispatch(BooksActions.search({ term: value }));
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    this.submitSearch();
  }

  submitSearch(): void {
    const term = this.searchTerm().trim();
    if (!term) return;
    this.router.navigate(['/tarsene'], { queryParams: { q: term } });
    this.searchOpen.set(false);
    this.resetSearch();
  }

  goToBook(book: Book): void {
    this.router.navigate(['/knigi', book.slug]);
    this.searchOpen.set(false);
    this.resetSearch();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.searchOpen()) {
      this.searchOpen.set(false);
      this.resetSearch();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.searchOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.searchOpen.set(false);
      this.resetSearch();
    }
  }

  private resetSearch(): void {
    this.searchTerm.set('');
    this.store.dispatch(BooksActions.clearSearch());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
