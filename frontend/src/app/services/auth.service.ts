import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  registerUser(register: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, register);
  }

  loginUser(login: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, login);
  }
}
