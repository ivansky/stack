import { Routes } from '@angular/router';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { NotFoundComponent } from '../modules/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'login', loadChildren: '../modules/login/login.module#LoginModule' },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];
