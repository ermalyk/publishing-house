export type UserRole = 'user' | 'admin';

export interface UserAddress {
  city?: string;
  line1?: string;
  postalCode?: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: UserAddress;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
