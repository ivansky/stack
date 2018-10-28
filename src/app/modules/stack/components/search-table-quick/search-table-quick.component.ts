import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-search-table-quick',
  template: `
    quick table
  `,
})
export class SearchTableQuickComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<SearchTableQuickComponent>,
  ) {}
}
