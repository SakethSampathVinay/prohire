import { Component } from '@angular/core';
import { assets, jobsApplied } from '../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent {
  assets = assets;
  jobsApplied: any[] = jobsApplied;
  isEdit = false;

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
