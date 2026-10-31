import { UserAddress } from './user.model';

export interface OrderItem {
  book: string;
  title: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'чакаща' | 'потвърдена' | 'изпратена' | 'доставена' | 'отказана';

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  shippingAddress?: UserAddress;
  status: OrderStatus;
  createdAt: string;
}
