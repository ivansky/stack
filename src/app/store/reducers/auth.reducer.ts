import { User } from '../../models/auth.models';
import * as authActions from '../actions/auth.actions';

export interface AuthReducerState {
  isLoading: boolean;
  user: User;
}

const initialAuthState = {
  isLoading: false,
  user: null,
};

export const authReducer = (state = initialAuthState, action: authActions.AuthAction) => {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case authActions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
  }

  return state;
};
