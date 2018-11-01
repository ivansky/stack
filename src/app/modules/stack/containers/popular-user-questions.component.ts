import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PageableQuestionListService } from '../services/impl/pageable-question-list.service';
import { PageableItemsListService } from '../services/pageable-items-list.service';
import * as stackSelectors from '../stack.selectors';
import * as stackActions from '../stack.actions';
import { Question } from '../stack.models';
import { StackState } from '../stack.reducer';

const QUESTIONS_PER_PAGE = 10;

@Component({
  selector: 'app-popular-user-questions',
  template: `
    <div #wrapper class="questions-table-quick">
      <app-search-table
        (openQuestion)="onOpenQuestion($event)"
        (openUserQuestions)="onOpenUserQuestions($event)"
        (reachedEnd)="onReachedEnd($event)"
        [questions]="itemsListService.items$ | async"
        [scrollingElement]="wrapper"
        [pending]="pending$ | async"
      ></app-search-table>
    </div>
  `,
  styles: [
    `
      .questions-table-quick {
        display: block;
        overflow: auto;
        min-height: 50vh;
        height: 100%;
      }
    `,
  ]
})
export class PopularUserQuestionsComponent implements OnInit {
  public pending$ = this.store.pipe(select(stackSelectors.selectGetUserQuestionsPending));
  private userId: number;

  @ViewChild('wrapper') wrapper: ElementRef;

  public itemsListService: PageableItemsListService<Question>;

  constructor(
    private store: Store<StackState>,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<PopularUserQuestionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: { userId: number },
  ) {
    this.itemsListService = this.createItemListService(data.userId);
  }

  private createItemListService(userId: number): PageableItemsListService<Question> {
    if (this.userId === userId) {
      return this.itemsListService;
    }

    if (this.itemsListService) {
      this.itemsListService.destroy();
    }

    this.userId = userId;

    return PageableQuestionListService.create(
      this.store,
      {
        limit: QUESTIONS_PER_PAGE,
        itemsSelectProject: (page: number) => select(stackSelectors.selectUserQuestions, {
          userId,
          page,
        }),
        nextPageActionCreator: (page: number) => new stackActions.GetUserQuestionsAction({
          userId,
          page,
          pageSize: QUESTIONS_PER_PAGE,
        }),
      },
    );
  }

  ngOnInit() {
    this.itemsListService.init();
  }

  onReachedEnd() {
    this.itemsListService.nextPage();
  }

  onOpenQuestion(questionId: number): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['stack/question', questionId]);
  }

  onOpenUserQuestions(userId: number): void {
    this.itemsListService = this.createItemListService(userId);
    this.itemsListService.init();
  }
}
