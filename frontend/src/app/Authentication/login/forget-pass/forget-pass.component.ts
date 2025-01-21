import { Component } from '@angular/core';

@Component({
  selector: 'forget',
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent {
  email = ""

  constructor() {}

  onSubmit() {
    if (this.email) {
      console.log("Password reset requested for:", this.email)
      // Implement password reset logic here
      // This could include calling an API to send a reset email
      alert("If an account exists for " + this.email + ", you will receive password reset instructions.")
    }
  }
}
