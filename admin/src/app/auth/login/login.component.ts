import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data = {
    email: '',
    password: '',
  };

  constructor(private loginService: AuthService) {}

  onLogin() {
    this.loginService.onLoginAdmin(this.data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('name', res.company.name)
        localStorage.setItem('image', res.company.image)
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
