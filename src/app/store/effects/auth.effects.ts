import { Injectable } from '@angular/core';
import { Actions as ActionsEffect, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import { makeRequestEffect } from '../utils/makeRequestEffect';
import { ApiService } from '../../api/api.service';
import { LoginData, User } from '../../models/auth.models';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.LOGIN,
    this.api.login.bind(this.api),
    authActions.LoginSuccessAction,
    authActions.LoginFailureAction
  );

  @Effect()
  logout$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.LOGOUT,
    this.api.login.bind(this.api),
    authActions.LogoutSuccessAction,
    authActions.LogoutFailureAction
  );

  @Effect()
  gerProfile$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.GET_PROFILE,
    this.api.getProfile.bind(this.api),
    authActions.GetProfileSuccessAction,
    authActions.GetProfileFailureAction,
  );

  @Effect()
  initGetProfile$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => of(new authActions.GetProfileAction())),
  );

  @Effect({ dispatch: false })
  preAuth$ = combineLatest(
    this.actions$.pipe(ofType(ROOT_EFFECTS_INIT)),
    this.actions$.pipe(ofType(ROUTER_NAVIGATION)),
    this.actions$.pipe(
      ofType(
        authActions.GET_PROFILE_SUCCESS,
        authActions.GET_PROFILE_FAILURE,
      )
    ),
  ).pipe(
    take(1),
    tap(() => {
      console.log('test');
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      authActions.LOGIN_REDIRECT,
      authActions.LOGOUT,
    ),
    tap(authed => {
      this.router.navigate(['/auth/login']);
    })
  );

  constructor(
    private api: ApiService,
    private router: Router,
    private actions$: ActionsEffect,
  ) {}
}
