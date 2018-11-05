import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StackReducerState, StackState } from './stack.reducer';

export const selectStackState = createFeatureSelector<StackState, StackReducerState>('stack');

export const selectSearchPending = createSelector(
  selectStackState,
  (stackState) => stackState.isSearchPending,
);

export const selectSearchFinishPage = createSelector(
  selectStackState,
  (_, props) => props,
  ({ searchResultsFinishMap }, { query }) => searchResultsFinishMap[query],
);

export const  selectGetUserQuestionsPending = createSelector(
  selectStackState,
  (stackState) => stackState.isGetUserQuestionsPending,
);

export const selectUserQuestionsFinishPage = createSelector(
  selectStackState,
  (_, props) => props,
  ({ userQuestionsFinishMap }, { userId }) => userQuestionsFinishMap[userId],
);

export const  selectGetTagQuestionsPending = createSelector(
  selectStackState,
  (stackState) => stackState.isGetTagQuestionsPending,
);

export const selectTagQuestionsFinishPage = createSelector(
  selectStackState,
  (_, props) => props,
  ({ tagQuestionsFinishMap }, { tag }) => tagQuestionsFinishMap[tag],
);

export const selectSearchError = createSelector(
  selectStackState,
  (stackState) => stackState.error,
);

export const selectQuestions = createSelector(
  selectStackState,
  stackState => Object.values(stackState.questionsEntities),
);

export const selectSearchedQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ searchResultsMap, questionsEntities }, { query, page }) => {
    if (searchResultsMap[query] && searchResultsMap[query][page]) {
      return searchResultsMap[query][page].map(questionId => questionsEntities[questionId]);
    }

    return null;
  }
);

export const selectUserQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ userQuestionsMap, questionsEntities }, { userId, page }) => {
    if (userQuestionsMap[userId] && userQuestionsMap[userId][page]) {
      return userQuestionsMap[userId][page].map(questionId => questionsEntities[questionId]);
    }

    return null;
  }
);

export const selectTagQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ tagQuestionsMap, questionsEntities }, { tag, page }) => {
    if (tagQuestionsMap[tag] && tagQuestionsMap[tag][page]) {
      return tagQuestionsMap[tag][page].map(questionId => questionsEntities[questionId]);
    }

    return null;
  }
);

export const selectQuestion = createSelector(
  selectStackState,
  (_, props) => props.questionId,
  ({ questionsEntities }, questionId) => {
    if (questionsEntities[questionId]) {
      return questionsEntities[questionId];
    }

    return null;
  }
);

export const selectAnswers = createSelector(
  selectStackState,
  (_, props) => props.questionId,
  ({ answersMap }, questionId) => {
    if (answersMap[questionId]) {
      return answersMap[questionId];
    }

    return null;
  }
);
