import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-table',
  template: `
    <div class="search-table">
      <div class="search-table__item" *ngFor="let question of questions">
        {{ question.title }}
      </div>
    </div>
  `
})
export class SearchTableComponent {
  @Input()
  pending;

  @Input()
  errorMessage;

  @Input()
  questions;
}
