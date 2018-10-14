import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service';
import { LoginRoutingModule } from './login-routing.module';
import { SignUpComponent } from './sign-up.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    FormsModule,
    LoginRoutingModule,
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
export class LoginModule {}
