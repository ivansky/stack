import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as stackSelectors from '../stack.selectors';
import { StackState } from '../stack.reducer';
import { Question } from '../stack.models';
import * as stackActions from '../stack.actions';

@Component({
  selector: 'app-question-details',
  template: `
    <div class="question-details" *ngIf="(question$ | async) as question">
      {{ question.title }}
    </div>
    <mat-spinner *ngIf="!(question$ | async)" class="question-details__spinner" [diameter]="50"></mat-spinner>
  `,
})
export class QuestionDetailsComponent implements OnInit {
  public questionId: number;

  public question$: Observable<Question>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StackState>,
  ) {}

  onQuestionLoad = (question: Question) => {
    if (!question) {
      this.store.dispatch(new stackActions.GetQuestionAction(this.questionId));
    }
  }

  ngOnInit(): void {
    this.questionId = parseInt(this.route.snapshot.paramMap.get('question_id'), 10);

    this.question$ = this.store.pipe(select(stackSelectors.selectQuestion, { questionId: this.questionId }));

    this.question$.subscribe(this.onQuestionLoad);
  }

}
