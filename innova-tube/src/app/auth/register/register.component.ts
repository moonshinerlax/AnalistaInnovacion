import { Component, OnInit, NgZone   } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Make sure the path is correct
import { environment } from '../../../environments/enviroment';

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  recaptchaToken: string = '';
  captchaResolved = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

  }



  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }



  onSubmit(): void {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(environment.RECAPTCHA_KEY, {action: 'signup'});
      if (token.length > 0) {
        this.captchaResolved = true
        this.recaptchaToken = token
        if (this.registerForm.valid && this.captchaResolved) {
          const user = {
            name: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            recaptchaToken: this.recaptchaToken
          };
          console.log(user)
          this.authService.register(user).subscribe(
            response => {
              console.log('User registered successfully', response);
              this.router.navigate(['/login']);
            },
            error => {
              console.error('Error registering user', error);
            }
          );
        }
      }
    });
    console.log('continue from captcha')
  }
}
