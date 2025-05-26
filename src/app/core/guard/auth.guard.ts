import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();

  // Jika belum login, arahkan ke /login
  if (!isLoggedIn) {
    window.location.href = '/login'; // Bisa pakai Router juga
    return false;
  }

  return true;
};
