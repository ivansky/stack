import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as stackActions from '../stack.actions';
import * as stackSelectors from '../stack.selectors';
import { SearchData } from '../stack.models';
import { StackState } from '../stack.reducer';

@Component({
  selector: 'app-search-page',
  template: `
    <app-search-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    ></app-search-form>
  `
})
export class SearchPageComponent {
  pending$ = this.store.pipe(select(stackSelectors.selectSearchPending));
  error$ = this.store.pipe(select(stackSelectors.selectSearchError));

  constructor(
    private store: Store<StackState>
  ) {}

  onSubmit(searchData: SearchData) {
    this.store.dispatch(new stackActions.SearchAction(searchData));
    this.store.pipe(
      select(),
    );
  }

}
