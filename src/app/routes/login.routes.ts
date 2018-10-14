import { Routes } from '@angular/router';
import { SignUpComponent } from '../modules/login/sign-up.component';
import { LoginComponent } from '../modules/login/login.component';

export const loginRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LoginComponent },
];
