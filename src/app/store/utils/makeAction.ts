import { Action as CoreAction } from '@ngrx/store';

export interface Action<T = undefined> extends CoreAction {
  payload?: T;
}

export type ActionCreator<T = any> = (payload?: T) => Action<T>;

export const makeAction = <T = any>(type: string): ActionCreator<T> => (payload?: T): Action<T> => (payload ? {
  type,
  payload,
} : {
  type,
});
