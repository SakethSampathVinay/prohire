import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = 'http://127.0.0.1:8000';

  register = {
    name: '',
    email: '',
    password: '',
  };

  login = {
    email: '',
    password: '',
  };

  constructor(private http: HttpClient) {}

  // Save the username in localStorage
  // const username = localStorage.setItem("username", this.register.name || this.login.email);

  registerUser(register: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, register).pipe(
      tap((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.userData.name);
      })
    );
  }

  loginUser(login: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, login).pipe(
      tap((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.userData.name);
      })
    );
  }
}
