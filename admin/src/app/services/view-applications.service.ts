import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewApplicationsService {
  backendUrl = environment.apiUrl;

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
