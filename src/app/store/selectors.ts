import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export * from '../modules/auth/auth.selectors';

export const getRouterState = createFeatureSelector<RouterReducerState>('router');
