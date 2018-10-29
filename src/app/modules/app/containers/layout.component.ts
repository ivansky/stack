import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../../store/reducers';
import * as authSelectors from '../../auth/auth.selectors';
import * as authActions from '../../auth/auth.actions';
import { User } from '../../auth/auth.models';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav
      [user]="user$ | async"
      [loggedIn]="loggedIn$ | async"
      (logout)="logout()"
    ></app-nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public loggedIn$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(
    private store: Store<State>,
  ) {
    this.loggedIn$ = this.store.pipe(select(authSelectors.selectLoggedIn));
    this.user$ = this.store.pipe(select(authSelectors.selectUser));
  }

  logout() {
    this.store.dispatch(new authActions.LogoutAction());
  }
}
