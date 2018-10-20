import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/reducers/root.reducer';
import * as selectors from '../../store/selectors/index';
import * as authActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar class="header">
      <span><a routerLink="/search">StackApp Observer</a></span>
      <span class="toolbar-spacer"></span>
      <button *ngIf="!loggedIn$" mat-flat-button routerLink="/auth/login">Login</button>
      <button *ngIf="loggedIn$" mat-flat-button color="accent" (click)="logout()">Logout</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./layout.component.css']
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
