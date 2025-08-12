import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  onSignUpAdmin(data: any): Observable<any>{
    return this.http.post(`${this.backendUrl}/register`, data)
  }

  onLoginAdmin(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, data);
  }
}
