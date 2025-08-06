import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginSignupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the router service to navigate if a token exists
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    router.navigate(['/']);
    return false;
  }
  return true;
};
