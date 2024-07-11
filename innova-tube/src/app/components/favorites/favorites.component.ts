import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { FavoriteService } from '../../services/favorite.service';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any;
  user: any;

  constructor(
    private youtubeService: YoutubeService,
    private favoriteService: FavoriteService,
    private userService: UserService,
    private cookieService: CookieService,
  ) { }


  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.userService.getCurrentUser(token).subscribe(
        user => {
          this.user = user;
          this.loadFavorites(user);
          console.log('User data retrieved successfully');
        },
        error => {
          console.error('Error retrieving user data', error);
        }
      );
    }
  }

  loadFavorites(user: any): void {
    this.favoriteService.getFavorites(user._id).subscribe(
      (favorites: any) => {
        if (favorites && favorites.videos) {
          this.favorites = favorites.videos;
          console.log('Favorites loaded:', favorites);
        } else {
          console.log('Favorites structure invalid:');
          this.favorites = [];
        }
      },
      error => {
        console.error('Error loading favorites', error);
      }
    );
  }

  isFavorite(videoId: string): boolean {
    if(this.favorites){
      return this.favorites.some((fav: any) => fav.videoId === videoId);
    }else return false

  }

  toggleFavorite(video: any): void {

      const favorite = this.favorites.find((fav: any) => fav.videoId === video.videoId);
      this.favoriteService.removeFavorite(favorite.userId, favorite.videoId ).subscribe(() => {
        this.loadFavorites(this.user);
      });
  }

}
