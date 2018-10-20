import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent },
  ])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
