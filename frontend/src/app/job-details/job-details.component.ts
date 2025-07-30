import { Component } from '@angular/core';
import { assets, jobsData } from '../../assets/assets';
import { ActivatedRoute } from '@angular/router';
import { RelatedjobsComponent } from './relatedjobs/relatedjobs.component';
@Component({
  selector: 'app-job-details',
  imports: [RelatedjobsComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  suitcaseIcon = assets.suitcase_icon;
  locationIcon = assets.location_icon;
  personIcon = assets.person_icon;
  moneyIcon = assets.money_icon;

  id: string | null = null;
  jobDetails: any;
  relatedJobs: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.jobDetails = jobsData.find((job) => job._id === this.id);
      }

      if (this.jobDetails) {
        this.relatedJobs = jobsData.filter(
          (relJobs) =>
            relJobs.companyId.name === this.jobDetails.companyId.name &&
            relJobs._id !== this.id
        );
      }
    });
  }
}
