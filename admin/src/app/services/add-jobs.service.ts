import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddJobsService {
  backendUrl = 'http://127.0.0.1:8000/admin';

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
