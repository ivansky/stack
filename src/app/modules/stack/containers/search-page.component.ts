import { Component, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers/root.reducer';

@Component({
  selector: 'app-search-page',
  template: `
    <app-search-form></app-search-form>
  `
})
export class SearchPageComponent {

  constructor(
    private store: Store<State>,
  ) {

    store.dispatch();

  }

}
