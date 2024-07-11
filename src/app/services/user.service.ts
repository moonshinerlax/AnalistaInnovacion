import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(token: any): Observable<any> {

    return this.http.get(`${this.apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
