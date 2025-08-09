import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddJobsService {
  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ` + localStorage.getItem('token'),
    });
  }

  addJobs(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.backendUrl}/post-job`, data, { headers });
  }
}
