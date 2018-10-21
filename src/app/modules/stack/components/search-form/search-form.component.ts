import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../../../models/auth.models';

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
          <button mat-stroked-button color="primary" type="submit">Search</button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.searchForm.disable();
    } else {
      this.searchForm.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<LoginData>();

  searchForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.searchForm.valid) {
      this.submitted.emit(this.searchForm.value);
    }
  }
}
