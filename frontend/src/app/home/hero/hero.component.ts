import { Component, Input, Output, EventEmitter } from '@angular/core';
import { assets } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  searchIcon = assets.search_icon;
  locationIcon = assets.location_icon;

  trustedCompanies = [
    assets.microsoft_logo,
    assets.walmart_logo,
    assets.accenture_logo,
    assets.samsung_logo,
    assets.amazon_logo,
    assets.adobe_logo,
  ];

  searchQuery: string = '';
  locationQuery: string = '';

  @Output() searchQueryChange = new EventEmitter<{
    job: string;
    location: string;
  }>();

  ngOnInit() {
    console.log(this.searchQuery);
    console.log(this.locationQuery);
  }

  onSearchButton() {
    this.searchQueryChange.emit({
      job: this.searchQuery,
      location: this.locationQuery,
    });
  }
}
