import { Component } from '@angular/core';
import { assets, jobsData } from '../../assets/assets';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatedjobsComponent } from './relatedjobs/relatedjobs.component';
import { LatestJobsService } from '../services/latest-jobs.service';
import { ApplyNowService } from '../services/apply-now.service';
import { ToastrService } from 'ngx-toastr';

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
  isApplied: boolean = false;
  applyNowDisplay: string = 'Apply Now';

  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private latestJobs: LatestJobsService,
    private applyNow: ApplyNowService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id) {
        this.latestJobs.getLatestJobs().subscribe((res: any) => {
          this.jobsList = res.Jobs;
          this.jobDetails = this.jobsList.find((job) => job._id === this.id);
          this.toast.success('Job details loaded successfully', 'Success');
          this.relatedJobs = this.jobsList.filter(
            (relJobs: any) =>
              relJobs.companyId.name === this.jobDetails.companyId.name &&
              relJobs._id !== this.id
          );
        });
      }
    });

    this.applyNow.checkIfApplied(this.id).subscribe({
      next: (res: any) => {
        if (res.isApplied) {
          this.applyNowDisplay = 'Applied';
          this.isApplied = true;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onApplyNow() {
    if (this.id) {
      this.applyNow.applyNow(this.id).subscribe({
        next: (res) => {
          this.toast.success('Applied Successfully', 'Success');
          this.applyNowDisplay = 'Applied';
          this.isApplied = true;
        },
        error: (err) => {
          this.errorMsg = `Error: ${err.error?.detail}`;
          this.router.navigate(['/applications']);
          this.toast.error(this.errorMsg);
        },
      });
    }
  }
}
