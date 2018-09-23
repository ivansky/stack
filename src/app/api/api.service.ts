import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  url = 'http://api.stackexchange.com/2.2/';

  constructor(private http: HttpClient) {}

  public get(path, options = {}) {
    return this.http.get(`${this.url}${path}`, options);
  }

}
