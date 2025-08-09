import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = environment.apiUrl;

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

  registerUser(register: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, register).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.userData.name);
      })
    );
  }

  loginUser(login: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, login).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.userData.name);
      })
    );
  }

  logOut(): void {
    localStorage.clear();
  }
}
