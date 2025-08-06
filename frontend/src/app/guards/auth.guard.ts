import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    if (isAuthenticated) {
      return true;
    } else {
      router.navigate(['/register']);
      return false;
    }
  }
  return false;
};
