import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchData } from './stack.models';

@Injectable()
export class StackService {

  constructor(
    private api: ApiService,
  ) {}

  search(searchData: SearchData) {
    this.api.get('/search');
  }

}
