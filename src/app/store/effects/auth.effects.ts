import { Injectable } from '@angular/core';
import { Actions as ActionsEffect, Effect } from '@ngrx/effects';

import * as actions from '../actions';
import { makeRequestEffect } from '../utils/makeRequestEffect';
import { ApiService } from '../../api/api.service';
import { LoginData, User } from '../../models/auth.models';

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

  constructor(private api: ApiService, private actions$: ActionsEffect) {}
}
