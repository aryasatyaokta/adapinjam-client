import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard untuk memeriksa apakah fitur tersedia dalam fitur yang disimpan di localStorage.
 * Gunakan saat konfigurasi route seperti:
 * {
 *   path: 'dashboard',
 *   loadComponent: () => import('...'),
 *   canActivate: [featureGuard('DASHBOARD_BM')]
 * }
 */
export function featureGuard(feature: string): CanActivateFn {
  return () => {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);
  };
}
