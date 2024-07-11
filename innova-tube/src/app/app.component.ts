import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  title = 'innova-tube';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.loadCurrentUser();
      } else {
        this.user = null;
      }
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    const token = this.cookieService.get('token');
    if (token) {
      this.loadCurrentUser();
    } else {
      this.isLoading = false;
    }
  }

  loadCurrentUser() {
    const token = this.cookieService.get('token');
    this.userService.getCurrentUser(token).subscribe(
      user => {
        this.user = user;
        this.isLoggedIn = true;
        this.isLoading = false;
        console.log('User data retrieved successfully', user);
      },
      error => {
        this.isLoading = false;
        console.error('Error retrieving user data', error);
      }
    );
  }

  logOut(): void {
    this.authService.logout();
  }
}
