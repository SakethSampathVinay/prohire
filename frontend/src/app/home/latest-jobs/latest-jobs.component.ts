import { Component, Input } from '@angular/core';
import { assets, Job, jobsData } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LatestJobsService } from '../../services/latest-jobs.service';

@Component({
  selector: 'app-latest-jobs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './latest-jobs.component.html',
  styleUrl: './latest-jobs.component.css',
})
export class LatestJobsComponent {
  jobsData = jobsData;

  constructor(private latestJobsService: LatestJobsService) {}

  ngOnInit() {
    this.latestJobsService.getLatestJobs().subscribe((res) => {
      this.jobs = res.Jobs;
      console.log(this.jobs);
    });
  }

  @Input() jobs: Job[] = [];

  getPlanText(html: string) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
}
