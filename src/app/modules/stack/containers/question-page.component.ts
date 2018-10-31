import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as stackSelectors from '../stack.selectors';
import { StackState } from '../stack.reducer';
import { Answer, Question } from '../stack.models';
import * as stackActions from '../stack.actions';

@Component({
  selector: 'app-question-page',
  template: `
    <app-question-detail [question]="question$ | async"></app-question-detail>
    <mat-spinner *ngIf="!(question$ | async) || !(answers$ | async)"
                 class="question-details__spinner"
                 [diameter]="50"></mat-spinner>
    <app-answer-list [answers]="answers$ | async"></app-answer-list>
  `,
})
export class QuestionPageComponent implements OnInit {
  public questionId: number;

  public question$: Observable<Question>;
  public answers$: Observable<Answer[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StackState>,
  ) {}

  onQuestionLoad = (question: Question) => {
    if (!question || !question.body) {
      this.store.dispatch(new stackActions.GetQuestionAction(this.questionId));
    }
  }

  onAnswersLoad = (answers: Answer[]) => {
    if (!answers) {
      this.store.dispatch(new stackActions.GetAnswersAction(this.questionId));
    }
  }

  ngOnInit(): void {
    this.questionId = parseInt(this.route.snapshot.paramMap.get('question_id'), 10);

    this.question$ = this.store.pipe(select(stackSelectors.selectQuestion, { questionId: this.questionId }));

    this.question$.subscribe(this.onQuestionLoad);

    this.answers$ = this.store.pipe(select(stackSelectors.selectAnswers, { questionId: this.questionId }));

    this.answers$.subscribe(this.onAnswersLoad);
  }

}
