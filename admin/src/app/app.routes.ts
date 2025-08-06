import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginSignupGuard } from './guards/login-signup.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'manage-jobs',
        component: ManageJobsComponent,
        canActivate: [authGuard],
      },
      { path: 'add-job', component: AddJobComponent, canActivate: [authGuard] },
      {
        path: 'view-applications',
        component: ViewApplicationsComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'register',
    component: SignupComponent,
    canActivate: [loginSignupGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [loginSignupGuard] }
];
