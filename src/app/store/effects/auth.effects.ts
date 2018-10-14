import { Injectable } from '@angular/core';
import { Actions as ActionsEffect, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import * as actions from '../actions';
import { makeRequestEffect } from '../utils/makeRequestEffect';
import { ApiService } from '../../api/api.service';
import { LoginData, User } from '../../models/auth.models';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '../utils/makeAction';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    actions.LOGIN_REQUEST,
    this.api.login,
    actions.loginSuccess,
    actions.loginFailure
  );

  @Effect()
  gerProfile$ = makeRequestEffect<LoginData, User, any>(
    this.actions$,
    actions.GET_PROFILE_REQUEST,
    this.api.getProfile,
    actions.getProfileSuccess,
    actions.getProfileFailure
  );
/*
  @Effect()
  preAuth$ = actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => (
      pipe(
        of(actions.getProfile()),
        merge(actions$.pipe(
          ofType(GET)
        ))
      )
    ))
    mergeMap<Action<RequestPayload>, Action<SuccessPayload>>(({ payload: formData }) =>
      requestFunction(formData).pipe(
        map<SuccessPayload, Action<SuccessPayload>>(responseData => successActionCreator(responseData)),
        catchError((error) => of(failureActionCreator(error)))
      )
    )
  );
*/
  constructor(private api: ApiService, private actions$: ActionsEffect) {}
}
