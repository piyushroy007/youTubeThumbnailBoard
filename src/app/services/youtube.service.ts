import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface VideoMetadata {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: string;
  publishedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private apiKey = 'AIzaSyDl1mr8_pRRtzjRPh3n-TlPyR1j5fdHq1I';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  getVideoMetadata(videoId: string): Observable<VideoMetadata> {
    const url = `${this.apiUrl}/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const item = response.items[0];
        return {
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          viewCount: item.statistics.viewCount,
          publishedAt: item.snippet.publishedAt,
        };
      })
    );
  }
}
