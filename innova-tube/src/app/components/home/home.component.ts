import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';


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

  constructor(private youtubeService: YoutubeService) { }


  ngOnInit(): void {
    this.loadInitialVideos();
  }

  loadInitialVideos(): void {
    this.youtubeService.getVideos('trending mexico').subscribe(
      response => {
        this.videos = response.items;
      },
      error => {
        console.error('Error loading videos', error);
      }
    );
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
