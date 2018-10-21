import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import effects from '../../store/effects';
import { environment } from '../../../environments/environment';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { metaReducers, reducers, CustomRouterSerializer } from '../../store/reducers';
import { AuthCheckGuard } from '../auth/guards/auth-check.guard';
import { AuthService } from '../auth/auth.service';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './containers/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthModule } from '../auth/auth.module';
import { StackModule } from '../stack/stack.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    AuthModule,
    StackModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'StackApp',
      logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot(effects),
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterSerializer }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
