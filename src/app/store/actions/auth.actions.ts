import { Action } from '@ngrx/store';
import { AbstractAction } from '../utils/abstract-actions';
import { LoginData, SignUpData, User } from '../../models/auth.models';

export const LOGIN_REDIRECT = 'redirect/login';
export class LoginRedirect extends AbstractAction<string | never> implements Action {
  type = LOGIN_REDIRECT;

  constructor(backUrl?: string) {
    super(backUrl);
  }
}

export const LOGOUT = 'logout';
export const LOGOUT_SUCCESS = 'logout/success';
export const LOGOUT_FAILURE = 'logout/failure';

export class LogoutAction extends AbstractAction<never> implements Action {
  type = LOGOUT;
}

export class LogoutSuccessAction extends AbstractAction<never> implements Action {
  type = LOGOUT_SUCCESS;
}

export class LogoutFailureAction extends AbstractAction<any> implements Action {
  type = LOGOUT_FAILURE;
}

export const LOGIN = 'login';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';

export class LoginAction extends AbstractAction<LoginData> implements Action {
  type = LOGIN;
}

export class LoginSuccessAction extends AbstractAction<User> implements Action {
  type = LOGIN_SUCCESS;
}

export class LoginFailureAction extends AbstractAction<any> implements Action {
  type = LOGIN_FAILURE;
}

export const SIGN_UP = 'sign-up';
export const SIGN_UP_SUCCESS = 'sign-up/success';
export const SIGN_UP_FAILURE = 'sign-up/failure';

export class SignUpAction extends AbstractAction<SignUpData> implements Action {
  type = SIGN_UP;
}

export class SignUpSuccessAction extends AbstractAction<User> implements Action {
  type = SIGN_UP_SUCCESS;
}

export class SignUpFailureAction extends AbstractAction<any> implements Action {
  type = SIGN_UP_FAILURE;
}

export const GET_PROFILE = 'profile/get';
export const GET_PROFILE_SUCCESS = 'profile/get/success';
export const GET_PROFILE_FAILURE = 'profile/get/failure';

export class GetProfileAction extends AbstractAction<never> implements Action {
  type = GET_PROFILE;
}

export class GetProfileSuccessAction extends AbstractAction<User> implements Action {
  type = GET_PROFILE_SUCCESS;
}

export class GetProfileFailureAction extends AbstractAction<any> implements Action {
  type = GET_PROFILE_FAILURE;
}

export type AuthActionUnion = LoginRedirect
  | LogoutAction | LogoutSuccessAction | LogoutFailureAction
  | LoginAction | LoginSuccessAction | LoginFailureAction
  | SignUpAction | SignUpSuccessAction | SignUpFailureAction
  | GetProfileAction | GetProfileSuccessAction | GetProfileFailureAction;
