import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Import the AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router for navigation
  ) {
    // Initialize the form with FormBuilder
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const { username, email, password } = this.signupForm.value;

    this.authService.signup(username, email, password).subscribe(
      (response) => {
        console.log('Signup successful!', response);
        alert('Account created successfully! Please log in.');
        this.signupForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed!', error);
        alert('Signup failed. Please try again.');
      }
    );
  }
}
