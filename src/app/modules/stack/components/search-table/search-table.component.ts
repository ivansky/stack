import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-table',
  template: `
    <div class="search-table" *ngIf="questions">
      <mat-card class="search-table__item" *ngFor="let question of questions">
        <mat-card-title>
          <a (click)="onOpenQuestion(question.question_id)" routerLink="/stack/question/{{ question.question_id }}"
             [innerHTML]="question.title | hl: query"></a>
        </mat-card-title>
        <mat-chip-list>
          <mat-chip class="tag"
                    color="primary"
                    *ngFor="let tag of question.tags"
                    (click)="onOpenTag(tag)">{{ tag }}</mat-chip>
        </mat-chip-list>
        <mat-card-actions class="search-table__item-buttons">
          <button (click)="onOpenQuestion(question.question_id)" routerLink="/stack/question/{{ question.question_id }}"
                  mat-button color="primary">{{ question.answer_count }} answers</button>
          <span class="buttons-spacer"></span>
          <button (click)="onOpenUserQuestions(question.owner.user_id)"
                  mat-button color="accent">
            <span>{{ question.owner.display_name }}</span>
            <span class="item-avatar" mat-card-avatar>
              <img [src]="question.owner.profile_image" />
            </span>
          </button>
        </mat-card-actions>
      </mat-card>
      <mat-spinner *ngIf="pending" class="search-table__spinner" [diameter]="50"></mat-spinner>
    </div>
  `,
  styleUrls: ['./search-table.component.css'],
})
export class SearchTableComponent implements AfterViewInit, OnDestroy {
  @Input()
  query;

  @Input()
  pending;

  @Input()
  page;

  @Input()
  errorMessage;

  @Input()
  questions;

  @Input()
  scrollingElement: Element;

  @Output()
  reachedEnd = new EventEmitter<any>();

  @Output()
  openUserQuestions = new EventEmitter<number>();

  @Output()
  openQuestion = new EventEmitter<number>();

  @Output()
  openTag = new EventEmitter<string>();

  scrollSubscription: Subscription;

  onScroll = (event) => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = (this.scrollingElement.hasOwnProperty('document'))
      ? (this.scrollingElement as any).document.scrollingElement
      : this.scrollingElement;

    if (!this.pending && scrollTop + clientHeight === scrollHeight) {
      this.reachedEnd.emit(null);
    }
  }

  onOpenUserQuestions(userId: number): void {
    if (this.openUserQuestions) {
      this.openUserQuestions.emit(userId);
    }
  }

  onOpenQuestion(questionId: number): void {
    if (this.openQuestion) {
      this.openQuestion.emit(questionId);
    }
  }

  onOpenTag(tag: string): void {
    if (this.openTag) {
      this.openTag.emit(tag);
    }
  }

  ngAfterViewInit(): void {
    this.scrollSubscription = fromEvent(this.scrollingElement, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(this.onScroll);
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
