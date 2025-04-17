import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.getRole();
    if (role === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
};
