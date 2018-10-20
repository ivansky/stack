import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../../models/auth.models';

@Component({
  selector: 'app-sign-up-form',
  template: `
    <mat-card class="sign-up-card">
      <mat-card-title>Sign up</mat-card-title>

      <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="email" placeholder="Email" autocomplete="off">

          <div *ngIf="email.errors.required">
            Name is required.
          </div>
          <div *ngIf="email.errors.minlength">
            Name must be at least 4 characters long.
          </div>
        </mat-form-field>

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="password" placeholder="Password">
        </mat-form-field>

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="name" placeholder="Name">
        </mat-form-field>

        <div class="sign-up-buttons">
          <button mat-stroked-button color="primary" routerLink="/auth/login">Login</button>
          <button mat-stroked-button color="accent" type="submit">Sign Up</button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.signUpForm.disable();
    } else {
      this.signUpForm.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<SignUpData>();

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
    ])),
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
    ])),
  });

  get email() {
    return this.signUpForm.get('email');
  }

  onSubmit() {
    console.warn(this.signUpForm.value);
  }
}
