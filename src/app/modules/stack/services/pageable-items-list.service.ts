import { BehaviorSubject, Observable } from 'rxjs';
import { StackState } from '../stack.reducer';
import { Action } from '@ngrx/store';

export interface PageableItemsListService<T> {
  items$: BehaviorSubject<T[]>;
  page$: BehaviorSubject<number>;
  init(): Promise<void>;
  destroy(): void;
  nextPage(): void;
  isLimitReached(): boolean;
}

export interface PageableItemsListServiceOptions<T, State = StackState> {
  limit?: number;
  itemsSelectProject: (page: number) => (source$: Observable<State>) => Observable<T[]>;
  nextPageActionCreator: (nextPage: number) => Action;
  finishPageOperator: (source$: Observable<State>) => Observable<number>;
}
