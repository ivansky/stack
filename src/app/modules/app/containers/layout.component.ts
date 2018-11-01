import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { trigger, transition, style, group, query, animate } from '@angular/animations';
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
    <div [@slideInOut]="triggerAnimation(outlet)" class="layout-content">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  animations: [
    trigger('slideInOut', [
      transition('* => *, :enter', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        query(':enter', style({ transform: 'translateX(-100vw)' }), { optional: true }),
        query(':leave', style({ transform: 'translateX(0vw)' }), { optional: true }),

        group([
          query(':leave', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(100vw)'
            }))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ],
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

  triggerAnimation(outlet) {
    return outlet.activatedRouteData.animation || null;
  }

  logout() {
    this.store.dispatch(new authActions.LogoutAction());
  }
}
