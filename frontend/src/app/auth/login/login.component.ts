import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService){}

  onLogin(){
    this.authService.loginUser(this.loginForm).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
