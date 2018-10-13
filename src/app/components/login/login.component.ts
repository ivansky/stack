import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>
          Login:
          <input class="form-control" formControlName="login" type="text" autocomplete="off" />
        </label>
      </div>
      <div class="form-group">
        <label>
          Password:
          <input class="form-control" formControlName="password" type="password" />
        </label>
        <small id="emailHelp" class="form-text text-muted">
          <a href="/forgot">Forgot password?</a>
        </small>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary">Stackoverflow</button>
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  `
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
