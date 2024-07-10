import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { FavoriteService } from '../../services/favorite.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  videos: any[] = [];
  searchQuery: string = '';
  favorites: any[] = [];

  constructor(
    private youtubeService: YoutubeService,
    private favoriteService: FavoriteService
  ) { }


  ngOnInit(): void {
    this.loadInitialVideos();
    this.loadFavorites();
  }

  loadInitialVideos(): void {
    this.youtubeService.getVideos('').subscribe(
      response => {
        this.videos = response.items;
      },
      error => {
        console.error('Error loading videos', error);
      }
    );
  }

  loadFavorites(): void {
    // this.favoriteService.getFavorites().subscribe((favorites: any[]) => {
    //   this.favorites = favorites;
    // });
  }

  isFavorite(videoId: string): boolean {
    return this.favorites.some(fav => fav.videoId === videoId);
  }

  toggleFavorite(video: any): void {
    console.log(this.videos)
    if (this.isFavorite(video.id.videoId)) {
      const favorite = this.favorites.find(fav => fav.videoId === video.id.videoId);
      this.favoriteService.removeFavorite(favorite.id).subscribe(() => {
        this.loadFavorites();
      });
    } else {
      const favoriteData = {
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url
      };
      this.favoriteService.addFavorite(favoriteData).subscribe(() => {
        this.loadFavorites();
      });
    }
  }

  searchVideos(): void {
    if (this.searchQuery.trim()) {
      this.youtubeService.getVideos(this.searchQuery).subscribe(
        response => {
          this.videos = response.items;
        },
        error => {
          console.error('Error searching videos', error);
        }
      );
    }
  }
}
