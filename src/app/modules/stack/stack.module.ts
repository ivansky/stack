import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StackRoutingModule } from './stack-routing.module';
import { MaterialModule } from '../material/material.module';
import { StackService } from './stack.service';
import { stackReducer } from './stack.reducer';
import { StackEffects } from './stack.effects';

import { SearchPageComponent } from './containers/search-page.component';
import { SearchResultsComponent } from './containers/search-results.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchTableComponent } from './components/search-table/search-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchResultsComponent,
    SearchFormComponent,
    SearchTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StackRoutingModule,
    StoreModule.forFeature('stack', stackReducer),
    EffectsModule.forFeature([StackEffects])
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    StackService,
    { provide: 'Window',  useValue: window },
  ],
})
export class StackModule {}
