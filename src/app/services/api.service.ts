import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = '/api';

  constructor(private http: HttpClient) {}

  public get<T = any>(path, options = {}) {
    return this.http.get<T>(`${this.url}${path}`, options);
  }

  public post<T = any>(path, body = null, options = {}) {
    return this.http.post<T>(`${this.url}${path}`, body, options);
  }

}
