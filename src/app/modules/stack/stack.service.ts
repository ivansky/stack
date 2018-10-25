import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchData } from './stack.models';

function fixedEncodeURI (str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

@Injectable()
export class StackService {

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  search(searchData: SearchData) {
    return this.api.get(`/search`, {
      params: {
        order: 'desc',
        sort: 'creation',
        site: 'stackoverflow',
        pagesize: 10,
        intitle: searchData.query,
      }
    });
  }

  redirectToSearchResult(query: string) {
    return this.router.navigate(['/stack/search/', query]);
  }

}
