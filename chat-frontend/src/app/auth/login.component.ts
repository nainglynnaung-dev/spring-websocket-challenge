import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: 'login.component.html'
})
export class LoginComponent{
    loginData = { email: '', password: '' };

constructor(private authService: AuthService,
            private tokenService: TokenService,
            private router: Router) {}

login() {
  this.authService.login(this.loginData).subscribe(res => {
    this.tokenService.saveToken(res.token);
    localStorage.setItem('userId', res.userId);
    this.router.navigate(['/groups']);
  });
}

}