import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-table',
  template: `
    <div class="search-table" *ngIf="questions">
      <mat-card class="search-table__item" *ngFor="let question of questions">
        <mat-card-title>
          <a routerLink="/stack/question/{{ question.question_id }}"
             [innerHTML]="question.title | hl: query"></a>
        </mat-card-title>
        <mat-card-actions class="search-table__item-buttons">
          <button routerLink="/stack/question/{{ question.question_id }}"
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
export class SearchTableComponent implements OnInit, OnDestroy {
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

  @Output()
  reachedEnd = new EventEmitter<void>();

  @Output()
  openUserQuestions = new EventEmitter<number>();

  constructor(
    @Inject('Window') private window: Window,
  ) {}

  onScroll = (event) => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = event.target.scrollingElement;

    if (!this.pending && scrollTop + clientHeight === scrollHeight) {
      this.reachedEnd.emit();
    }
  }

  onOpenUserQuestions(userId: number): void {
    this.openUserQuestions.emit(userId);
  }

  ngOnInit(): void {
    this.window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', this.onScroll);
  }
}
