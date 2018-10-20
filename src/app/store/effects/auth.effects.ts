import { Injectable } from '@angular/core';
import { Actions as ActionsEffect, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import * as actions from '../actions';
import * as authActions from '../actions/auth.actions';
import { makeRequestEffect } from '../utils/makeRequestEffect';
import { ApiService } from '../../api/api.service';
import { LoginData, User } from '../../models/auth.models';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    actions.LOGIN_REQUEST,
    this.api.login.bind(this.api),
    actions.loginSuccess,
    actions.loginFailure
  );

  @Effect()
  gerProfile$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    actions.GET_PROFILE_REQUEST,
    this.api.getProfile.bind(this.api),
    actions.getProfileSuccess,
    actions.getProfileFailure
  );

  @Effect()
  initGetProfile$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => of(actions.getProfile())),
  );

  @Effect({ dispatch: false })
  preAuth$ = combineLatest(
    this.actions$.pipe(ofType(ROOT_EFFECTS_INIT)),
    this.actions$.pipe(ofType(ROUTER_NAVIGATION)),
    this.actions$.pipe(
      ofType(
        actions.GET_PROFILE_SUCCESS,
        actions.GET_PROFILE_FAILURE,
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
