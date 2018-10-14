import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
