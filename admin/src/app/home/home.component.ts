import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddJobComponent } from '../add-job/add-job.component';
import { ManageJobsComponent } from '../manage-jobs/manage-jobs.component';
import { ViewApplicationsComponent } from '../view-applications/view-applications.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
