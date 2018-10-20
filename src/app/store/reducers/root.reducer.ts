import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../../environments/environment';
import { authReducer, AuthReducerState } from './auth.reducer';
import { RouterReducerState, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

export interface State {
  auth: AuthReducerState;
  router: RouterReducerState;
}

export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url, root: { queryParams } } = routerState;

    let state: ActivatedRouteSnapshot = routerState.root;

    // Wait for firstChild is ready
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return {
      url,
      queryParams,
      params,
    };
  }
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];


export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  router: routerReducer,
};
