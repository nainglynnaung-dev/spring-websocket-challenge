import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  submit(): void {

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Registration successful! Redirecting...';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage =
            err.error?.message || 'Registration failed';
        }
      });
  }

}
