import { Component, Input } from '@angular/core';
import { User } from '../../auth.models';

@Component({
  selector: 'app-user-button',
  template: `
    <button *ngIf="user" mat-button color="primary" class="user-button">
      <span class="user-button__avatar">
        <img *ngIf="user.avatar" [src]="user.avatar" [alt]="user.name" />
        <img *ngIf="!user.avatar" src="/assets/avatar.png" [alt]="user.name" />
      </span>
      <span>{{ user.name }}</span>
    </button>
  `,
  styleUrls: ['./user-button.component.css'],
})
export class UserButtonComponent {
  @Input()
  user: User;
}
