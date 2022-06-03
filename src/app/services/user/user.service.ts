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

  constructor(private http: HttpClient) { }

  register(UserData: UserOptions2): Observable<UserOptions2> {
     return this.http.post<UserOptions2>(this.url + 'auth/register-student', UserData)
  }

  login(userData: UserOptions): Observable<UserOptions> {
     return this.http.post<UserOptions>(this.url + 'auth/login', userData);
  }
}
