import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../../auth.models';

@Component({
  selector: 'app-sign-up-form',
  template: `
    <mat-card class="sign-up-card">
      <mat-card-title>Sign up</mat-card-title>

      <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="email" placeholder="Email" autocomplete="off">

          <mat-error *ngIf="email.hasError('required')">
            Email is required.
          </mat-error>
          <mat-error *ngIf="email.hasError('email')">
            Email should be correct pattern.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="password" placeholder="Password">

          <mat-error *ngIf="password.hasError('required')">
            Password is required.
          </mat-error>
          <mat-error *ngIf="password.hasError('minlength')">
            Password should be at least 3 characters.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="sign-up-field">
          <input matInput formControlName="name" placeholder="Name">

          <mat-error *ngIf="name.hasError('required')">
            Name is required.
          </mat-error>
          <mat-error *ngIf="name.hasError('minlength')">
            Name should be at least 3 characters.
          </mat-error>
        </mat-form-field>

        <div class="sign-up-buttons">
          <button mat-stroked-button color="primary" routerLink="/auth/login">Just go Login</button>
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

  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get name() { return this.signUpForm.get('name'); }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.submitted.emit(this.signUpForm.value);
    }
  }
}
