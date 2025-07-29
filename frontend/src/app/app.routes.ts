import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'jobdetails/:id', component: JobDetailsComponent}
];
