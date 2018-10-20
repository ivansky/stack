import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SignUpData } from '../models/auth.models';
import { State } from '../store/reducers/root.reducer';
import * as authSelectors from '../store/selectors/auth.selectors';
import * as authActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up-page',
  template: `
    <app-sign-up-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    ></app-sign-up-form>
  `
})
export class SignUpPageComponent {
  pending$ = this.store.pipe(select(authSelectors.selectSignUpPending));
  error$ = this.store.pipe(select(authSelectors.selectSignUpError));

  constructor(
    private store: Store<State>
  ) {}

  onSubmit(loginData: SignUpData) {
    this.store.dispatch(new authActions.SignUpAction(loginData));
  }
}