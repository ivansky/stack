import { User } from './auth.models';
import * as authActions from './auth.actions';

export interface AuthReducerState {
  isLoginPending: boolean;
  isSignUpPending: boolean;
  isProfilePending: boolean;
  user: User | null;
  error: any;
  errors: any;
}

const initialAuthState = {
  isLoginPending: false,
  isSignUpPending: false,
  isProfilePending: false,
  user: null,
  error: null,
  errors: null,
};

export const authReducer = (state = initialAuthState, action: authActions.AuthActionUnion) => {
  switch (action.type) {
    case authActions.LOGOUT:
      return {
        ...initialAuthState,
      };
    case authActions.GET_PROFILE:
      return {
        ...state,
        isProfilePending: true,
      };
    case authActions.LOGIN:
      return {
        ...state,
        isLoginPending: true,
      };
    case authActions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isProfilePending: false,
        user: action.payload,
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginPending: false,
        user: action.payload,
      };
    case authActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUpPending: false,
        user: action.payload,
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoginPending: false,
        error: action.payload,
        errors: action.payload.errors ? action.payload.errors : null,
      };
    case authActions.SIGN_UP_FAILURE:
      return {
        ...state,
        isSignUpPending: false,
        error: action.payload,
        errors: action.payload.errors ? action.payload.errors : null,
      };
    case authActions.GET_PROFILE_FAILURE:
      return {
        ...state,
        isProfilePending: false,
        error: action.payload,
        errors: action.payload.errors ? action.payload.errors : null,
      };
  }

  return state;
};
