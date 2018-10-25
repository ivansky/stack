import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchData } from '../../stack.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-form',
  template: `
    <mat-card class="search-card">
      <mat-card-title>Search</mat-card-title>

      <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="search-field">
          <input matInput formControlName="query" placeholder="Query search">
        </mat-form-field>

        <div class="search-buttons">
          <mat-spinner *ngIf="isPending | async" diameter="30"></mat-spinner>
          <button mat-stroked-button color="primary" type="submit" [disabled]="!searchForm.valid">Search</button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  public isPending = new BehaviorSubject(false);

  @Input()
  set pending(isPending: boolean) {
    this.isPending.next(isPending);

    if (isPending) {
      this.searchForm.disable();
    } else {
      this.searchForm.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<SearchData>();

  searchForm = new FormGroup({
    query: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.searchForm.valid) {
      this.submitted.emit(this.searchForm.value);
    }
  }
}
