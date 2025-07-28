import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { assets, JobCategories, JobLocations } from '../../../assets/assets';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})

export class FiltersComponent {
  jobCategories = JobCategories;
  jobLocations = JobLocations;
}
