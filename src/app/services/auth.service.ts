import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginData, SignUpData, User } from '../models/auth.models';
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