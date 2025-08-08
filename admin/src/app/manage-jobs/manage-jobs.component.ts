import { Component } from '@angular/core';
import { ManageJobsService } from '../services/manage-jobs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css',
})
export class ManageJobsComponent {
  errorMsg = '';

  companyid: string | null = null;
  jobsList: any = [];

  constructor(
    private manageJobs: ManageJobsService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.companyid = localStorage.getItem('companyId');
    this.manageJobs.onManageJobs(this.companyid).subscribe({
      next: (response) => {
        this.jobsList = response.jobs;
        this.toast.success('Successfully jobs loaded', 'Success');
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });
  }
}
