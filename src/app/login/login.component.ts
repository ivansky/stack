import { Component } from '@angular/core';

@Component({
  template: `
    <button (click)="onLogin()">Login</button>
  `
})
export class LoginComponent {
  onLogin() {
    alert('login');
  }
}
