import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StackRoutingModule } from './stack-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { StackService } from './stack.service';
import { stackReducer } from './stack.reducer';
import { StackEffects } from './stack.effects';

import { SearchPageComponent } from './containers/search-page.component';
import { SearchResultsComponent } from './containers/search-results.component';
import { QuestionPageComponent } from './containers/question-page.component';
import { HighlightSubstringPipe } from './pipes/highlight-substring.pipe';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchTableComponent } from './components/search-table/search-table.component';
import { PopularUserQuestionsComponent } from './components/popular-user-questions/popular-user-questions.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchResultsComponent,
    SearchFormComponent,
    SearchTableComponent,
    PopularUserQuestionsComponent,
    QuestionPageComponent,
    QuestionDetailComponent,
    AnswerListComponent,
    HighlightSubstringPipe,
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
  entryComponents: [
    PopularUserQuestionsComponent,
  ],
  providers: [
    StackService,
    { provide: 'Window',  useValue: window },
  ],
})
export class StackModule {}
