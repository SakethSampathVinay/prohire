import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { assets } from '../../assets/assets';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string | null = null;
  isSidebarOpen: boolean = false;

  backIcon = assets.back_arrow_icon;
  leftIcon = assets.left_arrow_icon;
  rightIcon = assets.right_arrow_icon;
  personIcon = assets.person_icon;

  constructor(private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username');
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/register']);
    this.toast.success('Logged out successfully', 'Success');
  }
}
