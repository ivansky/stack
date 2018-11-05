import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducerState, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState, AuthReducerState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (authState) => authState.user,
);

export const selectProfilePending = createSelector(
  selectAuthState,
  (authState) => authState.isProfilePending,
);

export const selectLoggedIn = createSelector(selectUser, user => !!user);

export const selectLoginPending = createSelector(
  selectAuthState,
  (authState) => authState.isLoginPending,
);

export const selectLoginError = createSelector(
  selectAuthState,
  (authState) => authState.error,
);

export const selectSignUpPending = createSelector(
  selectAuthState,
  (authState) => authState.isSignUpPending,
);
export const selectSignUpError = selectLoginError;
