import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user login in
  const router = inject(Router);
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      router.navigate(['/register']);
      return false;
    }
  }
  return false;
};
