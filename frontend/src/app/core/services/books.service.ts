import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book, BookListResponse, BookQuery } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/books`;

  list(query: BookQuery = {}): Observable<BookListResponse> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<BookListResponse>(this.baseUrl, { params });
  }

  getBySlug(slug: string): Observable<{ book: Book }> {
    return this.http.get<{ book: Book }>(`${this.baseUrl}/${slug}`);
  }

  search(q: string): Observable<{ items: Book[] }> {
    return this.http.get<{ items: Book[] }>(`${environment.apiUrl}/search`, {
      params: new HttpParams().set('q', q),
    });
  }
}
