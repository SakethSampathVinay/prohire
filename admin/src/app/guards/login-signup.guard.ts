import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginSignupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    if (token) {
      router.navigate(['/']);
      return false;
    }
  }
  return true;
};
