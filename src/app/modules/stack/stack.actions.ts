import { Action } from '@ngrx/store';
import { AbstractAction } from '../../store/utils/abstract-actions';
import { Question, QuestionId, SearchData, SearchResults } from './stack.models';

export const SEARCH = 'stack/search';
export const SEARCH_SUCCESS = 'stack/search/success';
export const SEARCH_FAILURE = 'stack/search/failure';

export class SearchAction extends AbstractAction<SearchData> implements Action {
  type = SEARCH;

  constructor (searchData: SearchData) {
    super(searchData);
  }
}

export class SearchSuccessAction extends AbstractAction<SearchResults, SearchData> implements Action {
  type = SEARCH_SUCCESS;
}

export class SearchFailureAction extends AbstractAction<any, SearchData> implements Action {
  type = SEARCH_FAILURE;
}

export const GET_QUESTION = 'stack/question/get';
export const GET_QUESTION_SUCCESS = 'stack/question/get/success';
export const GET_QUESTION_FAILURE = 'stack/question/get/failure';

export class GetQuestionAction extends AbstractAction<QuestionId> implements Action {
  type = GET_QUESTION;
}

export class GetQuestionSuccessAction extends AbstractAction<Question, QuestionId> implements Action {
  type = GET_QUESTION_SUCCESS;
}

export class GetQuestionFailureAction extends AbstractAction<any, QuestionId> implements Action {
  type = GET_QUESTION_FAILURE;
}

export type StackActionUnion = SearchAction | SearchSuccessAction | SearchFailureAction
  | GetQuestionAction | GetQuestionSuccessAction | GetQuestionFailureAction;
