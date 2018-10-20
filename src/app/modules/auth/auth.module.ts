import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthService } from '../../services/auth.service';

import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignUpFormComponent } from '../../components/sign-up-form/sign-up-form.component';
import { LoginPageComponent } from '../../containers/login-page.component';
import { SignUpPageComponent } from '../../containers/sign-up-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpPageComponent,
    LoginFormComponent,
    SignUpFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    AuthService,
    { provide: 'Window',  useValue: window },
  ],
})
export class AuthModule {}
