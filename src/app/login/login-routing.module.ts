import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up.component';

const loginRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class LoginRoutingModule {}
