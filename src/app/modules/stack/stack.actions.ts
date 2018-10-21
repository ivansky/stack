import { Action } from '@ngrx/store';
import { AbstractAction } from '../../store/utils/abstract-actions';

export class SearchAction extends AbstractAction<string> implements Action {
  type = 'stack/search';

  constructor (queryString: string) {
    super(queryString);
  }
}
