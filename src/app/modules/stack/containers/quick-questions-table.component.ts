import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PageableQuestionListService } from '../services/impl/pageable-question-list.service';
import { PageableItemsListService } from '../services/pageable-items-list.service';
import * as stackSelectors from '../stack.selectors';
import * as stackActions from '../stack.actions';
import { Question } from '../stack.models';
import { StackState } from '../stack.reducer';
import { BehaviorSubject, Subscription } from 'rxjs';

const QUESTIONS_PER_PAGE = 10;

export enum QuickQuestionsType {
  USER,
  TAG,
}

@Component({
  selector: 'app-questions-table-quick',
  template: `
    <div #wrapper class="questions-table-quick">
      <mat-toolbar class="questions-table-quick__title">
        <span>{{ title }}</span>
      </mat-toolbar>
      <app-search-table
        (openQuestion)="onOpenQuestion($event)"
        (openUserQuestions)="onOpenUserQuestions($event)"
        (openTag)="onOpenTagQuestions($event)"
        (reachedEnd)="onReachedEnd()"
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
      .questions-table-quick__title {
        margin: 0 -16px;
      }
    `,
  ]
})
export class QuickQuestionsTableComponent implements OnInit, OnDestroy {
  public pending$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public title: string;
  private currentUserId: number;
  private currentTag: string;
  private currentType: QuickQuestionsType;
  private pendingSubscription: Subscription;

  @ViewChild('wrapper') wrapper: ElementRef;

  public itemsListService: PageableItemsListService<Question>;

  constructor(
    private store: Store<StackState>,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<QuickQuestionsTableComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: { userId?: number, tag?: string, type: QuickQuestionsType },
  ) {
    if (data.type === QuickQuestionsType.USER) {
      this.itemsListService = this.createUserItemListService(data.userId);
    } else if (data.type === QuickQuestionsType.TAG) {
      this.itemsListService = this.createTagItemListService(data.tag);
    }
  }

  private setPendingSelector(selector) {
    if (this.pendingSubscription) {
      this.pendingSubscription.unsubscribe();
    }

    this.pendingSubscription = this.store.pipe(select(selector))
      .subscribe(isPending => this.pending$.next(isPending));
  }

  private createUserItemListService(userId: number) {
    if (this.currentUserId === userId && this.currentType === QuickQuestionsType.USER) {
      return this.itemsListService;
    }

    if (this.currentType !== QuickQuestionsType.USER) {
      this.setPendingSelector(stackSelectors.selectGetUserQuestionsPending);
    }

    this.currentUserId = userId;
    this.currentType = QuickQuestionsType.USER;
    this.title = `Most popular user ${userId} questions`;

    return this.createItemListService(
      (page: number) => select(stackSelectors.selectUserQuestions, {
        userId,
        page,
      }),
      (page: number) => new stackActions.GetUserQuestionsAction({
        userId,
        page,
        pageSize: QUESTIONS_PER_PAGE,
      })
    );
  }

  private createTagItemListService(tag: string) {
    if (this.currentTag === tag && this.currentType === QuickQuestionsType.TAG) {
      return this.itemsListService;
    }

    if (this.currentType !== QuickQuestionsType.TAG) {
      this.setPendingSelector(stackSelectors.selectGetTagQuestionsPending);
    }

    this.currentTag = tag;
    this.currentType = QuickQuestionsType.TAG;
    this.title = `Frequently asked questions about ${tag}`;

    return this.createItemListService(
      (page: number) => select(stackSelectors.selectTagQuestions, {
        tag,
        page,
      }),
      (page: number) => new stackActions.GetTagQuestionsAction({
        tag,
        page,
        pageSize: QUESTIONS_PER_PAGE,
      })
    );
  }

  private createItemListService(itemsSelectProject, nextPageActionCreator): PageableItemsListService<Question> {
    if (this.itemsListService) {
      this.itemsListService.destroy();
    }

    return PageableQuestionListService.create(
      this.store,
      {
        limit: QUESTIONS_PER_PAGE,
        itemsSelectProject,
        nextPageActionCreator,
      },
    );
  }

  ngOnInit() {
    this.itemsListService.init();
  }

  ngOnDestroy() {
    this.itemsListService.destroy();

    if (this.pendingSubscription) {
      this.pendingSubscription.unsubscribe();
    }
  }

  onReachedEnd() {
    this.itemsListService.nextPage();
  }

  onOpenQuestion(questionId: number): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['stack/question', questionId]);
  }

  async onOpenUserQuestions(userId: number): Promise<void> {
    this.holdHeight();
    this.itemsListService = this.createUserItemListService(userId);
    await this.itemsListService.init();
    this.releaseHeight();
  }

  async onOpenTagQuestions(tag: string): Promise<void> {
    this.holdHeight();
    this.itemsListService = this.createTagItemListService(tag);
    await this.itemsListService.init();
    this.releaseHeight();
  }

  private holdHeight() {
    const element = this.wrapper.nativeElement;
    const height = element.clientHeight;
    element.style.height = element.clientHeight;
  }

  private releaseHeight() {
    this.wrapper.nativeElement.style.height = '100%';
  }
}
