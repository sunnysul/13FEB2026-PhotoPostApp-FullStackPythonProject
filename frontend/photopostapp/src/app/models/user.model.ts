export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}
