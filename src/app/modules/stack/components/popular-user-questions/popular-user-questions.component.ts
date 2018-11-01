import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { PageableQuestionListService } from '../../services/impl/pageable-question-list.service';
import * as stackSelectors from '../../stack.selectors';
import * as stackActions from '../../stack.actions';
import { PageableItemsListService } from '../../services/pageable-items-list.service';
import { Question } from '../../stack.models';
import { StackState } from '../../stack.reducer';
import { Router } from '@angular/router';

const QUESTIONS_PER_PAGE = 10;

@Component({
  selector: 'app-popular-user-questions',
  template: `
    <div #wrapper class="questions-table-quick">
      <app-search-table
        (openQuestion)="onOpenQuestion($event)"
        (reachedEnd)="onReachedEnd($event)"
        [questions]="itemsListService.items$ | async"
        [scrollingElement]="wrapper"
      ></app-search-table>
    </div>
  `,
  styles: [
    `
      .questions-table-quick {
        display: block;
        overflow: auto;
        min-height: 50vh;
      }
    `,
  ]
})
export class PopularUserQuestionsComponent implements OnInit {
  private userId: number;

  @ViewChild('wrapper') wrapper: ElementRef;

  public itemsListService: PageableItemsListService<Question>;

  constructor(
    private store: Store<StackState>,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<PopularUserQuestionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: { userId: number },
  ) {
    this.userId = data.userId;

    this.itemsListService = PageableQuestionListService.create(
      this.store,
      {
        limit: QUESTIONS_PER_PAGE,
        itemsSelectProject: (page: number) => select(stackSelectors.selectUserQuestions, {
          userId: this.userId,
          page,
        }),
        nextPageActionCreator: (page: number) => new stackActions.GetUserQuestionsAction({
          userId: this.userId,
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
    console.log('onReachedEnd');
    this.itemsListService.nextPage();
  }

  onOpenQuestion(questionId: number): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['stack/question', questionId]);
  }
}
