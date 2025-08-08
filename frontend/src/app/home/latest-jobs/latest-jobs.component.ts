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

  constructor(private latestJobsService: LatestJobsService, private toast: ToastrService) {}

  ngOnInit() {
    this.latestJobsService.getLatestJobs().subscribe((res) => {
      this.jobs = res.Jobs;
      this.toast.success('Successfully loaded latest jobs');
    });
  }

  @Input() jobs: Job[] = [];

  getPlanText(html: string) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
}
