import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StackRoutingModule } from './stack-routing.module';
import { MaterialModule } from '../material/material.module';
import { StackService } from './stack.service';

import { SearchPageComponent } from './containers/search-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StackRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    StackService,
  ],
})
export class StackModule {}
