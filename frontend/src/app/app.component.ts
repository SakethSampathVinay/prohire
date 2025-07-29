import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { assets } from '../assets/assets';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  image = assets.accenture_logo
}
