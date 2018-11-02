import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './containers/search-page.component';
import { SearchResultsComponent } from './containers/search-results.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { QuestionPageComponent } from './containers/question-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchPageComponent, data: { animation: 'SearchForm' } },
    { path: 'search/:query', component: SearchResultsComponent, data: { animation: 'SearchResults' } },
    { path: 'question/:question_id', component: QuestionPageComponent, data: { animation: 'QuestionPage' } },
    { path: '**', component: NotFoundComponent }
  ])],
  exports: [RouterModule],
})
export class StackRoutingModule {}
