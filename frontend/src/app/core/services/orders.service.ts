import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';
import { UserAddress } from '../models/user.model';

export interface CreateOrderPayload {
  items: { bookId: string; quantity: number }[];
  shippingAddress: UserAddress;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  create(payload: CreateOrderPayload): Observable<{ order: Order }> {
    return this.http.post<{ order: Order }>(this.baseUrl, payload);
  }

  mine(): Observable<{ items: Order[] }> {
    return this.http.get<{ items: Order[] }>(`${this.baseUrl}/mine`);
  }
}
