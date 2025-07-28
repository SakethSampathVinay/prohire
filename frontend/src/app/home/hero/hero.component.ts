import { Component } from '@angular/core';
import { assets } from '../../../assets/assets';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  searchIcon = assets.search_icon;
  locationIcon = assets.location_icon;

  trustedCompanies = [
    assets.microsoft_logo, assets.walmart_logo, assets.accenture_logo, assets.samsung_logo,
    assets.amazon_logo, assets.adobe_logo
  ]
}
