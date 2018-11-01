import { PageableItemsListService, PageableItemsListServiceOptions } from '../pageable-items-list.service';
import { Question } from '../../stack.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { StackState } from '../../stack.reducer';

const defaultOptions = {
  limit: 10,
};

export class PageableQuestionListService implements PageableItemsListService<Question> {
  private requestedPagesMap: { [page: number]: boolean } = {};

  private constructor(
    private store: Store<StackState>,
    public items$: BehaviorSubject<Question[]>,
    public page$: BehaviorSubject<number>,
    private options: PageableItemsListServiceOptions<Question, StackState>,
  ) {}

  static create(
    store: Store<StackState>,
    options: PageableItemsListServiceOptions<Question, StackState>,
  ) {
    return new PageableQuestionListService(
      store,
      new BehaviorSubject<Question[]>([]),
      new BehaviorSubject<number>(1),
      {
        ...defaultOptions,
        ...options,
      },
    );
  }

  public init() {
    this.page$.subscribe(this.onChangedPage.bind(this));

    this.selectPageQuestions(this.page$.getValue())
      .subscribe((questions) => {
        if (!questions) {
          this.loadPage(this.page$.getValue());
        } else {
          this.items$.next(questions);
        }
      });
  }

  public nextPage() {
    this.loadPage(this.page$.getValue() + 1);
  }

  private loadPage(page) {
    this.page$.next(page);
  }

  private waitForLoadingPage(page): Observable<Question[]> {
    return this.store.pipe(
      this.options.itemsSelectProject(page),
      filter(questions => !!questions),
      take(1),
    );
  }

  private selectPageQuestions(page): Observable<Question[]> {
    return this.store.pipe(
      this.options.itemsSelectProject(page),
      take(1),
    );
  }

  private onLoadedPageQuestions(page, questions) {
    const pageIndex = page - 1;
    const offset = this.options.limit * pageIndex;
    const currentQuestions = this.items$.getValue();

    const nextQuestions = [
      ...currentQuestions.slice(0, offset),
      ...questions,
      ...currentQuestions.slice(offset + questions.length),
    ];

    this.items$.next(nextQuestions);
  }

  private onChangedPage(nextPage) {
    if (!this.requestedPagesMap[nextPage]) {
      this.store.dispatch(this.options.nextPageActionCreator(nextPage));

      this.requestedPagesMap[nextPage] = true;

      this.waitForLoadingPage(nextPage)
        .subscribe((questions) => this.onLoadedPageQuestions(nextPage, questions));
    }
  }
}
