import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { assets, JobCategories, JobLocations } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
import { emit } from 'process';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  jobCategories = JobCategories;
  jobLocations = JobLocations;

  filterCategories: string[] = [];
  locationCategories: string[] = [];

  @Output() filteredChanges = new EventEmitter<{
    categories: string[];
    location: string[];
  }>();

  emitFilters() {
    this.filteredChanges.emit({
      categories: this.filterCategories,
      location: this.locationCategories,
    });
  }

  onCategoryChange(event: Event, category: string) {
    const checked = (event?.target as HTMLInputElement).checked;
    if (checked) {
      this.filterCategories.push(category);
    } else {
      this.filterCategories = this.filterCategories.filter(
        (c) => c != category
      );
    }
    this.emitFilters();
  }

  onLocationChange(event: Event, location: string) {
    const checked = (event?.target as HTMLInputElement).checked;
    if (checked) {
      this.locationCategories.push(location);
    } else {
      this.locationCategories = this.locationCategories.filter(
        (c) => c != location
      );
    }
    this.emitFilters();
  }
}
