import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewApplicationsService {
  backendUrl = 'http://127.0.0.1:8000/admin';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  onViewApplication(companyId: string | null): Observable<any> {
    return this.http.get(
      `${this.backendUrl}/company-application/${companyId}`,
      this.getHeaders()
    );
  }

  changeStatus(
    applicationId: string | null,
    status: string | null
  ): Observable<any> {
    return this.http.put(
      `${this.backendUrl}/update-status/${applicationId}?status=${status}`,
      null,
      this.getHeaders()
    );
  }
}
