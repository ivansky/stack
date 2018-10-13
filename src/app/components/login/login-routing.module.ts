import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loginRoutes } from '../../routes/login.routes';

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
