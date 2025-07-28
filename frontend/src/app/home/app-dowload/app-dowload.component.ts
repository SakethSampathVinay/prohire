import { Component } from '@angular/core';
import { assets } from '../../../assets/assets';
@Component({
  selector: 'app-app-dowload',
  imports: [],
  templateUrl: './app-dowload.component.html',
  styleUrl: './app-dowload.component.css'
})
export class AppDowloadComponent {
  playStore = assets.play_store;
  appStore = assets.app_store;
  appMainImg = assets.app_main_img;
}
