import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/root.reducer';
import { AuthReducerState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<State, AuthReducerState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (authState) => authState.user,
);

export const selectLoggedIn = createSelector(selectUser, user => !!user);

export const selectLoginPending = createSelector(
  selectAuthState,
  (authState) => authState.isPending,
);

export const selectLoginError = createSelector(
  selectAuthState,
  (authState) => authState.error,
);

export const selectSignUpPending = selectLoginPending;
export const selectSignUpError = selectLoginError;
