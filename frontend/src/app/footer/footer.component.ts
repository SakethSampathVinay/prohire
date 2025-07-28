import { Component } from '@angular/core';
import { assets } from '../../assets/assets';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  facebook = assets.facebook_icon
  twitter = assets.twitter_icon
  instagram = assets.instagram_icon
}
