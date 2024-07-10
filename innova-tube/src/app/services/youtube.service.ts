import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyC5QUCSRwtBMUdSvWlgTjye5XHgIFV-q4c';
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const params = {
      part: 'snippet',
      maxResults: '10',
      q: query,
      key: this.apiKey
    };
    return this.http.get(this.apiUrl, { params });
  }
}
