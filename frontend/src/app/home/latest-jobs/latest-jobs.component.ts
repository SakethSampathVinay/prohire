import { Component } from '@angular/core';
import { assets, jobsData } from '../../../assets/assets';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-jobs',
  imports: [CommonModule],
  templateUrl: './latest-jobs.component.html',
  styleUrl: './latest-jobs.component.css'
})
export class LatestJobsComponent {
  jobsData = jobsData;
}
