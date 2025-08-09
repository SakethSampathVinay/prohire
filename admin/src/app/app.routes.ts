import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginSignupGuard } from './guards/login-signup.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'manage-jobs',
        loadComponent: () =>
          import('./manage-jobs/manage-jobs.component').then(
            (c) => c.ManageJobsComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'add-job',
        loadComponent: () =>
          import('./add-job/add-job.component').then((c) => c.AddJobComponent),
        canActivate: [authGuard],
      },
      {
        path: 'view-applications',
        loadComponent: () =>
          import('./view-applications/view-applications.component').then(
            (c) => c.ViewApplicationsComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((c) => c.SignupComponent),
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
      import('./page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
