import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { FiltersComponent } from "./filters/filters.component";
import { LatestJobsComponent } from "./latest-jobs/latest-jobs.component";
import { AppDowloadComponent } from "./app-dowload/app-dowload.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FiltersComponent, LatestJobsComponent, AppDowloadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
