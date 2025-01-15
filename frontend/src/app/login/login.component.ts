import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import the auth service
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  CookieService: any;

  constructor(
    private authService: AuthService ,
    private router: Router,
    private cookieService: CookieService
) {}

  onLogin(): void {
    if (!this.email) {
      alert('Email is required!');
      return;
    }

    if (!this.password) {
      alert('Password is required!');
      return;
    }
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful!', response);

        // Store access and refresh token in cookies

        this.cookieService.set('access_token', response.access, {expires: 1}); // expires in 1 day
        this.cookieService.set('refresh_token', response.access, {expires: 7}); // expires in 7 days
        // Redirect to dashboard or another page
      },
      error => {
        console.log();
        alert(`Login failed. ${error.error.message}`);
      }
    );
  }
}
