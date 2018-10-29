import * as stackActions from './stack.actions';
import { QuestionId, Question, SearchData, ResponseList, Answer } from './stack.models';

interface QuestionsEntities { [id: number]: Question; }

interface SearchResultsMap {
  [query: string]: { [page: number]: QuestionId[] };
}

interface QuestionAnswersMap {
  [questionId: number]: Answer[];
}

export interface StackReducerState {
  query: string;
  isSearchPending: boolean;
  isGetQuestionPending: boolean;
  error: any;
  questionsEntities: QuestionsEntities;
  answersMap: QuestionAnswersMap;
  searchResultsMap: SearchResultsMap;
}

const initialStackState: StackReducerState = {
  query: '',
  isSearchPending: false,
  isGetQuestionPending: false,
  error: null,
  questionsEntities: {},
  answersMap: {},
  searchResultsMap: {},
};

const searchSuccessReducer = (state, { items }: ResponseList<Question>, { query, page }: SearchData) => {
  const questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
    ...entities,
    [question.question_id]: question,
  }), items);

  const searchQuestionsIds: QuestionId[] = items.map((question) => question.question_id);

  const searchResultsMap = {
    ...state.searchResultsMap,
    [query]: {
      ...(state.searchResultsMap[query] || {}),
      [page]: searchQuestionsIds,
    }
  };

  return {
    ...state,
    isSearchPending: false,
    questionsEntities,
    searchResultsMap,
  };
};

const searchFailureReducer = (state, error: any) => {
  return {
    ...state,
    isSearchPending: false,
    error,
  };
};

const getQuestionSuccessReducer = (state, { items }: ResponseList<Question>, questionId: QuestionId) => {
  return {
    ...state,
    questionsEntities: {
      ...state.questionsEntities,
      [questionId]: items[0],
    },
    isGetQuestionPending: false,
  };
};

const getAnswersSuccessReducer = (state, { items }: ResponseList<Answer>, questionId: QuestionId) => {
  return {
    ...state,
    answersMap: {
      ...state.answersMap,
      [questionId]: items,
    }
  };
};

export const stackReducer = (state = initialStackState, action: stackActions.StackActionUnion) => {
  switch (action.type) {
    case stackActions.SEARCH:
      return {
        ...state,
        isSearchPending: true,
      };
    case stackActions.SEARCH_SUCCESS:
      return searchSuccessReducer(state, action.payload as ResponseList<Question>, action.parentPayload as SearchData);
    case stackActions.SEARCH_FAILURE:
      return searchFailureReducer(state, action.payload);
    case stackActions.GET_QUESTION:
      return {
        ...state,
        isGetQuestionPending: true,
      };
    case stackActions.GET_QUESTION_SUCCESS:
      return getQuestionSuccessReducer(state, action.payload as ResponseList<Question>, action.parentPayload as QuestionId);
    case stackActions.GET_QUESTION_FAILURE:
      return {
        ...state,
        isGetQuestionPending: false,
      };
    case stackActions.GET_ANSWERS_SUCCESS:
      return getAnswersSuccessReducer(state, action.payload as ResponseList<Answer>, action.parentPayload as QuestionId);
  }

  return state;
};

export interface StackState {
  stack: StackReducerState;
}
