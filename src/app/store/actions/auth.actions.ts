import { makeAction } from '../utils/makeAction';
import { LoginData, SignUpData, User } from '../../models/auth.models';
import { Action } from '@ngrx/store';

export const LOGIN_REDIRECT = 'redirect/login';
export class LoginRedirect implements Action {
  public type = LOGIN_REDIRECT;
  public payload: string;

  constructor(backUrl?: string) {
    if (backUrl) {
      this.payload = backUrl;
    }
  }
}

export const LOGOUT = 'logout';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const login = makeAction<LoginData>(LOGIN_REQUEST);
export const loginSuccess = makeAction<User>(LOGIN_SUCCESS);
export const loginFailure = makeAction<any>(LOGIN_FAILURE);

export const SIGN_UP_REQUEST = 'sign-up/request';
export const SIGN_UP_SUCCESS = 'sign-up/success';
export const SIGN_UP_FAILURE = 'sign-up/failure';

export const GET_PROFILE_REQUEST = 'profile/request';
export const GET_PROFILE_SUCCESS = 'profile/success';
export const GET_PROFILE_FAILURE = 'profile/failure';
export const getProfile = makeAction(GET_PROFILE_REQUEST);
export const getProfileSuccess = makeAction<User>(GET_PROFILE_SUCCESS);
export const getProfileFailure = makeAction<any>(GET_PROFILE_FAILURE);

// @todo enumerate actions relate to auth module
export type AuthAction = any;

export class LoginAction implements Action {
  public type = LOGIN_REQUEST;
  constructor(public payload: LoginData) {}
}

export class LoginSuccessAction implements Action {
  public type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailureAction implements Action {
  public type = LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUpAction implements Action {
  public type = SIGN_UP_REQUEST;
  constructor(public payload: SignUpData) {}
}

export class SignUpSuccessAction implements Action {
  public type = SIGN_UP_SUCCESS;
  constructor(public payload: User) {}
}

export class SignUpFailureAction implements Action {
  public type = SIGN_UP_FAILURE;
  constructor(public payload: any) {}
}

export class GetProfileAction implements Action {
  public type = GET_PROFILE_REQUEST;
}

export class GetProfileSuccessAction implements Action {
  public type = GET_PROFILE_SUCCESS;
  constructor(public payload: User) {}
}

export class GetProfileFailureAction implements Action {
  public type = GET_PROFILE_FAILURE;
  constructor(public payload: any) {}
}
