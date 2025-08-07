import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  image: string | null = "";
  name: string | null = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('image');
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('image')
    localStorage.removeItem('companyId');
    this.router.navigate(['/register']);
  }
}
