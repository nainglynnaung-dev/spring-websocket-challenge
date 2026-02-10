import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Username" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p *ngIf="errorMessage" style="color:red">{{ errorMessage }}</p>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = new URLSearchParams();
    body.set('username', this.username);
    body.set('password', this.password);

    this.http.post('http://localhost:8080/login', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    }).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        this.router.navigate(['/chat']); // Angular router navigation
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
