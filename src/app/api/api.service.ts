import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = '/api';

  constructor(private http: HttpClient) {}

  public get(path, options = {}) {
    return this.http.get(`${this.url}${path}`, options);
  }

  public post<T = any>(path, body, options = {}) {
    return this.http.post<T>(`${this.url}${path}`, body, options);
  }

  public login(loginData: LoginData) {
    return this.post<User>('/login', loginData);
  }

}
