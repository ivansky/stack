import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './containers/search-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchPageComponent },
  ])],
  exports: [RouterModule],
})
export class StackRoutingModule {}
