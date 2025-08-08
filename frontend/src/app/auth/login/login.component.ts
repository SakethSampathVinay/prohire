import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMsg = '';

  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/']);
      }
    }
  }

  onLogin() {
    this.toast.info('Hang tight! Logging you in...', 'Processing');
    this.authService.loginUser(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.toast.success('Logged in Successfully!!!');
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });
  }
}
