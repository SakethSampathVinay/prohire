import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.router.navigate(['/']);
    }
  }

  onLogin() {
    this.authService.loginUser(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
