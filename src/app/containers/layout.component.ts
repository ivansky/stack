import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../store/reducers/root.reducer';
import * as selectors from '../store/selectors/index';
import * as authActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav
      [loggedIn]="loggedIn$ | async"
      (logout)="logout()"
    ></app-nav>
    <router-outlet></router-outlet>
  `,
})
export class LayoutComponent {
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<State>,
  ) {
    this.loggedIn$ = this.store.pipe(
      select(selectors.selectLoggedIn)
    );
  }

  logout() {
    this.store.dispatch(new authActions.LogoutAction());
  }
}