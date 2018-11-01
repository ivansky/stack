import * as stackActions from './stack.actions';
import { QuestionId, Question, SearchData, ResponseList, Answer, UserId, UserQuestionsRequestData } from './stack.models';
import { GET_USER_QUESTIONS, GET_USER_QUESTIONS_FAILURE } from './stack.actions';

interface QuestionsEntities { [id: number]: Question; }

interface SearchResultsMap {
  [query: string]: { [page: number]: QuestionId[] };
}

interface QuestionAnswersMap {
  [questionId: number]: Answer[];
}

interface UserQuestionsMap {
  [userId: number]: { [page: number]: QuestionId[] };
}

export interface StackReducerState {
  query: string;
  isSearchPending: boolean;
  isGetQuestionPending: boolean;
  isGetUserQuestionsPending: boolean;
  error: any;
  questionsEntities: QuestionsEntities;
  answersMap: QuestionAnswersMap;
  searchResultsMap: SearchResultsMap;
  userQuestionsMap: UserQuestionsMap;
}

const initialStackState: StackReducerState = {
  query: '',
  isSearchPending: false,
  isGetQuestionPending: false,
  isGetUserQuestionsPending: false,
  error: null,
  questionsEntities: {},
  answersMap: {},
  searchResultsMap: {},
  userQuestionsMap: {},
};

const searchSuccessReducer = (state, { items }: ResponseList<Question>, { query, page }: SearchData) => {
  const questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
    ...entities,
    [question.question_id]: question,
  }), state.questionsEntities);

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

const getUserQuestionsSuccessReducer = (state, { items }: ResponseList<Question>, { userId, page }: UserQuestionsRequestData) => {
  const questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
    ...entities,
    [question.question_id]: question,
  }), state.questionsEntities);

  const userQuestionsIds: QuestionId[] = items.map((question) => question.question_id);

  const userQuestionsMap = {
    ...state.userQuestionsMap,
    [userId]: {
      ...(state.userQuestionsMap[userId] || {}),
      [page]: userQuestionsIds,
    }
  };

  return {
    ...state,
    isGetUserQuestionPending: false,
    questionsEntities,
    userQuestionsMap
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
    case GET_USER_QUESTIONS:
      return {
        ...state,
        isGetUserQuestionsPending: true,
      };
    case stackActions.GET_USER_QUESTIONS_SUCCESS:
      return getUserQuestionsSuccessReducer(
        state,
        action.payload as ResponseList<Question>,
        action.parentPayload as UserQuestionsRequestData
      );
    case GET_USER_QUESTIONS_FAILURE:
      return {
        ...state,
        isGetUserQuestionsPending: false,
      };
  }

  return state;
};

export interface StackState {
  stack: StackReducerState;
}
