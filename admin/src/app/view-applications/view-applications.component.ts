import { Component, OnInit } from '@angular/core';
import { ViewApplicationsService } from '../services/view-applications.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
})
export class ViewApplicationsComponent implements OnInit {
  errorMsg = '';

  application: any[] = [];
  companyId: string = '';

  constructor(
    private viewApplications: ViewApplicationsService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyId = localStorage.getItem('companyId') || '';
    this.viewApplications.onViewApplication(this.companyId).subscribe({
      next: (response) => {
        this.application = response.applications;
        this.toast.success('successfully viewed applications', 'Success');
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });
  }

  onStatusChange(item: any) {
    this.viewApplications
      .changeStatus(item.application_id, item.status)
      .subscribe({
        next: (res) => {
          this.toast.success('Status updated successfully', 'Success');
        },
        error: (err) => {
          console.error('Error updating status', err);
          this.errorMsg = `Error: ${err.status} ${err.statusText}`;
          this.toast.error('Something went wrong', this.errorMsg);
        },
      });
  }
}
