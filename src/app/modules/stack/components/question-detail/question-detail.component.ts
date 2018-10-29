import { Component, Input } from '@angular/core';
import { Question } from '../../stack.models';

@Component({
  selector: 'app-question-detail',
  template: `
    <mat-card class="question-detail" *ngIf="question">
      <mat-card-header>
        <div class="question-detail__avatar" mat-card-avatar>
          <img [src]="question.owner.profile_image" />
        </div>
        <mat-card-title class="question-detail__title">{{ question.title }}</mat-card-title>
        <mat-card-subtitle class="question-detail__author">{{ question.owner.display_name }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="question-detail__body" [innerHTML]="question.body"></mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  @Input()
  question: Question;
}
