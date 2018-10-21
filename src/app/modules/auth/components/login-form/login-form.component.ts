import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../../../models/auth.models';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card class="login-card">
      <mat-card-title>Login</mat-card-title>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="login-field">
          <input matInput formControlName="email" placeholder="Email" autocomplete="off">
        </mat-form-field>

        <mat-form-field class="login-field">
          <input matInput formControlName="password" placeholder="Password" type="password">
          <mat-hint align="end"><a routerLink="/forgot">Forgot password?</a></mat-hint>
        </mat-form-field>

        <div class="login-buttons">
          <button mat-stroked-button color="primary" (click)="openStack()">
            <img class="stack-logo" src="assets/stack-logo.svg" alt="StackExchange" />
            Login with Stack
          </button>
          <button mat-stroked-button color="accent" routerLink="/auth/sign-up">Sign Up</button>
          <button mat-stroked-button color="primary" type="submit">Login</button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<LoginData>();

  constructor(@Inject('Window') private window: Window) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  openStack() {
    this.window.open('/api/auth/stack', '_self');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }
}
