export interface CartItem {
  bookId: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  quantity: number;
}
