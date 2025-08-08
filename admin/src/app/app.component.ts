import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { ManageJobsComponent } from "./manage-jobs/manage-jobs.component";
import { AddJobComponent } from "./add-job/add-job.component";
import { ViewApplicationsComponent } from "./view-applications/view-applications.component";
import { HomeComponent } from "./home/home.component";
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin';
}
