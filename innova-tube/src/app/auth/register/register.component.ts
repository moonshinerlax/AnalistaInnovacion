import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Make sure the path is correct

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
    private router: Router
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

    window.addEventListener('captchaResolved', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      console.log(customEvent)
      this.recaptchaToken = customEvent.detail;
      this.captchaResolved = true;
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.captchaResolved) {
      const user = {
        name: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        recaptchaToken: this.recaptchaToken // Pass the recaptchaToken to AuthService
      };

      this.authService.register(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    } else {
      console.error('Captcha not resolved or form invalid');
    }
  }
}
