import { PageableItemsListService, PageableItemsListServiceOptions } from '../pageable-items-list.service';
import { Question } from '../../stack.models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { StackState } from '../../stack.reducer';

const defaultOptions = {
  limit: 10,
};

export class PageableQuestionListService implements PageableItemsListService<Question> {
  private requestedPagesMap: { [page: number]: boolean } = {};
  private finishPage: number;

  private finishPageSubscription: Subscription;
  private pageSubscription: Subscription;
  private selectPageSubscription: Subscription;
  private waitForLoadingPageSubscription: Subscription;

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

  public init(): Promise<void> {
    return new Promise((resolve) => {
      this.pageSubscription = this.page$.subscribe(this.onChangedPage.bind(this));
      this.finishPageSubscription = this.store.pipe(this.options.finishPageOperator)
        .subscribe(finishPage => this.finishPage = finishPage);
      this.selectPageSubscription = this.selectPageQuestions(this.page$.getValue())
        .subscribe((questions) => {
          if (!questions) {
            this.loadPage(this.page$.getValue());
          } else {
            this.items$.next(questions);
            resolve();
          }
        });
    });
  }

  public destroy() {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }

    if (this.finishPageSubscription) {
      this.finishPageSubscription.unsubscribe();
    }

    if (this.selectPageSubscription) {
      this.selectPageSubscription.unsubscribe();
    }

    if (this.waitForLoadingPageSubscription) {
      this.waitForLoadingPageSubscription.unsubscribe();
    }
  }

  public nextPage() {
    if (this.isLimitReached()) {
      return;
    }

    this.loadPage(this.page$.getValue() + 1);
  }

  public isLimitReached() {
    return this.finishPage && this.finishPage <= this.page$.value;
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

      this.waitForLoadingPageSubscription = this.waitForLoadingPage(nextPage)
        .subscribe((questions) => this.onLoadedPageQuestions(nextPage, questions));
    }
  }
}
