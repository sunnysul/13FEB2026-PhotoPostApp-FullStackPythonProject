import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';
  
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());
  
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.tokenSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.role === 'admin');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        if (response.access_token) {
          this.setToken(response.access_token);
          if (response.user) {
            this.setUser(response.user);
          } else {
            this.loadProfile().subscribe();
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/profile`).pipe(
      tap(user => this.setUser(user))
    );
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  private getTokenFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }
}
