import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-4 pt-1">
            <a class="header-logo text-dark" routerLink="/">Stackoverflow Observer</a>
          </div>
          <div class="col-8 d-flex justify-content-end align-items-center">
            <a class="text-muted" routerLink="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round" class="mx-3">
                <circle cx="10.5" cy="10.5" r="7.5"></circle>
                <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
              </svg>
            </a>
            <a class="btn btn-sm btn-outline-secondary" routerLink="/login" routerLinkActive="active">Login</a>
          </div>
        </div>
      </header>
      <div class="nav-scroller py-1 mb-2">
        <nav class="nav d-flex justify-content-between">
          <a routerLink="/search" routerLinkActive="active">Search</a>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </nav>
      </div>
      <main role="main" class="container">
        <div class="row">
          <div class="col-md-8 blog-main">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
