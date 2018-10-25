import { Injectable } from '@angular/core';
import { Actions as ActionsEffect, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { combineLatest, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import { makeRequestEffect } from '../../store/utils/makeRequestEffect';
import * as authActions from './auth.actions';
import { LoginData, SignUpData, User } from './auth.models';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.LOGIN,
    this.auth.login.bind(this.auth),
    authActions.LoginSuccessAction,
    authActions.LoginFailureAction
  );

  @Effect()
  signUp$ = makeRequestEffect<SignUpData, User, any>(
    this.actions$,
    authActions.SIGN_UP,
    this.auth.signUp.bind(this.auth),
    authActions.SignUpSuccessAction,
    authActions.SignUpFailureAction
  );

  @Effect()
  logout$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.LOGOUT,
    this.auth.logout.bind(this.auth),
    authActions.LogoutSuccessAction,
    authActions.LogoutFailureAction
  );

  @Effect()
  gerProfile$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    authActions.GET_PROFILE,
    this.auth.getProfile.bind(this.auth),
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
      console.log('Some side-effect here to play after application loaded');
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      authActions.LOGIN_REDIRECT,
      authActions.LOGOUT,
    ),
    tap(authed => {
      this.auth.redirectToLogin();
    })
  );

  constructor(
    private auth: AuthService,
    private actions$: ActionsEffect,
  ) {}
}
