import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadResumeService {
  backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  onUploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);

    const headers = this.getHeaders(); 
    
    return this.http.post(
      `${this.backendUrl}/upload-resume`,
      formData,
      headers
    );
  }
}
