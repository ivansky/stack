import * as stackActions from './stack.actions';
import { QuestionId, Question, SearchData, SearchResults } from './stack.models';

interface QuestionsEntities { [id: number]: Question; }

interface SearchResultsMap {
  [query: string]: { [page: number]: QuestionId[] };
}

export interface StackReducerState {
  query: string;
  isSearchPending: boolean;
  isGetQuestionPending: boolean;
  error: any;
  questionsEntities: QuestionsEntities;
  searchResultsMap: SearchResultsMap;
}

const initialStackState: StackReducerState = {
  query: '',
  isSearchPending: false,
  isGetQuestionPending: false,
  error: null,
  questionsEntities: {},
  searchResultsMap: {},
};

const searchSuccessReducer = (state, { items }: SearchResults, { query, page }: SearchData) => {
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

const getQuestionSuccessReducer = (state, { items }: SearchResults, questionId: QuestionId) => {
  let questionsEntities = state.questionsEntities;

  if (!questionsEntities[questionId]) {
    questionsEntities = {
      ...questionsEntities,
      [questionId]: items[0],
    };
  }

  return {
    ...state,
    questionsEntities,
    isGetQuestionPending: false,
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
      return searchSuccessReducer(state, action.payload as SearchResults, action.parentPayload as SearchData);
    case stackActions.SEARCH_FAILURE:
      return searchFailureReducer(state, action.payload);
    case stackActions.GET_QUESTION:
      return {
        ...state,
        isGetQuestionPending: true,
      };
    case stackActions.GET_QUESTION_SUCCESS:
      return getQuestionSuccessReducer(state, action.payload as SearchResults, action.parentPayload as QuestionId);
    case stackActions.GET_QUESTION_FAILURE:
      return searchFailureReducer(state, action.payload);
  }

  return state;
};

export interface StackState {
  stack: StackReducerState;
}
