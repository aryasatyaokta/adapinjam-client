import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth'; // Change to your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method to send credentials to the backend and store the token
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login-employee`, {
      username,
      password,
    }).pipe(
      catchError(error => {
        return throwError('Login failed. Please check your credentials.');
      })
    );
  }

  logout() {
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.baseUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text'  // Tambahkan ini
      }).subscribe({
        next: () => {
          this.clearSession();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed', err);
          this.clearSession();
          this.router.navigate(['/login']);
        },
      });      
    } else {
      this.clearSession();
      this.router.navigate(['/login']);
    }
  }

  setSession(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('token', token);
    localStorage.setItem('role', payload.role);
    localStorage.setItem('name', payload.name);
    localStorage.setItem('features',JSON.stringify(payload.features));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUsername(): string | null {
    return localStorage.getItem('name');
  }

  getFeature(): string | null {
    return localStorage.getItem('feature');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  requestPasswordReset(nip: string) {
    return this.http.post('http://localhost:8080/api/v1/reset-password/employee', { nip }, { responseType: 'text' }).pipe(
      catchError(err => throwError(() => err.error || 'Permintaan reset gagal.'))
    );
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string) {
    return this.http.post(
      `http://localhost:8080/api/v1/reset-password/employee/reset/${token}`,
      { newPassword, confirmPassword },
      { responseType: 'text' }
    ).pipe(
      catchError(err => throwError(() => err.error || 'Reset password gagal.'))
    );
  }
}
