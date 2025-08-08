import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageJobsService {
  backendUrl = 'http://127.0.0.1:8000/admin';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }

  onManageJobs(companyId: string | null): Observable<any> {
    const header = this.getHeaders();
    return this.http.get(`${this.backendUrl}/get-jobs/${companyId}`, header);
  }

  toggleVisibility(jobId: string, isVisible: boolean) {
    const header = this.getHeaders();
    return this.http.put(
      `${this.backendUrl}/update-visibility/${jobId}?is_visible=${isVisible}`, {},
      header
    );
  }
}
