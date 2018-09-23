import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { LoginRoutingModule } from './login-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    LoginRoutingModule,
  ],
  exports: [],
  providers: [
    AuthService,
  ],
})
export class LoginModule {}
