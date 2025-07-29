import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FiltersComponent } from './filters/filters.component';
import { LatestJobsComponent } from './latest-jobs/latest-jobs.component';
import { AppDowloadComponent } from './app-dowload/app-dowload.component';
import { assets, jobsData } from '../../assets/assets';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FiltersComponent,
    LatestJobsComponent,
    AppDowloadComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allJobs = jobsData;
  filteredJobs = jobsData;

  handleSearchChange(event: { job: string; location: string }) {
    const title = event.job.toLowerCase();
    const location = event.location.toLowerCase();
    this.filteredJobs = this.allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(title) &&
        job.location.toLowerCase().includes(location)
    );
  }

  handleFilteredChanges(event: { categories: string[]; location: string[] }) {
    const lowerCaseCategories = event.categories;
    const lowerCaseLocations = event.location;

    this.filteredJobs = this.allJobs.filter((job) => {
      const categoryMatch =
        lowerCaseCategories.length == 0 ||
        lowerCaseCategories.includes(job.category);
      const locationMatch =
        lowerCaseLocations.length == 0 ||
        lowerCaseLocations.includes(job.location);
      return categoryMatch && locationMatch;
    });
  }
}
