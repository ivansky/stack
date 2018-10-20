import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar class="header">
      <span><a routerLink="/search">StackApp Observer</a></span>
      <span class="toolbar-spacer"></span>
      <button *ngIf="!loggedIn" mat-flat-button routerLink="/auth/login">Login</button>
      <button *ngIf="loggedIn" mat-flat-button color="accent" (click)="onLogout()">Logout</button>
    </mat-toolbar>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input()
  loggedIn: boolean;

  @Output()
  logout: EventEmitter<any> = new EventEmitter();

  onLogout() {
    this.logout.emit();
  }
}
