import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginData } from '../auth.models';
import { State } from '../../../store/reducers';
import * as authSelectors from '../auth.selectors';
import * as authActions from '../auth.actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    ></app-login-form>
  `
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(authSelectors.selectLoginPending));
  error$ = this.store.pipe(select(authSelectors.selectLoginError));

  constructor(
    private store: Store<State>
  ) {}

  onSubmit(loginData: LoginData) {
    this.store.dispatch(new authActions.LoginAction(loginData));
  }
}
