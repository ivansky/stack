import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <mat-card class="login-card">
      <mat-card-title>Login</mat-card-title>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="login-field">
          <input matInput formControlName="login" placeholder="Login" autocomplete="off">
        </mat-form-field>

        <mat-form-field class="login-field">
          <input matInput formControlName="password" placeholder="Password">
          <mat-hint align="end"><a routerLink="/forgot">Forgot password?</a></mat-hint>
        </mat-form-field>

        <div class="login-buttons">
          <button mat-stroked-button color="primary" (click)="openStack()">
            <img class="stack-logo" src="assets/stack-logo.svg" alt="StackExchange" />
            Login with Stack
          </button>
          <button mat-stroked-button color="accent" routerLink="/sign-up">Sign Up</button>
          <button mat-stroked-button color="primary" type="submit">Login</button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(@Inject('Window') private window: Window) {}

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  openStack() {
    this.window.open('/api/auth/stack', '_self');
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
