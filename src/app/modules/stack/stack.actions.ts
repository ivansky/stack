import { Action } from '@ngrx/store';
import { AbstractAction } from '../../store/utils/abstract-actions';
import {
  Answer,
  Question,
  QuestionId,
  ResponseList,
  SearchData,
  TagQuestionsRequestData,
  UserId,
  UserQuestionsRequestData
} from './stack.models';

export const SEARCH = 'stack/search';
export const SEARCH_SUCCESS = 'stack/search/success';
export const SEARCH_FAILURE = 'stack/search/failure';

export class SearchAction extends AbstractAction<SearchData> implements Action {
  type = SEARCH;

  constructor (searchData: SearchData) {
    super(searchData);
  }
}

export class SearchSuccessAction extends AbstractAction<ResponseList<Question>, SearchData> implements Action {
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

export class GetQuestionSuccessAction extends AbstractAction<ResponseList<Question>, QuestionId> implements Action {
  type = GET_QUESTION_SUCCESS;
}

export class GetQuestionFailureAction extends AbstractAction<any, QuestionId> implements Action {
  type = GET_QUESTION_FAILURE;
}

export const GET_ANSWERS = 'stack/answers/get';
export const GET_ANSWERS_SUCCESS = 'stack/answers/get/success';
export const GET_ANSWERS_FAILURE = 'stack/answers/get/failure';

export class GetAnswersAction extends AbstractAction<QuestionId> implements Action {
  type = GET_ANSWERS;
}

export class GetAnswersSuccessAction extends AbstractAction<ResponseList<Answer>, QuestionId> implements Action {
  type = GET_ANSWERS_SUCCESS;
}

export class GetAnswersFailureAction extends AbstractAction<any, QuestionId> implements Action {
  type = GET_ANSWERS_FAILURE;
}

export const GET_USER_QUESTIONS = 'stack/user-questions/get';
export const GET_USER_QUESTIONS_SUCCESS = 'stack/user-questions/get/success';
export const GET_USER_QUESTIONS_FAILURE = 'stack/user-questions/get/failure';

export class GetUserQuestionsAction extends AbstractAction<UserQuestionsRequestData> implements Action {
  type = GET_USER_QUESTIONS;
}

export class GetUserQuestionsSuccessAction extends AbstractAction<ResponseList<Question>, UserQuestionsRequestData> implements Action {
  type = GET_USER_QUESTIONS_SUCCESS;
}

export class GetUserQuestionsFailureAction extends AbstractAction<any, UserQuestionsRequestData> implements Action {
  type = GET_USER_QUESTIONS_FAILURE;
}

export const GET_TAG_QUESTIONS = 'stack/tag-questions/get';
export const GET_TAG_QUESTIONS_SUCCESS = 'stack/tag-questions/get/success';
export const GET_TAG_QUESTIONS_FAILURE = 'stack/tag-questions/get/failure';

export class GetTagQuestionsAction extends AbstractAction<TagQuestionsRequestData> implements Action {
  type = GET_TAG_QUESTIONS;
}

export class GetTagQuestionsSuccessAction extends AbstractAction<ResponseList<Question>, TagQuestionsRequestData> implements Action {
  type = GET_TAG_QUESTIONS_SUCCESS;
}

export class GetTagQuestionsFailureAction extends AbstractAction<any, TagQuestionsRequestData> implements Action {
  type = GET_TAG_QUESTIONS_FAILURE;
}

export type StackActionUnion = SearchAction | SearchSuccessAction | SearchFailureAction
  | GetQuestionAction | GetQuestionSuccessAction | GetQuestionFailureAction
  | GetAnswersAction | GetAnswersSuccessAction | GetAnswersFailureAction
  | GetUserQuestionsAction | GetUserQuestionsSuccessAction | GetUserQuestionsFailureAction
  | GetTagQuestionsAction | GetTagQuestionsSuccessAction | GetTagQuestionsFailureAction;
