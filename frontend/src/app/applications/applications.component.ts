import { Component } from '@angular/core';
import { assets, JobApplication, jobsApplied } from '../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationsService } from '../services/applications.service';
@Component({
  selector: 'app-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent {
  assets = assets;
  isEdit = false;
  appliedJobs: JobApplication[] = [];

  constructor(private applications: ApplicationsService) {}

  ngOnInit() {
    this.applications.getAppliedJobs().subscribe({
      next: (res) => {
        this.appliedJobs = res;
      },
      error: (err) => {
        console.log('Error Fetching Applied Jobs: ', err);
      },
    });
  }

  getStatusClass(status: string): string {
    if (status === 'Accepted') {
      return 'bg-green-100 text-green-800';
    } else if (status == 'Rejected') {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  }

  onEdit() {
    this.isEdit = true;
  }

  onSave() {
    this.isEdit = false;
  }

  onFileSelected(event: Event) {
    console.log(event);
  }
}
