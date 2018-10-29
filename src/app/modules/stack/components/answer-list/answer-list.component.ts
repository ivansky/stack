import { Component, Input } from '@angular/core';
import { Answer } from '../../stack.models';

@Component({
  selector: 'app-answer-list',
  template: `
    <mat-list class="answer-list" *ngIf="answers">
      <h3 mat-subheader class="answer-list__title">Answers</h3>
      <mat-card class="answer-detail" *ngFor="let answer of answers">
        <mat-card-header>
          <div class="answer-detail__avatar" mat-card-avatar>
            <img [src]="answer.owner.profile_image" />
          </div>
          <mat-card-subtitle class="answer-detail__author">{{ answer.owner.display_name }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="answer-detail__body" [innerHTML]="answer.body"></mat-card-content>
      </mat-card>
    </mat-list>
  `,
  styleUrls: ['./answer-list.component.css'],
})
export class AnswerListComponent {
  @Input()
  answers: Answer[];
}
