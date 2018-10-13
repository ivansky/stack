import { Routes } from '@angular/router';
import { SignUpComponent } from '../components/login/sign-up.component';
import { LoginComponent } from '../components/login/login.component';

export const loginRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LoginComponent },
];
