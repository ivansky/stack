import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as stackActions from '../stack.actions';
import * as stackSelectors from '../stack.selectors';
import { Question} from '../stack.models';
import { StackState } from '../stack.reducer';
import { SearchTableQuickComponent } from '../components/search-table-quick/search-table-quick.component';

const QUESTIONS_PER_PAGE = 10;

@Component({
  selector: 'app-search-results',
  template: `
    <h2 class="search-results__title">Search results for: {{ query }}</h2>
    <app-search-table
      (reachedEnd)="onReachedEnd($event)"
      (openUserQuestions)="onOpenUsersQuestions($event)"
      [query]="query"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [questions]="questions$ | async"
    ></app-search-table>
  `,
  styles: [
    `
    .search-results__title {
      margin: 20px;
    }
    `
  ]
})
export class SearchResultsComponent implements OnInit {
  public requestedPagesMap: { [page: number]: boolean } = {};
  public page$ = new BehaviorSubject<number>(1);
  public questions$ = new BehaviorSubject<Question[]>([]);

  public pending$ = this.store.pipe(select(stackSelectors.selectSearchPending));
  public error$ = this.store.pipe(select(stackSelectors.selectSearchError));

  public query: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StackState>,
    private bottomSheet: MatBottomSheet,
  ) {}

  loadPage(page) {
    this.page$.next(page);
  }

  waitForLoadingPage(page): Observable<Question[]> {
    return this.store.pipe(
      select(stackSelectors.selectSearchedQuestions, {
        query: this.query,
        page,
      }),
      filter(questions => !!questions),
      take(1),
    );
  }

  selectPageQuestions(page): Observable<Question[]> {
    return this.store.pipe(
      select(stackSelectors.selectSearchedQuestions, {
        query: this.query,
        page,
      }),
      take(1),
    );
  }

  onLoadedPageQuestions(page, questions) {
    const pageIndex = page - 1;
    const offset = QUESTIONS_PER_PAGE * pageIndex;
    const currentQuestions = this.questions$.getValue();

    this.questions$.next([
      ...currentQuestions.slice(0, offset),
      ...questions,
      ...currentQuestions.slice(offset + questions.length),
    ]);
  }

  onChangedPage(nextPage) {
    if (!this.requestedPagesMap[nextPage]) {
      this.store.dispatch(new stackActions.SearchAction({
        query: this.query,
        page: nextPage,
      }));

      this.requestedPagesMap[nextPage] = true;

      this.waitForLoadingPage(nextPage)
        .subscribe((questions) => this.onLoadedPageQuestions(nextPage, questions));
    }
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');

    this.page$.subscribe(this.onChangedPage.bind(this));

    this.selectPageQuestions(this.page$.getValue())
      .subscribe((questions) => {
        if (!questions) {
          this.loadPage(this.page$.getValue());
        } else {
          this.questions$.next(questions);
        }
      });
  }

  onReachedEnd() {
    this.loadPage(this.page$.value + 1);
  }

  onOpenUsersQuestions() {
    this.bottomSheet.open(SearchTableQuickComponent);
  }

}
