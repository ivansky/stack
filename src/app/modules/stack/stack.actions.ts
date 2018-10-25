import { Action } from '@ngrx/store';
import { AbstractAction } from '../../store/utils/abstract-actions';
import { SearchData, SearchResults } from './stack.models';

export const SEARCH = 'stack/search';
export const SEARCH_SUCCESS = 'stack/search/success';
export const SEARCH_FAILURE = 'stack/search/failure';

export class SearchAction extends AbstractAction<SearchData> implements Action {
  type = SEARCH;

  constructor (searchData: SearchData) {
    super(searchData);
  }
}

export class SearchSuccessAction extends AbstractAction<SearchResults, SearchData> implements Action {
  type = SEARCH_SUCCESS;
}

export class SearchFailureAction extends AbstractAction<any, SearchData> implements Action {
  type = SEARCH_FAILURE;
}

export type StackActionUnion = SearchAction | SearchSuccessAction | SearchFailureAction;
