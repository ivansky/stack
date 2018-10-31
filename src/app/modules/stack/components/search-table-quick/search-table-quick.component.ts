import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-search-table-quick',
  template: `
    quick table
  `,
})
export class SearchTableQuickComponent {
  private userId: number;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SearchTableQuickComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: { userId: number },
  ) {
    this.userId = data.userId;
  }
}
