import { Component } from '@angular/core';
import { AddJobsService } from '../services/add-jobs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-job',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css',
})
export class AddJobComponent {
  data = {
    title: '',
    description: '',
    category: '',
    location: '',
    level: '',
    salary: '',
  };

  constructor(private addJob: AddJobsService) {}

  onAddJob(): void{
    this.addJob.addJobs(this.data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        console.log(err.err);
      }
    })
  }
}
