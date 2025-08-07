import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplyNowService {
  backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  applyNow(jobId: string | null): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.backendUrl}/apply-jobs?job_id=${jobId}`,
      {},
      headers
    );
  }

  checkIfApplied(jobId: string | null): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.backendUrl}/check-application/${jobId}`,
      headers
    );
  }
}
