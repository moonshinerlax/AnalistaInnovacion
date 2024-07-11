import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginStatus: boolean = false;
  loginMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.userService.getCurrentUser(token).subscribe(
        user => {
          if (user) {
            this.router.navigate(['/'])
          }
          console.log('User data retrieved successfully');
        },
        error => {
          console.error('Error retrieving user data', error);
        }
      );
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          this.cookieService.set('token', response.token)
          console.log('User logged in successfully', response);
            this.router.navigate(['/']);
        },
        error => {
          this.loginStatus = true
          this.loginMessage = error.error.message
          console.error('Error logging in', error);
        }
      );
    }
  }
}
