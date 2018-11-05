import * as stackActions from './stack.actions';
import {
  QuestionId,
  Question,
  SearchData,
  ResponseList,
  Answer,
  UserQuestionsRequestData,
  TagQuestionsRequestData
} from './stack.models';

type FinishPage = number;

interface QuestionsEntities { [id: number]: Question; }

interface SearchResultsMap {
  [query: string]: { [page: number]: QuestionId[] };
}

interface SearchResultsFinishMap {
  [query: string]: FinishPage;
}

interface QuestionAnswersMap {
  [questionId: number]: Answer[];
}

interface UserQuestionsMap {
  [userId: number]: { [page: number]: QuestionId[] };
}

interface UserQuestionsFinishMap {
  [userId: number]: FinishPage;
}

interface TagQuestionsMap {
  [tag: string]: { [page: number]: QuestionId[] };
}

interface TagQuestionsFinishMap {
  [tag: string]: FinishPage;
}

export interface StackReducerState {
  query: string;
  isSearchPending: boolean;
  isGetQuestionPending: boolean;
  isGetUserQuestionsPending: boolean;
  isGetTagQuestionsPending: boolean;
  error: any;
  questionsEntities: QuestionsEntities;
  answersMap: QuestionAnswersMap;
  searchResultsMap: SearchResultsMap;
  searchResultsFinishMap: SearchResultsFinishMap;
  userQuestionsMap: UserQuestionsMap;
  userQuestionsFinishMap: UserQuestionsFinishMap;
  tagQuestionsMap: TagQuestionsMap;
  tagQuestionsFinishMap: TagQuestionsFinishMap;
}

const initialStackState: StackReducerState = {
  query: '',
  isSearchPending: false,
  isGetQuestionPending: false,
  isGetUserQuestionsPending: false,
  isGetTagQuestionsPending: false,
  error: null,
  questionsEntities: {},
  answersMap: {},
  searchResultsMap: {},
  searchResultsFinishMap: {},
  userQuestionsMap: {},
  userQuestionsFinishMap: {},
  tagQuestionsMap: {},
  tagQuestionsFinishMap: {},
};

const searchSuccessReducer = (state, { items }: ResponseList<Question>, { query, page }: SearchData) => {
  let questionsEntities = state.questionsEntities;
  let searchResultsMap = state.searchResultsMap;
  let searchResultsFinishMap = state.searchResultsFinishMap;

  if (items.length > 0) {
    questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
      ...entities,
      [question.question_id]: question,
    }), state.questionsEntities);

    const searchQuestionsIds: QuestionId[] = items.map((question) => question.question_id);

    searchResultsMap = {
      ...state.searchResultsMap,
      [query]: {
        ...(state.searchResultsMap[query] || {}),
        [page]: searchQuestionsIds,
      }
    };
  } else {
    searchResultsFinishMap = {
      ...state.searchResultsFinishMap,
      [query]: page,
    };
  }

  return {
    ...state,
    isSearchPending: false,
    questionsEntities,
    searchResultsMap,
    searchResultsFinishMap,
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
  let questionsEntities = state.questionsEntities;
  let userQuestionsMap = state.userQuestionsMap;
  let userQuestionsFinishMap = state.userQuestionsFinishMap;

  if (items.length > 0) {
    questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
      ...entities,
      [question.question_id]: question,
    }), state.questionsEntities);

    const userQuestionsIds: QuestionId[] = items.map((question) => question.question_id);

    userQuestionsMap = {
      ...state.userQuestionsMap,
      [userId]: {
        ...(state.userQuestionsMap[userId] || {}),
        [page]: userQuestionsIds,
      }
    };
  } else {
    userQuestionsFinishMap = {
      ...state.userQuestionsFinishMap,
      [userId]: page,
    };
  }

  return {
    ...state,
    isGetUserQuestionsPending: false,
    questionsEntities,
    userQuestionsMap,
    userQuestionsFinishMap,
  };
};

const getTagQuestionsSuccessReducer = (state, { items }: ResponseList<Question>, { tag, page }: TagQuestionsRequestData) => {
  let questionsEntities = state.questionsEntities;
  let tagQuestionsMap = state.tagQuestionsMap;
  let tagQuestionsFinishMap = state.tagQuestionsFinishMap;

  if (items.length > 0) {
    questionsEntities = items.reduce((entities: QuestionsEntities, question: Question) => ({
      ...entities,
      [question.question_id]: question,
    }), state.questionsEntities);

    const tagQuestionsIds: QuestionId[] = items.map((question) => question.question_id);

    tagQuestionsMap = {
      ...state.tagQuestionsMap,
      [tag]: {
        ...(state.tagQuestionsMap[tag] || {}),
        [page]: tagQuestionsIds,
      }
    };
  } else {
    tagQuestionsFinishMap = {
      ...state.tagQuestionsFinishMap,
      [tag]: page,
    };
  }

  return {
    ...state,
    isGetTagQuestionPending: false,
    questionsEntities,
    tagQuestionsMap,
    tagQuestionsFinishMap,
  };
};

export function stackReducer(state = initialStackState, action: stackActions.StackActionUnion) {
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
    case stackActions.GET_USER_QUESTIONS:
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
    case stackActions.GET_USER_QUESTIONS_FAILURE:
      return {
        ...state,
        isGetUserQuestionsPending: false,
      };
    case stackActions.GET_TAG_QUESTIONS:
      return {
        ...state,
        isGetTagQuestionsPending: true,
      };
    case stackActions.GET_TAG_QUESTIONS_SUCCESS:
      return getTagQuestionsSuccessReducer(
        state,
        action.payload as ResponseList<Question>,
        action.parentPayload as TagQuestionsRequestData
      );
    case stackActions.GET_TAG_QUESTIONS_FAILURE:
      return {
        ...state,
        isGetTagQuestionsPending: false,
      };
  }

  return state;
}

export interface StackState {
  stack: StackReducerState;
}
