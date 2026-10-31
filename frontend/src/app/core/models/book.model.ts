export type BookCategory =
  | 'история'
  | 'публицистика'
  | 'художествена литература'
  | 'мемоари'
  | 'поезия'
  | 'друго';

export type BookType = 'печатна' | 'е-книга';

export interface Book {
  _id: string;
  title: string;
  author: string;
  slug: string;
  description: string;
  category: BookCategory;
  type: BookType;
  price: number;
  coverImage?: string;
  isbn?: string;
  pages?: number;
  publishedYear?: number;
  stock: number;
  featured: boolean;
  tags: string[];
  createdAt?: string;
}

export interface BookListResponse {
  items: Book[];
  total: number;
  page: number;
  pages: number;
}

export interface BookQuery {
  page?: number;
  limit?: number;
  type?: BookType;
  category?: BookCategory;
  featured?: boolean;
  q?: string;
}
