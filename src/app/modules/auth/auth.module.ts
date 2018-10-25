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

import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginPageComponent } from './containers/login-page.component';
import { SignUpPageComponent } from './containers/sign-up-page.component';
import { AuthCheckGuard } from './guards/auth-check.guard';

export const COMPONENTS = [
  LoginPageComponent,
  SignUpPageComponent,
  LoginFormComponent,
  SignUpFormComponent,
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
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    // MaterialModule,
  ],
  providers: [
    AuthService,
    AuthCheckGuard,
    { provide: 'Window',  useValue: window },
  ],
})
export class AuthModule {}
