import { Component } from '@angular/core';
import { AddJobsService } from '../services/add-jobs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent {
  errorMsg = '';

  data = {
    title: '',
    description: '',
    category: '',
    location: '',
    level: '',
    salary: '',
  };

  constructor(private addJob: AddJobsService, private toast: ToastrService) {}

  onAddJob(): void {
    this.addJob.addJobs(this.data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.data = {
          title: '',
          description: '',
          category: '',
          location: '',
          level: '',
          salary: '',
        };
        this.toast.success('Job Added Successfully');
      },
      error: (err: any) => {
        console.log(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });
  }
}
