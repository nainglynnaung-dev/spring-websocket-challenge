import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient,
              private tokenService: TokenService) {}

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.API}/login`, data);
  }

  logout() {
    this.tokenService.clear();
  }
}
