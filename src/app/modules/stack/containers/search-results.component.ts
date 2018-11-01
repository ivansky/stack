import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import * as stackActions from '../stack.actions';
import * as stackSelectors from '../stack.selectors';
import { Question} from '../stack.models';
import { StackState } from '../stack.reducer';
import { PopularUserQuestionsComponent } from './popular-user-questions.component';
import { PageableQuestionListService } from '../services/impl/pageable-question-list.service';
import { PageableItemsListService } from '../services/pageable-items-list.service';

const QUESTIONS_PER_PAGE = 10;

@Component({
  selector: 'app-search-results',
  template: `
    <h2 class="search-results__title">Search results for: {{ query }}</h2>
    <app-search-table
      (reachedEnd)="onReachedEnd($event)"
      (openUserQuestions)="onOpenUsersQuestions($event)"
      (openQuestion)="onOpenQuestion($event)"
      [query]="query"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [questions]="itemsListService.items$ | async"
      [scrollingElement]="window"
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
  public pending$ = this.store.pipe(select(stackSelectors.selectSearchPending));
  public error$ = this.store.pipe(select(stackSelectors.selectSearchError));

  public query: string;
  public itemsListService: PageableItemsListService<Question>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<StackState>,
    private bottomSheet: MatBottomSheet,
    @Inject('Window') public window: Window,
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');

    this.itemsListService = PageableQuestionListService.create(
      this.store,
      {
        limit: QUESTIONS_PER_PAGE,
        itemsSelectProject: (page: number) => select(stackSelectors.selectSearchedQuestions, {
          query: this.query,
          page,
        }),
        nextPageActionCreator: (page: number) => new stackActions.SearchAction({
          query: this.query,
          page,
          pageSize: QUESTIONS_PER_PAGE,
        }),
      },
    );

    this.itemsListService.init();
  }

  onReachedEnd() {
    this.itemsListService.nextPage();
  }

  onOpenUsersQuestions(userId): void {
    this.bottomSheet.open(PopularUserQuestionsComponent, {
      data: {
        userId,
      }
    });
  }

  onOpenQuestion(questionId: number): void {
    this.router.navigate(['stack/question', questionId]);
  }
}
