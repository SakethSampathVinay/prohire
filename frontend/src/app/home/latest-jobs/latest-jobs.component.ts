import { Component, Input } from '@angular/core';
import { assets, Job, jobsData } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LatestJobsService } from '../../services/latest-jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-latest-jobs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './latest-jobs.component.html',
  styleUrl: './latest-jobs.component.css',
})
export class LatestJobsComponent {
  jobsData = jobsData;

  constructor(
    private latestJobsService: LatestJobsService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.latestJobsService.getLatestJobs().subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.jobs = res.Jobs.filter((job: any) => job.isVisible);
        this.toast.success('Successfully loaded latest jobs');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  @Input() jobs: Job[] = [];

  getPlanText(html: string) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
}
