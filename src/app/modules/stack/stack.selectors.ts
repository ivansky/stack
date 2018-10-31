import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StackReducerState, StackState } from './stack.reducer';

export const selectStackState = createFeatureSelector<StackState, StackReducerState>('stack');

export const selectSearchPending = createSelector(
  selectStackState,
  (stackState) => stackState.isSearchPending,
);

export const selectSearchError = createSelector(
  selectStackState,
  (stackState) => stackState.error,
);

export const selectQuestions = createSelector(
  selectStackState,
  stackState => Object.values(stackState.questionsEntities),
);

export const selectSearchedPageQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ searchResultsMap, questionsEntities }, { query, page }) => {
    if (searchResultsMap[query] && searchResultsMap[query][page]) {
      return searchResultsMap[query][page].map(questionId => questionsEntities[questionId]);
    }

    return null;
  }
);

export const selectSearchedAllQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ searchResultsMap, questionsEntities }, { query }) => {
    if (searchResultsMap[query]) {
      Object.keys(searchResultsMap[query]).reduce((questions, page) => (
        [
          ...questions,
          searchResultsMap[query][page].map(questionId => questionsEntities[questionId]),
        ]
      ), []);
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
