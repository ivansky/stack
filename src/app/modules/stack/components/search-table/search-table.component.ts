import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SignUpData } from '../../../auth/auth.models';

@Component({
  selector: 'app-search-table',
  template: `
    <div class="search-table">
      <mat-card class="search-table__item" *ngFor="let question of questions">
        <mat-card-title>{{ question.title }}</mat-card-title>
        <mat-card-actions>
          <button mat-button>LIKE</button>
          <button mat-button>SHARE</button>
        </mat-card-actions>
      </mat-card>
      <mat-spinner *ngIf="pending" class="search-table__spinner" [diameter]="50"></mat-spinner>
    </div>
  `,
  styleUrls: ['./search-table.component.css'],
})
export class SearchTableComponent implements OnInit, OnDestroy {
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
  };

  ngOnInit(): void {
    this.window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', this.onScroll);
  }
}
