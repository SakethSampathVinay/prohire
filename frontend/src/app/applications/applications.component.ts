import { Component } from '@angular/core';
import { assets, JobApplication, jobsApplied } from '../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationsService } from '../services/applications.service';
import { UploadResumeService } from '../services/upload-resume.service';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { ToastrService } from 'ngx-toastr';

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
  selectedFile: File | null = null;
  uploadedResumeUrl: string = '';

  errorMsg = '';

  constructor(
    private applications: ApplicationsService,
    private uploadResume: UploadResumeService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.applications.getAppliedJobs().subscribe({
      next: (res) => {
        this.appliedJobs = res;
        this.toast.success('Successfully retreived job applications');
      },
      error: (err) => {
        console.log('Error Fetching Applied Jobs: ', err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });

    this.applications.getUploadResume().subscribe({
      next: (res) => {
        this.uploadedResumeUrl = res.resume_url;
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
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
    if (this.selectedFile) {
      this.uploadResume.onUploadResume(this.selectedFile).subscribe({
        next: (res) => {
          this.uploadedResumeUrl = res.url || res.secure_url;
          this.isEdit = false;
          this.toast.success('Resume uploaded successfully!!!');
        },
        error: (err) => {
          console.log('Resume upload file: ', err);
          this.errorMsg = `Error: ${err.status} ${err.statusText}`;
          this.toast.error('Something went wrong', this.errorMsg);
        },
      });
    } else {
      this.isEdit = false;
      console.warn('No file selected for upload.');
      this.toast.error('No file selected for upload');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
      } else {
        alert('Please select a valid PDF file.');
      }
    }
  }
}
