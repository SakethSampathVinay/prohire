import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobApplication } from '../../assets/assets';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getAuthProviders = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  getAppliedJobs(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.backendUrl}/get-applied-jobs`, this.getAuthProviders)
  }

  getUploadResume(): Observable<any> {
    return this.http.get(`${this.backendUrl}/uploaded-resume`, this.getAuthProviders)
  }
}