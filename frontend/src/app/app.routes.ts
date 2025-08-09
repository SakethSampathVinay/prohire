import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginSignupGuard } from './guards/login-signup.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'jobdetails/:id',
    loadComponent: () =>
      import('./job-details/job-details.component').then(
        (c) => c.JobDetailsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./applications/applications.component').then(
        (c) => c.ApplicationsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [loginSignupGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
    canActivate: [loginSignupGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pagenotfound/pagenotfound.component').then(
        (c) => c.PagenotfoundComponent
      ),
  },
];
