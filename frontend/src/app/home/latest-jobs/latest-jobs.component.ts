import { Component, Input } from '@angular/core';
import { assets, jobsData } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-jobs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './latest-jobs.component.html',
  styleUrl: './latest-jobs.component.css',
})
export class LatestJobsComponent {
  jobsData = jobsData;

  @Input() jobs: any[] = [];

  getPlanText(html: string) {
    const temp = document.createElement('div')
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
}
