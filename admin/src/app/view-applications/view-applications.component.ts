import { Component, OnInit } from '@angular/core';
import { ViewApplicationsService } from '../services/view-applications.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  application: any[] = [];
  companyId: string = '';

  constructor(private viewApplications: ViewApplicationsService) {}

  ngOnInit(): void {
    this.companyId = localStorage.getItem('companyId') || '';
    this.viewApplications.onViewApplication(this.companyId).subscribe({
      next: (response) => {
        this.application = response.applications;
        console.log(response.applications);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
