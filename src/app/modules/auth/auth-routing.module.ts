import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from '../../containers/login-page.component';
import { SignUpPageComponent } from '../../containers/sign-up-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginPageComponent },
    { path: 'sign-up', component: SignUpPageComponent },
  ])],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
