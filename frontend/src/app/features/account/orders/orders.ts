import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';
import { OrdersService } from '../../../core/services/orders.service';
import { Spinner } from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [Spinner, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly ordersService = inject(OrdersService);

  protected readonly orders = signal<Order[]>([]);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.ordersService.mine().subscribe({
      next: ({ items }) => {
        this.orders.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
