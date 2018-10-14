import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      <span><a routerLink="/search">StackApp Observer</a></span>
      <span class="toolbar-spacer"></span>
      <button mat-flat-button routerLink="/login">Login</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
