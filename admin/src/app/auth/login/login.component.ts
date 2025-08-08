import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMsg = '';

  data = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  onLogin() {
    this.toast.info('Login attempt started');
    this.loginService.onLoginAdmin(this.data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('name', res.company.name);
        localStorage.setItem('image', res.company.image);
        localStorage.setItem('companyId', res.company.id);
        this.router.navigate(['/manage-jobs']);
        this.toast.success('Login Successfully!');
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = `Error: ${err.status} ${err.statusText}`;
        this.toast.error('Something went wrong', this.errorMsg);
      },
    });
  }
}
