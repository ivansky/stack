import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthCheckGuard } from '../auth/guards/auth-check.guard';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
    { path: 'stack', loadChildren: '../stack/stack.module#StackModule', canActivate: [AuthCheckGuard] },
    { path: '', redirectTo: 'stack', canActivate: [AuthCheckGuard], pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
