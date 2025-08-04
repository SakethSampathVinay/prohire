import { Component } from '@angular/core';
import { assets, jobsData } from '../../assets/assets';
import { ActivatedRoute } from '@angular/router';
import { RelatedjobsComponent } from './relatedjobs/relatedjobs.component';
import { LatestJobsService } from '../services/latest-jobs.service';
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
  jobsList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private latestJobs: LatestJobsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.latestJobs.getLatestJobs().subscribe((res) => {
          this.jobsList = res.Jobs;
          console.log(this.jobsList);
          this.jobDetails = this.jobsList.find((job) => job._id === this.id);
          this.relatedJobs = this.jobsList.filter(
            (relJobs) =>
              relJobs.companyId.name === this.jobDetails.companyId.name &&
              relJobs._id !== this.id
          );
        });
      }
    });
  }
}
