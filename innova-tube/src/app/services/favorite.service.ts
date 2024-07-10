import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/api/videos';

  constructor(private http: HttpClient) { }

  addFavorite(video: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, video);
  }

  removeFavorite(favoriteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${favoriteId}`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
