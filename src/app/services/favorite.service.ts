import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addFavorite(video: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/videos/add`, video);
  }

  removeFavorite(userId: string, videoId: string): Observable<any> {
    const params = { userId, videoId }
    return this.http.delete(`${this.apiUrl}/videos/remove`, {params});
  }

  getFavorites(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos/favorites/${id}`);
  }
}
