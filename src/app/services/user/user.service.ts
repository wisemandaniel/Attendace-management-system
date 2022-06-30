import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserOptions2, UserOptions } from '../../interfaces/user-options';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserData } from '../../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl2;
  // url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(UserData: any): Observable<any> {
     return this.http.post<any>(this.url + 'public/auth/register-student', UserData)
  }

  login(userData: any): Observable<UserOptions> {
     return this.http.post<UserOptions>(this.url + 'public/auth/login', userData);
  }

  getAllStudents() {
     return this.http.get(this.url + 'protected/students/?pageNumber=0&pageSize=5');
  }
}
