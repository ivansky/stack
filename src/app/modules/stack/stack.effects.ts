import { Injectable } from '@angular/core';
import { StackService } from './stack.service';
import { Actions as ActionsEffect, Effect } from '@ngrx/effects';
import { makeRequestEffect } from '../../store/utils/makeRequestEffect';
import * as authActions from '../auth/auth.actions';
import { SearchData } from './stack.models';

@Injectable()
export class StackEffects {
  @Effect()
  search$ = makeRequestEffect<SearchData, any/* @todo interface */, any>(
    this.actions$,
    authActions.GET_PROFILE,
    this.stack.search.bind(this.stack),
    authActions.GetProfileSuccessAction,
    authActions.GetProfileFailureAction,
  );

  constructor(
    private stack: StackService,
    private actions$: ActionsEffect,
  ) {}
}
