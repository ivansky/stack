import { makeAction } from '../utils/makeAction';
import { LoginData, User } from '../../models/auth.models';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const login = makeAction<LoginData>(LOGIN_REQUEST);
export const loginSuccess = makeAction<User>(LOGIN_SUCCESS);
export const loginFailure = makeAction<any>(LOGIN_FAILURE);

export const GET_PROFILE_REQUEST = 'profile/request';
export const GET_PROFILE_SUCCESS = 'profile/success';
export const GET_PROFILE_FAILURE = 'profile/failure';
export const getProfile = makeAction<null>(GET_PROFILE_REQUEST);
export const getProfileSuccess = makeAction<User>(GET_PROFILE_SUCCESS);
export const getProfileFailure = makeAction<any>(GET_PROFILE_FAILURE);

// @todo enumerate actions relate to auth module
export type AuthAction = any;
