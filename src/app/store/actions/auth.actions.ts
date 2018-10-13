import { makeAction } from '../utils/makeAction';
import { LoginData, User } from '../../models/auth.models';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const login = makeAction<LoginData>(LOGIN_REQUEST);
export const loginSuccess = makeAction<User>(LOGIN_SUCCESS);
export const loginFailure = makeAction<any>(LOGIN_FAILURE);

// @todo enumerate actions relate to auth module
export type AuthAction = any;
