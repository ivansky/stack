import { Injectable } from '@angular/core';
import { StackService } from './stack.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Actions as ActionsEffect, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { makeRequestEffect } from '../../store/utils/makeRequestEffect';
import * as stackActions from './stack.actions';
import {
  Answer,
  Question,
  QuestionId,
  ResponseList,
  SearchData,
  TagQuestionsRequestData,
  UserQuestionsRequestData
} from './stack.models';
import { RouterStateUrl } from '../../store/reducers';

@Injectable()
export class StackEffects {
  @Effect()
  search$ = makeRequestEffect<SearchData, ResponseList<Question>, any>(
    this.actions$,
    stackActions.SEARCH,
    this.stack.search.bind(this.stack),
    stackActions.SearchSuccessAction,
    stackActions.SearchFailureAction,
  );

  @Effect({ dispatch: false })
  searchSuccess$ = this.actions$.pipe(
    ofType(stackActions.SEARCH_SUCCESS),
    withLatestFrom(this.actions$.pipe(ofType(ROUTER_NAVIGATION))),
    tap(([successAction, routerAction]: [stackActions.SearchSuccessAction, RouterNavigationAction<RouterStateUrl>]) => {
      if ('/stack/search' === routerAction.payload.routerState.url) {
        this.stack.redirectToSearchResult(successAction.parentPayload.query);
      }
    }),
  );

  @Effect()
  getQuestion$ = makeRequestEffect<QuestionId, ResponseList<Question>, any>(
    this.actions$,
    stackActions.GET_QUESTION,
    this.stack.getQuestion.bind(this.stack),
    stackActions.GetQuestionSuccessAction,
    stackActions.GetQuestionFailureAction,
  );

  @Effect()
  getUserQuestions$ = makeRequestEffect<UserQuestionsRequestData, ResponseList<Question>, any>(
    this.actions$,
    stackActions.GET_USER_QUESTIONS,
    this.stack.getUserQuestions.bind(this.stack),
    stackActions.GetUserQuestionsSuccessAction,
    stackActions.GetUserQuestionsFailureAction,
  );

  @Effect()
  getTagQuestions$ = makeRequestEffect<TagQuestionsRequestData, ResponseList<Question>, any>(
    this.actions$,
    stackActions.GET_TAG_QUESTIONS,
    this.stack.getTagQuestions.bind(this.stack),
    stackActions.GetTagQuestionsSuccessAction,
    stackActions.GetTagQuestionsFailureAction,
  );

  @Effect()
  getAnswers$ = makeRequestEffect<QuestionId, ResponseList<Answer>, any>(
    this.actions$,
    stackActions.GET_ANSWERS,
    this.stack.getQuestionAnswers.bind(this.stack),
    stackActions.GetAnswersSuccessAction,
    stackActions.GetAnswersFailureAction,
  );

  constructor(
    private stack: StackService,
    private actions$: ActionsEffect,
  ) {}
}
