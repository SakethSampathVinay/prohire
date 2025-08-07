import { Component } from '@angular/core';
import { ManageJobsService } from '../services/manage-jobs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css',
})
export class ManageJobsComponent {
  
  companyid: string | null = null;
  jobsList: any = [];

  constructor(private manageJobs: ManageJobsService) {}

  ngOnInit() {
    this.companyid = localStorage.getItem('companyId');
    this.manageJobs.onManageJobs(this.companyid).subscribe({
      next: (response) => {
        this.jobsList = response.jobs;
        console.log(this.jobsList);
      }, error: (err) => {
        console.log(err);
      } 
    })
  }
}
