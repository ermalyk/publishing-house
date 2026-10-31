import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrdersService } from '../../../core/services/orders.service';
import { CartActions } from '../../../store/cart/cart.actions';
import { selectCartTotal } from '../../../store/cart/cart.selectors';
import { selectCartItems } from '../../../store/cart/cart.reducer';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  protected readonly items = toSignal(this.store.select(selectCartItems), { initialValue: [] });
  protected readonly total = toSignal(this.store.select(selectCartTotal), { initialValue: 0 });

  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    city: ['', Validators.required],
    line1: ['', Validators.required],
    postalCode: ['', Validators.required],
    phone: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.items().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.ordersService
      .create({
        items: this.items().map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
        shippingAddress: this.form.getRawValue(),
      })
      .subscribe({
        next: ({ order }) => {
          this.submitting.set(false);
          this.store.dispatch(CartActions.clearCart());
          this.router.navigate(['/profil'], { queryParams: { order: order._id } });
        },
        error: (err) => {
          this.submitting.set(false);
          this.error.set(err.error?.message ?? 'Възникна грешка при поръчката.');
        },
      });
  }
}
