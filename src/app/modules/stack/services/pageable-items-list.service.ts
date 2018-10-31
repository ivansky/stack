import { BehaviorSubject, Observable } from 'rxjs';

export interface PageableItemsListService<T> {
  items$: BehaviorSubject<T[]>;
  page$: BehaviorSubject<number>;
  init(): void;
  nextPage(): void;
}
