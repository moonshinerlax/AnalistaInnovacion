import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private authStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus: Observable<boolean> = this.authStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.cookieService.set('token', response.token);
          this.authStatusSubject.next(true);
        }
      })
    );
  }

  getToken() {
    return this.cookieService.get('token');
  }

  logout() {
    this.cookieService.delete('token');
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUsers`);
  }

  private isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

