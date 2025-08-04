import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LatestJobsService {

  backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getLatestJobs(): Observable<any> {
    return this.http.get(`${this.backendUrl}/latest-jobs`)
  }
}
