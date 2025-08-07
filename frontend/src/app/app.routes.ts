import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplicationsComponent } from './applications/applications.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { authGuard } from './guards/auth.guard';
import { loginSignupGuard } from './guards/login-signup.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'jobdetails/:id',
    component: JobDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginSignupGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [loginSignupGuard] },
  // { path: '**', component: PagenotfoundComponent },
];
