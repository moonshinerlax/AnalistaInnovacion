import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = environment.YOUTUBE_API_KEY;
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const params = {
      part: 'snippet',
      maxResults: '10',
      q: query,
      key: this.apiKey,
      type: 'video',
      order: 'viewCount'
    };
    return this.http.get(this.apiUrl, { params });
  }
}


