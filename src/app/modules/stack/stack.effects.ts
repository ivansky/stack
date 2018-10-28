import { Injectable } from '@angular/core';
import { StackService } from './stack.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Actions as ActionsEffect, Effect, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { makeRequestEffect } from '../../store/utils/makeRequestEffect';
import * as stackActions from './stack.actions';
import { Question, QuestionId, SearchData } from './stack.models';
import { RouterStateUrl } from '../../store/reducers';

@Injectable()
export class StackEffects {
  @Effect()
  search$ = makeRequestEffect<SearchData, any/* @todo interface */, any>(
    this.actions$,
    stackActions.SEARCH,
    this.stack.search.bind(this.stack),
    stackActions.SearchSuccessAction,
    stackActions.SearchFailureAction,
  );

  @Effect({ dispatch: false })
  searchSuccess$ = combineLatest(
    this.actions$.pipe(ofType(ROUTER_NAVIGATION)),
    this.actions$.pipe(ofType(stackActions.SEARCH_SUCCESS)),
  ).pipe(
    map(actions => actions),
    tap(([routerAction, successAction]: [RouterNavigationAction<RouterStateUrl>, stackActions.SearchSuccessAction]) => {
      if ('/stack/search' === routerAction.payload.routerState.url) {
        this.stack.redirectToSearchResult(successAction.parentPayload.query);
      }
    })
  );

  @Effect()
  getQuestion$ = makeRequestEffect<QuestionId, Question, any>(
    this.actions$,
    stackActions.GET_QUESTION,
    this.stack.getQuestion.bind(this.stack),
    stackActions.GetQuestionSuccessAction,
    stackActions.GetQuestionFailureAction,
  );

  constructor(
    private stack: StackService,
    private actions$: ActionsEffect,
  ) {}
}
