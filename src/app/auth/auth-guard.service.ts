import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/reducers/root.reducer';
import { map, take, tap } from 'rxjs/operators';
import * as authSelectors from '../store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import * as authActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private store$: Store<State>,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store$.pipe(
      select(authSelectors.selectUser),
      map((user) => {
        if (!user) {
          this.store$.dispatch(new authActions.LoginRedirect());

          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

}
