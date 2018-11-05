import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './auth.service';

import { authReducer } from './auth.reducer';
import { AuthEffects } from './auth.effects';

import { AuthCheckGuard } from './guards/auth-check.guard';
import { LoginPageComponent } from './containers/login-page.component';
import { SignUpPageComponent } from './containers/sign-up-page.component';
import { ProfilePageComponent } from './containers/profile-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { UserButtonComponent } from './components/user-button/user-button.component';

export const COMPONENTS = [
  LoginPageComponent,
  SignUpPageComponent,
  LoginFormComponent,
  SignUpFormComponent,
  UserButtonComponent,
  ProfilePageComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    UserButtonComponent,
  ],
  providers: [
    AuthService,
    AuthCheckGuard,
    { provide: 'Window',  useValue: window },
  ],
})
export class AuthModule {}
