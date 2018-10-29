import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoginData, SignUpData, User } from './auth.models';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  public redirectToLogin() {
    return this.router.navigate(['/auth/login']);
  }

  public redirectToDashboard() {
    return this.router.navigate(['/']);
  }

  public login(loginData: LoginData) {
    return this.api.post<User>('/auth/login', loginData);
  }

  public logout() {
    return this.api.post('/auth/logout', null);
  }

  public signUp(signUpData: SignUpData) {
    return this.api.post<User>('/auth/sign-up', signUpData);
  }

  public getProfile() {
    return this.api.get<User>('/auth/profile');
  }

}
