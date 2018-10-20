import { User } from '../../models/auth.models';
import * as authActions from '../actions/auth.actions';

export interface AuthReducerState {
  isPending: boolean;
  user: User | null;
  error: any;
}

const initialAuthState = {
  isPending: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialAuthState, action: authActions.AuthAction) => {
  switch (action.type) {
    case authActions.GET_PROFILE_REQUEST:
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        isPending: true,
      };
    case authActions.LOGIN_SUCCESS:
    case authActions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isPending: false,
        user: action.payload,
      };
    case authActions.LOGIN_FAILURE:
    case authActions.GET_PROFILE_FAILURE:
      return {
        ...state,
        isPending: false,
        user: null,
        error: action.payload,
      };
  }

  return state;
};
