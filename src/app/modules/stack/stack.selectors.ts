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

export const selectSearchedQuestions = createSelector(
  selectStackState,
  (_, props) => props,
  ({ searchResultsMap, questionsEntities }, { query, page }) => {
    console.log(searchResultsMap, query, page);
    if (searchResultsMap[query] && searchResultsMap[query][page]) {
      return searchResultsMap[query][page].map(questionId => questionsEntities[questionId]);
    }

    return null;
  }
);
