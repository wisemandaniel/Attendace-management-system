import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  // url = environment.baseUrl;
  url = environment.baseUrl2;

  constructor(private http: HttpClient) { }

  getSessions() {
    return this.http.get(this.url + 'public/course/sessions/active')
  }

  recordAttndance(data: any) {
    return this.http.post(this.url + 'protected/student-attendance', data)
  }

  getAttendanceHistory() {
    return this.http.get(this.url + 'protected/student-attendance')
  }
  
}
