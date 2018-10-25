import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as stackActions from '../stack.actions';
import * as stackSelectors from '../stack.selectors';
import { Question, SearchData } from '../stack.models';
import { StackState } from '../stack.reducer';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  template: `
    <h2>Search results for: {{ query }}</h2>
    <app-search-table
      (onScrolled)="onScrolled($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [questions]="questions$ | async"
    ></app-search-table>
  `
})
export class SearchResultsComponent implements OnInit {
  private currentPage = 1;

  public questions$ = new BehaviorSubject<Question[]>([]);
  public pending$ = this.store.pipe(select(stackSelectors.selectSearchPending));
  public error$ = this.store.pipe(select(stackSelectors.selectSearchError));

  public query: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StackState>,
  ) {}

  nextPage(page) {
    this.store.dispatch(new stackActions.SearchAction({
      query: this.query,
      page,
    }));
  }

  waitForQueryPage(query, page): Observable<Question[]> {
    return this.store.pipe(
      select(stackSelectors.selectSearchedQuestions, {
        query,
        page,
      }),
      filter(questions => !!questions),
      take(1),
    );
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
    this.waitForQueryPage(this.query, this.currentPage).subscribe(console.log);

    this.store.pipe(
      select(stackSelectors.selectSearchedQuestions, {
        query: this.query,
        page: this.currentPage,
      })
    ).subscribe((questions) => {
      if (!questions) {
        this.nextPage(1);
      } else {
        this.questions$.next(questions);
      }
    });

    this.questions$.subscribe((questions) => {
      if (!questions) {
        this.nextPage(1);
      }
    });
  }

  onScrolled() {

  }

}
