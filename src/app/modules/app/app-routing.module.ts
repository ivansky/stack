import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
    { path: 'stack', loadChildren: '../stack/stack.module#StackModule', canActivate: [AuthGuard] },
    { path: '', redirectTo: 'stack', canActivate: [AuthGuard], pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
